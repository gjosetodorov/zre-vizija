import { motion as Motion } from "framer-motion";
import { Heart, Users, Megaphone, Handshake, Copy } from "lucide-react";
import { useState } from "react";

export default function DonationsContainer() {
    const MotionDiv = Motion.div;
    const [copied, setCopied] = useState("");

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(""), 2000);
    };

    const extraSupport = [
        {
            icon: Handshake,
            title: "Станете партнер",
            text: "Компании и организации можат да помогнат со услуги, ресурси и заеднички иницијативи."
        },
        {
            icon: Megaphone,
            title: "Проширете ја пораката",
            text: "Споделете ги нашите активности на социјални мрежи за да стигнеме до повеќе жени."
        },
        {
            icon: Users,
            title: "Вклучете се како волонтер",
            text: "Вашето време и знаење можат директно да придонесат во работата на советувалиштето."
        }
    ];

    const donationFields = [
        { label: "Назив на примач", value: "ЗРЕ Визија" },
        { label: "Банка", value: "Комерцијална Банка АД Скопје" },
        { label: "Трансакциска сметка", value: "300040000198496" },
        { label: "Цел на дознака", value: "Донација" }
    ];

    return (
        <>
            <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <MotionDiv
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="mb-4 flex justify-center">
                            <Heart className="h-10 w-10 text-purple-900" />
                        </div>
                        <h2 className="text-4xl font-black leading-tight text-purple-900 sm:text-5xl">
                            Вашата поддршка отвора пат кон сигурност
                        </h2>
                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                            Поддршката за ЗРЕ Визија значи повеќе безбедност, повеќе информации и повеќе шанси
                            за нов почеток. Секој придонес - финансиски, волонтерски или преку соработка - носи
                            реална промена во животите на жените и нивните семејства.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            <section className="w-full bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-14">
                    <MotionDiv
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {extraSupport.map((item) => {
                            const Icon = item.icon;
                            return (
                                <MotionDiv
                                    key={item.title}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-900">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-purple-900">{item.title}</h3>
                                    <p className="mt-3 leading-7 text-gray-700">{item.text}</p>
                                </MotionDiv>
                            );
                        })}
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="grid gap-8 rounded-3xl border border-purple-100 bg-white p-8 md:grid-cols-2 md:items-center"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-purple-900">Како се користи поддршката</h3>
                            <p className="mt-4 leading-8 text-gray-700">
                                Секој придонес се насочува кон услуги за советување, поддршка при кризни ситуации,
                                информирање за права и јакнење на жените за самостојни и безбедни одлуки.
                            </p>
                        </div>
                        <div className="space-y-3 text-gray-700">
                            {[
                                "Доверливи разговори и психосоцијална поддршка",
                                "Насочување кон правна и институционална помош",
                                "Едукативни активности и превенција во заедницата"
                            ].map((point) => (
                                <p key={point} className="flex items-start gap-3 leading-7">
                                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-purple-700" />
                                    <span>{point}</span>
                                </p>
                            ))}
                        </div>
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="rounded-3xl border border-purple-100 bg-white p-8 shadow-md"
                    >
                        <h3 className="text-center text-2xl font-semibold text-purple-900">Податоци за донација</h3>

                        <div className="mt-7 space-y-4 rounded-2xl border border-purple-100 bg-purple-50 p-6">
                            {donationFields.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between rounded-xl border border-purple-100 bg-white px-4 py-3"
                                >
                                    <div>
                                        <p className="text-xs text-purple-700">{item.label}</p>
                                        <p className="font-medium text-gray-800">{item.value}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleCopy(item.value, item.label)}
                                        className="text-purple-900 transition hover:text-purple-700"
                                        aria-label={`Копирај ${item.label}`}
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            ))}

                            {copied && (
                                <p className="text-center text-sm text-green-700">
                                    ✓ {copied} е копирано
                                </p>
                            )}
                        </div>
                    </MotionDiv>
                </div>
            </section>
        </>
    );
}