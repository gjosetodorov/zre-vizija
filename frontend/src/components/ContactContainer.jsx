import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Facebook, Instagram, Heart, CheckCircle2 } from "lucide-react";

const sectionEnter = {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 }
};

export default function ContactContainer() {
    const MotionDiv = Motion.div;
    const contactItems = [
        {
            icon: Phone,
            title: "Телефон",
            value: "+389 75 480 288",
        },
        {
            icon: Mail,
            title: "Е-пошта",
            value: "zrevizijakavadarci@yahoo.com",
        },
        {
            icon: MapPin,
            title: "Локација",
            value: "7-ми Септемрви, Кавадарци",
        }
    ];

    return (
        <>
            <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-16">
                    <MotionDiv
                        initial={sectionEnter.initial}
                        whileInView={sectionEnter.animate}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-black text-purple-900 sm:text-5xl">
                            Тука сме за вас
                        </h2>
                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                            Доколку ви е потребна поддршка, совет или разговор - не сте сами.
                            Нашиот тим е тука да ве сослуша и да ви помогне.
                        </p>
                    </MotionDiv>

                    <MotionDiv
                        initial={sectionEnter.initial}
                        whileInView={sectionEnter.animate}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="grid gap-8 lg:grid-cols-3"
                    >
                        {contactItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    target={item.title === "Локација" ? "_blank" : undefined}
                                    rel={item.title === "Локација" ? "noreferrer" : undefined}
                                    className="group rounded-2xl px-2 py-2 text-center lg:text-left"
                                >
                                    <div className="flex items-center justify-center gap-3 text-purple-900 lg:justify-start">
                                        <Icon className="h-5 w-5" />
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em]">{item.title}</p>
                                    </div>
                                    <p className="mx-auto mt-3 text-base leading-7 text-gray-700 lg:mx-0">
                                        {item.value}
                                    </p>
                                    <span className="mt-2 block h-0.5 w-full origin-left scale-x-0 rounded-full bg-purple-700 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                </a>
                            );
                        })}
                    </MotionDiv>

                    <MotionDiv
                        initial={sectionEnter.initial}
                        whileInView={sectionEnter.animate}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="-mt-3 flex items-center justify-center gap-4 pb-4"
                    >
                        <a
                            href="https://www.facebook.com/vizijakavadarci"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-200"
                        >
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.instagram.com/zre.vizija/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-200"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                    </MotionDiv>
                </div>
            </section>

            <section className="w-full bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <MotionDiv
                        initial={sectionEnter.initial}
                        whileInView={sectionEnter.animate}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="space-y-12"
                    >
                        <div className="grid gap-8 md:grid-cols-3">
                            <MotionDiv
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="rounded-2xl border border-purple-200/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <Clock className="h-6 w-6 text-purple-900" />
                                </div>
                                <h3 className="text-xl font-bold text-purple-900">Работно време</h3>
                                <div className="mt-5 space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-600" /> Понеделник - Петок: 09:00 - 17:00</p>
                                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-600" /> Сабота: По договор</p>
                                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-600" /> Недела: Неработен ден</p>
                                </div>
                            </MotionDiv>

                            <MotionDiv
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="rounded-2xl border border-purple-200/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <ShieldCheck className="h-6 w-6 text-purple-900" />
                                </div>
                                <h3 className="text-xl font-bold text-purple-900">Доверливост</h3>
                                <p className="mt-5 leading-7 text-gray-700">
                                    Сите разговори и информации се строго доверливи. Наш приоритет е вашата безбедност, приватност и достоинство.
                                </p>
                            </MotionDiv>

                            <MotionDiv
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="rounded-2xl border border-purple-200/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <Heart className="h-6 w-6 text-purple-900" />
                                </div>
                                <h3 className="text-xl font-bold text-purple-900">Поддршка</h3>
                                <p className="mt-5 leading-7 text-gray-700">
                                    Создаваме безбеден простор на доверба и целосна емоционална, правна и практична поддршка.
                                </p>
                            </MotionDiv>
                        </div>

                        <div
                            className="rounded-2xl border border-purple-200/50 bg-white/80 p-10 backdrop-blur-sm"
                        >
                            <h3 className="text-2xl font-bold text-purple-900 mb-8">Што можете да очекувате?</h3>
                            <p className="text-gray-700 leading-8 mb-8">
                                Процесот е јасен, ненаметлив и целосно насочен кон вашата безбедност и потреби.
                                Нашиот тим работи со целосна транспаренција и вашата спокойност е главна приоритет.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Слушање без осуда и целосна доверливост на разговорите",
                                    "Практични совети и информации прилагодени на вашата ситуација",
                                    "Безбедна и пријатна средина за разговор и поддршка"
                                ].map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-4 py-3">
                                        <CheckCircle2 className="h-6 w-6 text-purple-900 shrink-0 mt-0.5" />
                                        <p className="text-gray-700 leading-7">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionDiv>
                </div>
            </section>

            <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-10">
                    <p className="mx-auto max-w-xl text-center text-sm text-gray-500">
                        Не сте сами. Контактирајте нe кога и да ви е потребно - тука сме за вас
                    </p>
                </div>
            </section>
        </>
    );
}