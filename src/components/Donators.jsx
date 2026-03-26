import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const donatorImages = [
    { id: 1, src: "/images/donator1.png", alt: "Donator 1" },
    { id: 2, src: "/images/donator2.png", alt: "Donator 2" },
    { id: 3, src: "/images/donator3.png", alt: "Donator 3" },
    { id: 4, src: "/images/donator4.png", alt: "Donator 4" },
    { id: 5, src: "/images/donator5.png", alt: "Donator 5" },
    { id: 6, src: "/images/donator6.png", alt: "Donator 6" },
    { id: 7, src: "/images/donator6.png", alt: "Donator 7" },
    { id: 8, src: "/images/donator6.png", alt: "Donator 8" },
    { id: 9, src: "/images/donator6.png", alt: "Donator 9" },
    { id: 10, src: "/images/donator6.png", alt: "Donator 10" },
    { id: 11, src: "/images/donator6.png", alt: "Donator 11" },
    { id: 12, src: "/images/donator6.png", alt: "Donator 12" },
];

const marqueeDonators = donatorImages;

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

    const MotionSection = motion.section;
    const MotionH1 = motion.h1;
    const MotionDiv = motion.div;

const Donators = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [startIndex, setStartIndex] = useState(0);
  const [isShifting, setIsShifting] = useState(false);
  const [shiftDirection, setShiftDirection] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const shiftDurationMs = 540;

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1680) {
        setVisibleCount(8);
      } else if (width >= 1440) {
        setVisibleCount(7);
      } else if (width >= 1200) {
        setVisibleCount(6);
      } else if (width >= 992) {
        setVisibleCount(5);
      } else if (width >= 768) {
        setVisibleCount(4);
      } else if (width >= 576) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const renderCount = Math.min(marqueeDonators.length, visibleCount + 2);
  const tickerItems = useMemo(
    () => {
      const total = marqueeDonators.length;
      const start = ((startIndex - 1) % total + total) % total;

      return Array.from({ length: renderCount }, (_, index) => {
        return marqueeDonators[(start + index) % total];
      });
    },
    [renderCount, startIndex],
  );

  const itemPercent = 100 / visibleCount;

  const requestShift = useCallback((direction) => {
    if (isShifting) {
      return;
    }

    setShiftDirection(direction);
    setIsShifting(true);
  }, [isShifting]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isInteracting && !isShifting) {
        requestShift(1);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [isInteracting, isShifting, requestShift]);

  useEffect(() => {
    if (!isShifting) {
      return;
    }

    const completeShift = setTimeout(() => {
      setStartIndex((prev) => {
        const total = marqueeDonators.length;
        return shiftDirection === 1 ? (prev + 1) % total : (prev - 1 + total) % total;
      });
      setIsShifting(false);
    }, shiftDurationMs);

    return () => {
      clearTimeout(completeShift);
    };
  }, [isShifting, shiftDirection]);

  const idleTranslate = -itemPercent;
  const activeTranslate = shiftDirection === 1 ? -itemPercent * 2 : 0;

  const handlePanEnd = (_, info) => {
    if (isShifting) {
      setIsInteracting(false);
      return;
    }

    const threshold = 40;

    if (info.offset.x >= threshold) {
      requestShift(-1);
    } else if (info.offset.x <= -threshold) {
      requestShift(1);
    }

    setIsInteracting(false);
  };

    return (
        <MotionSection
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}  // 🔁 re-animates every time
            className="w-full overflow-hidden pt-12 pb-6"
        >
            {/* Title */}
            <MotionH1
                variants={fadeUp}
                className="mb-8 px-4 text-center text-5xl font-extrabold tracking-wide text-purple-900 sm:text-6xl md:text-7xl"
            >
                Донатори
            </MotionH1>

            {/* Marquee */}
            <MotionDiv variants={scaleIn} className="w-full overflow-hidden px-3 sm:px-4">
                <MotionDiv
                    className="flex cursor-grab select-none items-center touch-pan-y active:cursor-grabbing"
                    style={{
                      transform: `translateX(${isShifting ? activeTranslate : idleTranslate}%)`,
                      transition: isShifting ? `transform ${shiftDurationMs}ms ease` : "none",
                    }}
                    onPanStart={() => setIsInteracting(true)}
                    onPanEnd={handlePanEnd}
                >
                    {tickerItems.map((img, index) => (
                        <div
                            key={`${img.id}-${startIndex}-${index}`}
                            className="shrink-0 px-2 sm:px-3"
                            style={{ width: `${100 / visibleCount}%` }}
                        >
                            <div className="mx-auto w-full max-w-48 overflow-hidden rounded-2xl bg-slate-800 p-2.5 shadow-lg sm:p-3 lg:max-w-52">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    draggable={false}
                                    className="block h-36 w-full object-cover sm:h-40 lg:h-44"
                                />
                            </div>
                        </div>
                    ))}
                </MotionDiv>
            </MotionDiv>
        </MotionSection>
    );
};

export default Donators;
