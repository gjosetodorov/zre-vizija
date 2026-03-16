import { useState, useEffect } from "react";

const IMAGES = [
    "/src/images/banner_images/slika1.png",
    "/src/images/banner_images/slika2.png",
    "/src/example_images/Untitled-3.jpg",
];

export default function Banner() {
    const [index, setIndex] = useState(0);
    const [panelVisible, setPanelVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 4000);

        const timeout = setTimeout(() => setPanelVisible(true), 100);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <section className="relative w-full py-16 h-125 overflow-hidden">

            {/* SLIDER */}
            <div
                className="absolute left-0 right-0 top-16 bottom-16 flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {IMAGES.map((src, i) => (
                    <div key={i} className="min-w-full h-full">
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full object-cover object-center -translate-x-[-20%]"
                        />
                    </div>
                ))}
            </div>

            {/* DIAGONAL PANEL */}
            <div
                className={`absolute left-0 top-16 bottom-16 w-[40%] z-10 transition-all duration-1000 ease-out
    ${panelVisible ? "translate-x-0" : "-translate-x-20"}`}
            >
                <div
                    className="h-full bg-linear-to-r from-purple-200 via-purple-100 to-blue-200
        [clip-path:polygon(0_0,80%_0,100%_100%,0_100%)]
        flex flex-col justify-center px-12"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-purple-900 mb-4 leading-tight">
                        ЗРЕ Визија
                    </h1>

                    <p className="text-lg text-gray-900 max-w-md">
                        Здружение за родова еднаквост, еманципација на жените и спречување на родови базирано насилство.
                    </p>
                </div>
            </div>

            {/* DOTS */}
            <div className="absolute bottom-20 left-[68%] flex space-x-2 z-20">
                {IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            i === index ? "bg-white scale-125" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>

        </section>
    );
}