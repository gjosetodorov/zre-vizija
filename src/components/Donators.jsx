import { motion } from "framer-motion";

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

const Donators = () => {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}  // 🔁 re-animates every time
            className="w-full overflow-hidden py-16"
        >
            {/* Title */}
            <motion.h1
                variants={fadeUp}
                className="px-4 text-center text-5xl sm:text-6xl md:text-7xl font-extrabold text-purple-900 tracking-wide mb-12"
            >
                Донатори
            </motion.h1>

            {/* Marquee */}
            <motion.div variants={scaleIn} className="overflow-hidden w-full">
                <div className="flex w-max items-center animate-marquee">
                    {[0, 1].map((groupIndex) => (
                        <div
                            key={groupIndex}
                            className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14"
                        >
                            {donatorImages.map((img) => (
                                <div
                                    key={`${groupIndex}-${img.id}`}
                                    className="shrink-0 rounded-xl overflow-hidden bg-slate-800 shadow-lg p-2 sm:p-3"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-28 h-28 sm:w-36 sm:h-36 object-cover block"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Donators;
