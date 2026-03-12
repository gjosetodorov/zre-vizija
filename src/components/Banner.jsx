import { useState, useEffect } from "react";

const IMAGES = [
    "/src/example_images/Untitled-1.jpg",
    "/src/example_images/Untitled-2.jpg",
    "/src/example_images/Untitled-3.jpg",
];

export default function Banner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 4000);
        return () => clearInterval(id);
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

            {/* WHITE DIAGONAL PANEL */}
            <div className="absolute left-0 top-16 bottom-16 w-[40%] z-10">
                <div className="h-full bg-white [clip-path:polygon(0_0,80%_0,100%_100%,0_100%)] flex flex-col justify-center px-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ЗРЕ Визија
                    </h1>

                    <p className="text-lg text-gray-600 max-w-md">
                        Здружение за родова еднаквост, еманципација на жените и спречување на родови базирано насилство.
                    </p>
                </div>
            </div>

            {/* DOTS */}
            <div className="absolute bottom-20 left-[67%] flex space-x-2 z-20">
                {IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            i === index ? "bg-white scale-125" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>

        </section>
    );
}