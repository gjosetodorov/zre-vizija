import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Facebook, Instagram } from "lucide-react";

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

                <MotionDiv
                    initial={sectionEnter.initial}
                    whileInView={sectionEnter.animate}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="grid gap-8 md:grid-cols-2"
                >
                    <div className="rounded-3xl border border-purple-100 bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex items-center gap-2 text-purple-900">
                            <Clock className="h-5 w-5" />
                            <h3 className="text-2xl font-bold">Работно време</h3>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <p>Понеделник - Петок: 09:00 - 17:00</p>
                            <p>Сабота: По договор</p>
                            <p>Недела: Неработен ден</p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-purple-100 bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex items-center gap-2 text-purple-900">
                            <ShieldCheck className="h-5 w-5" />
                            <h3 className="text-2xl font-bold">Доверливост и безбедност</h3>
                        </div>
                        <p className="text-gray-700 leading-8">
                            Сите разговори и информации се строго доверливи.
                            Наш приоритет е вашата безбедност, приватност и достоинство,
                            како и создавање на безбеден простор на доверба и целосна поддршка.
                        </p>
                    </div>
                </MotionDiv>

                <MotionDiv
                    initial={sectionEnter.initial}
                    whileInView={sectionEnter.animate}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="grid gap-6 rounded-3xl border border-purple-100 p-8 md:grid-cols-[1fr_1.2fr] md:items-start"
                >
                    <div>
                        <h3 className="text-2xl font-bold text-purple-900">Што можете да очекувате?</h3>
                        <p className="mt-3 text-gray-700 leading-7">
                            Процесот е јасен, ненаметлив и целосно насочен кон вашата безбедност и потреби.
                        </p>
                    </div>
                    <div className="space-y-3 text-gray-700">
                        {[
                            "Сослушување без осуда и со целосна доверливост",
                            "Практични информации и чекори прилагодени за вашата ситуација",
                            "Поддршка во безбедна и пријатна средина"
                        ].map((point) => (
                            <p key={point} className="flex items-start gap-3 leading-7">
                                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-purple-700" />
                                <span>{point}</span>
                            </p>
                        ))}
                    </div>
                </MotionDiv>

                <MotionDiv
                    initial={sectionEnter.initial}
                    whileInView={sectionEnter.animate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="mx-auto w-full overflow-hidden lg:max-w-140"
                >
                    <div className="h-96 w-full overflow-hidden rounded-3xl shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d902.6252702923214!2d22.01820893264576!3d41.43554637873136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDI2JzA4LjAiTiAyMsKwMDEnMDUuNiJF!5e1!3m2!1sen!2smk!4v1776204405049!5m2!1sen!2smk"
                            className="h-full w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google map - Kavadarci"
                        ></iframe>
                    </div>
                </MotionDiv>

                <p className="mx-auto max-w-xl text-center text-sm text-gray-500">
                    Не сте сами. Контактирајте нe кога и да ви е потребно - тука сме за вас
                </p>

            </div>
        </section>
    );
}