import { motion as Motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function CounselingCenterLocation() {
    return (
        <Motion.section
            id="counseling-center-location"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    {/* LEFT SIDE */}
                    <Motion.div variants={itemVariants} className="text-slate-800">
                        <div className="inline-block">
                            <h2 className="text-2xl font-extrabold tracking-tight text-purple-900 sm:text-3xl">
                                Локација
                            </h2>
                            <Motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 0.7 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                                className="mt-3 h-1 w-full origin-left rounded-full bg-linear-to-r from-purple-950 to-transparent"
                            />
                        </div>

                        <p className="mt-4 text-[15px] leading-relaxed sm:text-base">
                            Регионалниот советувалишен центар се наоѓа на адреса „7-ми Септември“, Кавадарци
                            и е достапен за кориснички од регионот. Локацијата е
                            лесно пристапна и обезбедува дискретен простор за поддршка и советување.
                        </p>
                    </Motion.div>

                    {/* RIGHT SIDE (MAP) */}
                    <Motion.div variants={itemVariants} className="overflow-hidden">
                        <div className="h-96 w-full overflow-hidden rounded-3xl shadow-lg">
                            <iframe
                                title="Google Map - ЗРЕ Визија Советувалишен Центар"
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d759.0312423191475!2d22.018601750058703!3d41.4341021410061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDI2JzAyLjUiTiAyMsKwMDEnMDcuMCJF!5e1!3m2!1sen!2smk!4v1776204245047!5m2!1sen!2smk"
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </Motion.div>
                </div>
            </div>
        </Motion.section>
    );
}