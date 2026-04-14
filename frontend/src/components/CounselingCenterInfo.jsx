import React, { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Shield, Users, Scale, Briefcase, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const counselingCenterImages = Object.entries(
    import.meta.glob("../images/counseling_center/*.{jpg,jpeg,png,webp}", {
        eager: true,
        import: "default",
    }),
)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .slice(0, 6)
    .map(([path, src], index) => ({
        id: `${path}-${index}`,
        src,
        alt: `Советувалишен центар ${index + 1}`,
    }));

function SectionCard({ title, children }) {
    return (
        <Motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/65 p-5 backdrop-blur-[1px] sm:p-6"
        >
            <h3 className="text-lg font-bold text-purple-900 sm:text-xl">{title}</h3>
            <div className="mt-3 text-[15px] leading-relaxed sm:text-base">{children}</div>
        </Motion.section>
    );
}

function ServiceItem({ icon: Icon, title, text }) {
    return (
        <li className="flex items-start gap-3">
            {React.createElement(Icon, { className: "mt-1 h-5 w-5 text-purple-900" })}
            <span>
                <strong>{title}</strong> - {text}
            </span>
        </li>
    );
}

export default function CounselingCenterInfo() {
    const [expanded, setExpanded] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const sliderRef = useRef(null);
    const dragStateRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0 });
    const draggedRef = useRef(false);
    const dragResetTimeoutRef = useRef(null);
    const nudgeBackTimeoutRef = useRef(null);
    const isUserInteractingRef = useRef(false);
    const isAtStartRef = useRef(true);
    const activeImageIndexRef = useRef(null);

    useEffect(() => {
        isAtStartRef.current = isAtStart;
    }, [isAtStart]);

    useEffect(() => {
        activeImageIndexRef.current = activeImageIndex;
    }, [activeImageIndex]);

    const closePreview = () => setActiveImageIndex(null);

    const movePreview = (direction) => {
        setActiveImageIndex((current) => {
            if (current === null) {
                return current;
            }
            return (current + direction + counselingCenterImages.length) % counselingCenterImages.length;
        });
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (activeImageIndex === null) {
                return;
            }
            if (event.key === "Escape") {
                closePreview();
            }
            if (event.key === "ArrowLeft") {
                movePreview(-1);
            }
            if (event.key === "ArrowRight") {
                movePreview(1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeImageIndex]);

    useEffect(() => {
        if (activeImageIndex === null) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeImageIndex]);

    const handleSliderPointerDown = (event) => {
        const container = sliderRef.current;
        if (!container) {
            return;
        }
        isUserInteractingRef.current = true;

        if (dragResetTimeoutRef.current) {
            window.clearTimeout(dragResetTimeoutRef.current);
            dragResetTimeoutRef.current = null;
        }

        dragStateRef.current = {
            isDown: true,
            startX: event.clientX,
            startScrollLeft: container.scrollLeft,
        };
        draggedRef.current = false;
    };

    const handleSliderPointerMove = (event) => {
        const container = sliderRef.current;
        if (!container || !dragStateRef.current.isDown) {
            return;
        }

        const deltaX = event.clientX - dragStateRef.current.startX;
        if (Math.abs(deltaX) > 4) {
            draggedRef.current = true;
        }
        container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
    };

    const handleSliderPointerUp = () => {
        dragStateRef.current.isDown = false;

        if (draggedRef.current) {
            dragResetTimeoutRef.current = window.setTimeout(() => {
                draggedRef.current = false;
                dragResetTimeoutRef.current = null;
            }, 0);
        }

        window.setTimeout(() => {
            isUserInteractingRef.current = false;
        }, 300);
    };

    const handleImageClick = (index) => {
        if (draggedRef.current) {
            return;
        }
        setActiveImageIndex(index);
    };

    useEffect(() => {
        return () => {
            if (dragResetTimeoutRef.current) {
                window.clearTimeout(dragResetTimeoutRef.current);
            }
            if (nudgeBackTimeoutRef.current) {
                window.clearTimeout(nudgeBackTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            const container = sliderRef.current;
            if (!container) {
                return;
            }

            // Only show hint animation while user is at the first image position.
            const hasOverflow = container.scrollWidth > container.clientWidth + 4;
            if (!hasOverflow || activeImageIndexRef.current !== null || dragStateRef.current.isDown || isUserInteractingRef.current || !isAtStartRef.current) {
                return;
            }

            const nudgeDistance = Math.min(96, Math.max(56, container.clientWidth * 0.16));
            container.scrollBy({ left: nudgeDistance, behavior: "smooth" });

            if (nudgeBackTimeoutRef.current) {
                window.clearTimeout(nudgeBackTimeoutRef.current);
            }

            nudgeBackTimeoutRef.current = window.setTimeout(() => {
                const currentContainer = sliderRef.current;
                if (!currentContainer || activeImageIndexRef.current !== null || dragStateRef.current.isDown || isUserInteractingRef.current) {
                    return;
                }
                currentContainer.scrollTo({ left: 0, behavior: "smooth" });
                nudgeBackTimeoutRef.current = null;
            }, 550);
        }, 8000);

        return () => {
            window.clearInterval(intervalId);
            if (nudgeBackTimeoutRef.current) {
                window.clearTimeout(nudgeBackTimeoutRef.current);
                nudgeBackTimeoutRef.current = null;
            }
        };
    }, []);

    return (
        <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-4xl space-y-7 text-slate-800">
                    <section>
                        <div className="inline-block">
                            <h2 className="text-2xl font-extrabold tracking-tight text-purple-900 sm:text-3xl">
                                Советувалишен центар за поддршка
                            </h2>
                            <Motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                                className="mt-3 h-1 rounded-full bg-linear-to-r from-purple-950 to-transparent"
                            />
                        </div>

                        <p className="mt-4 text-[15px] leading-relaxed sm:text-base">
                            Советувалишниот центар обезбедува безбеден и доверлив простор за жени и деца жртви на родово базирано и семејно насилство.
                            Нашата цел е да го подобриме пристапот до специјализирани сервиси на локално ниво и да помогнеме во надминување на траумите и последиците од преживеаното насилство.
                        </p>

                        {expanded && (
                            <div className="mt-3 space-y-3 text-[15px] leading-relaxed sm:text-base">
                                <p>
                                    Центарот работи со жени кои се соочуваат со насилство во даден момент, жени кои се во ризик од насилство,
                                    жени кои ја напуштиле насилната средина или се во процес на напуштање, како и жени кои се во процес на развод
                                    или се справуваат со последици од насилство доживеано во детството.
                                </p>
                                <p>
                                    Дополнително, се работи и со деца кои биле директни или индиректни жртви на родово базирано и семејно насилство,
                                    односно малолетни лица под 18 години.
                                </p>
                                <p>
                                    Советувалиштето ќе биде лоцирано во општина Кавадарци и ќе биде достапно за корисници од Кавадарци, Росоман,
                                    Демир Капија и Неготино. Просторот е прилагоден за работа со деца и возрасни, а се обезбедува и онлајн
                                    советување за кориснички кои не можат физички да присуствуваат.
                                </p>
                                <p>
                                    Преку индивидуален пристап, центарот придонесува кон спречување на повторување на насилството, надминување на
                                    траумите и зајакнување на економската независност на жените.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-4 flex items-center gap-2 text-sm font-semibold text-purple-900 hover:underline"
                        >
                            {expanded ? "Прикажи помалку" : "Прочитај повеќе"}
                            <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
                        </button>
                    </section>

                    <section>
                         <div className="relative">
                             <div
                                 ref={sliderRef}
                                 onScroll={(event) => {
                                     const atStart = event.currentTarget.scrollLeft <= 6;
                                     isAtStartRef.current = atStart;
                                     setIsAtStart(atStart);
                                 }}
                                 onPointerDown={handleSliderPointerDown}
                                 onPointerMove={handleSliderPointerMove}
                                 onPointerUp={handleSliderPointerUp}
                                 onPointerCancel={handleSliderPointerUp}
                                 onPointerLeave={handleSliderPointerUp}
                                 onLostPointerCapture={handleSliderPointerUp}
                                 className="flex snap-x snap-proximity gap-4 overflow-x-auto px-2 py-1 scroll-smooth scroll-px-2 touch-pan-x select-none cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                             >
                                {counselingCenterImages.map((image, index) => (
                                    <figure
                                        key={image.id}
                                        data-counseling-image
                                        className="w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl border border-purple-100 bg-white sm:w-[70%] lg:w-[calc((100%-1rem)/2)]"
                                    >
                                        <button
                                            type="button"
                                            draggable={false}
                                            onClick={() => handleImageClick(index)}
                                            className="block w-full"
                                            aria-label={`Отвори слика ${image.alt}`}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                draggable={false}
                                                className="aspect-square w-full object-cover"
                                                loading="lazy"
                                            />
                                        </button>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>

                    {activeImageIndex !== null ? (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                            onClick={closePreview}
                            role="dialog"
                            aria-modal="true"
                        >
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    movePreview(-1);
                                }}
                                className="absolute left-4 text-white"
                                aria-label="Претходна слика"
                            >
                                <ChevronLeft className="h-14 w-14" />
                            </button>

                            <img
                                src={counselingCenterImages[activeImageIndex].src}
                                alt={counselingCenterImages[activeImageIndex].alt}
                                className="max-h-[90vh] max-w-[92vw] object-contain"
                                onClick={(event) => event.stopPropagation()}
                            />

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    movePreview(1);
                                }}
                                className="absolute right-4 text-white"
                                aria-label="Следна слика"
                            >
                                <ChevronRight className="h-14 w-14" />
                            </button>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    closePreview();
                                }}
                                className="absolute top-4 right-4 text-sm font-semibold text-white/85 hover:text-white"
                            >
                                Затвори
                            </button>
                        </div>
                    ) : null}

                    <SectionCard title="Кому му е наменет?">
                        <ul className="list-disc space-y-1.5 pl-5">
                            <li>жени кои се соочуваат со насилство во даден момент или се во ризик од насилство</li>
                            <li>жени кои ја напуштиле или се во процес на напуштање на насилната средина</li>
                            <li>жени во процес на развод или кои се справуваат со последици од насилство доживеано во детството</li>
                            <li>деца (под 18 години) кои биле директни или индиректни жртви на насилство</li>
                        </ul>
                        <p className="mt-3">
                            Услугите се достапни за корисници од Кавадарци, Росоман, Демир Капија и Неготино, со можност и за онлајн поддршка.
                        </p>
                    </SectionCard>

                    <SectionCard title="Услуги кои ги нудиме">
                        <ul className="space-y-3">
                            <ServiceItem
                                icon={Users}
                                title="Психосоцијално советување"
                                text="процена, индивидуален и групен третман и поддршка од психолог/психотерапевт"
                            />
                            <ServiceItem
                                icon={Shield}
                                title="Социјална поддршка"
                                text="влезни интервјуа, индивидуален план, следење и поддршка при остварување на права"
                            />
                            <ServiceItem
                                icon={Scale}
                                title="Правно советување"
                                text="правни информации, подготовка на документи и соработка со институции"
                            />
                            <ServiceItem
                                icon={Briefcase}
                                title="Економско јакнење"
                                text="менторство за вработување, CV, интервјуа и поврзување со програми за вработување"
                            />
                        </ul>
                    </SectionCard>
                </div>
            </div>
        </section>
    );
}
