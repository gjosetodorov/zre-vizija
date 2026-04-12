import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion as Motion} from "framer-motion";

const IMAGES = [
    new URL("../images/banner_images/slika1.png", import.meta.url).href,
    new URL("../images/banner_images/slika3.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika9.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika5.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika11.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika8.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika6.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika7.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika4.jpg", import.meta.url).href,
    new URL("../images/banner_images/slika2.png", import.meta.url).href,
];

export default function Banner() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const activeIndex = IMAGES.length ? index % IMAGES.length : 0;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 150);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (IMAGES.length <= 1) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
            {/* Rotating Background Images */}
            <div className="absolute inset-0">
                {IMAGES.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Banner ${i + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ease-in-out ${
                            i === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
                {/* Minimal dark overlay - only left side */}
                <div
                    className="absolute inset-0 bg-linear-to-r from-gray-900/95 via-gray-900/60 via-35% to-transparent"/>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
                    <Motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isVisible ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className="max-w-3xl"
                    >
                        {/* Main Title */}
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
                            ЗРЕ<br className="hidden sm:block"/> Визија
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-light">
                            Здружение за родова еднаквост, еманципација на жените <br/> и спречување на родови базирано
                            насилство.
                        </p>

                        {/* CTA Button - same style as AskForAdvice */}
                        <Link
                            to="/za-nas"
                            className="inline-block min-w-52 rounded-[999px] bg-purple-900 px-10 py-5 text-center text-xl font-bold text-white shadow-md outline-none ring-purple-300 transition-all duration-300 hover:translate-x-2 hover:-translate-y-1 hover:bg-purple-800 hover:shadow-[0_16px_40px_rgba(76,29,149,0.35)] focus-visible:ring-4 active:scale-[0.98]"
                        >
                            Дознајте повеќе
                        </Link>
                    </Motion.div>
                </div>
            </div>

        </section>
    );
}