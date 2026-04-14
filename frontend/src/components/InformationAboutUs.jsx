import { motion as Motion } from "framer-motion";
import { Users, BookOpen, Sparkles, HeartHandshake } from "lucide-react";
import mainAboutImage from "../images/about_us/main.jpg";
import secondAboutImage from "../images/about_us/second.jpg";

const revealUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const revealLeft = {
    hidden: { opacity: 0, x: -60 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut"
        }
    }
};

const revealRight = {
    hidden: { opacity: 0, x: 60 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut"
        }
    }
};

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12
        }
    }
};

const timelineItems = [
    "Формирана во 1991/1992 година, по систематските промени и плурализмот, како дел од обновеното женско движење во Македонија.",
    "Една од првите организации во новото време со бројни активности, признанија и влијание во заедницата.",
    "Континуирано дејствување во областа на родовата еднаквост, заштита на жените и нивно активно учество во општеството."
];

const activities = [
    "Редовни седници, хуманитарни акции, едукација и работилници",
    "Манифестации и признанија на државно и локално ниво",
    "Трибини за здравје на жената и поддршка на младите",
    "Хуманитарна помош за над 400 семејства",
    "Меѓународна соработка и влијание врз политики",
    "Активности за спречување родово базирано насилство"
];

const projects = [
    {
        title: "Родова еднаквост",
        desc: "Зголемување на вработливоста на жените",
        donor: "УНДП"
    },
    {
        title: "Социјална инклузија",
        desc: "Локална активна платформа",
        donor: "ЕУ - ИПА 2"
    },
    {
        title: "Општински буџети",
        desc: "Жените буџетираат",
        donor: "Акциска Здруженска"
    },
    {
        title: "Дискриминација",
        desc: "Вклучување на маргинализирани групи",
        donor: "Преда Плус"
    },
    {
        title: "Родово насилство",
        desc: "Европски стандарди против насилство",
        donor: "ЕУ"
    },
    {
        title: "Родова застапеност",
        desc: "Жените креаторки на политики",
        donor: "Општина Кавадарци"
    }
];

export default function InformationAboutUs() {
    return (
        <Motion.section className="w-full bg-linear-to-b from-white via-purple-50/60 to-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-20">
                <Motion.div
                    variants={revealUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-black text-purple-900 sm:text-5xl lg:text-6xl">
                        Приказна за посветеност, храброст и промени
                    </h2>
                </Motion.div>

                <Motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="grid min-h-140 gap-10 lg:grid-cols-2 lg:items-center"
                >
                    <Motion.div variants={revealLeft} className="space-y-7">
                        <div className="inline-flex w-fit items-center gap-3 rounded-full bg-purple-100 px-5 py-2.5 text-purple-900">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-sm font-semibold">Нашата мотивација</span>
                        </div>
                        <p className="text-lg leading-9 text-gray-700 sm:text-xl">
                            Кога сме толку силни и јаките, зошто да не кажеме колку сработиле жените од ОЖ "Визија" Кавадарци.
                            Со својата посветеност, тие придонесуваат кон создавање на општество во кое жената е позаштитена,
                            поеманципирана, повеќе вработена и активно вклучена во политиката, одлучувањето, домот и заедницата.
                        </p>
                    </Motion.div>

                    <Motion.div
                        variants={revealRight}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="h-110 overflow-hidden rounded-3xl"
                    >
                        <img
                            src={mainAboutImage}
                            alt="Главна фотографија за Визија"
                            className="block h-full w-full object-cover object-center"
                        />
                    </Motion.div>
                </Motion.div>

                <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 py-20">
                    <Motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1.4fr] lg:items-center lg:px-8"
                    >
                    <Motion.div variants={revealLeft} className="space-y-6">
                        <div className="flex items-center gap-3 text-purple-900">
                            <BookOpen className="h-6 w-6" />
                            <h3 className="text-3xl font-bold sm:text-4xl">Нашиот пат</h3>
                        </div>
                        <p className="text-lg leading-8 text-gray-700">
                            Низ повеќе од три децении, организацијата се развива заедно со потребите на жените и заедницата,
                            создавајќи простор за поддршка, едукација и безбедност.
                        </p>

                        <div className="h-64 overflow-hidden rounded-3xl">
                            <img
                                src={secondAboutImage}
                                alt="Фотографија од активности на Визија"
                                className="block h-full w-full object-cover object-center"
                            />
                        </div>

                    </Motion.div>

                    <Motion.ul variants={revealRight} className="list-disc space-y-5 pl-6 marker:text-purple-800">
                        {timelineItems.map((item, index) => (
                            <Motion.li
                                key={index}
                                variants={index % 2 === 0 ? revealRight : revealLeft}
                                className="text-lg leading-8 text-gray-700"
                            >
                                {item}
                            </Motion.li>
                        ))}
                    </Motion.ul>
                    </Motion.div>
                </section>

                <Motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-3 text-purple-900">
                        <Users className="h-6 w-6" />
                        <h3 className="text-3xl font-bold sm:text-4xl">Клучни активности и успеси</h3>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activities.map((item, index) => (
                            <Motion.div
                                key={index}
                                variants={index % 2 === 0 ? revealLeft : revealRight}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="rounded-2xl border border-purple-100 bg-linear-to-br from-white to-purple-50 p-6 shadow-sm transition-all duration-200 ease-out hover:shadow-md"
                            >
                                <p className="text-base leading-8 text-gray-700">{item}</p>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 py-20">
                    <Motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8"
                    >
                    <div className="flex items-center gap-3 text-purple-900">
                        <HeartHandshake className="h-6 w-6" />
                        <h3 className="text-3xl font-bold sm:text-4xl">Реализирани проекти</h3>
                    </div>

                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <Motion.article
                                key={index}
                                variants={index % 2 === 0 ? revealUp : revealRight}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:shadow-md"
                            >
                                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-600">Проект</p>
                                        <h4 className="mt-1 text-lg font-bold text-purple-900">{project.title}</h4>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-600">Наслов</p>
                                        <p className="mt-1 text-gray-700">{project.desc}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-600">Донатор</p>
                                        <p className="mt-1 text-gray-700 font-semibold">{project.donor}</p>
                                    </div>
                                </div>
                            </Motion.article>
                        ))}
                    </div>
                    </Motion.div>
                </section>

            </div>
        </Motion.section>
    );
}