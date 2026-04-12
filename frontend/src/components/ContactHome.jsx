import { Phone, Mail, MapPin } from "lucide-react";
import { motion as Motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
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

const ContactHome = () => {
    return (
        <Motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <Motion.div variants={itemVariants} className="mb-16">
                    <div className="inline-block">
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                            Контактирајте не
                        </h2>
                        <Motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                            className="h-1 w-full origin-left rounded-full bg-linear-to-r from-purple-950 to-transparent"
                        />
                    </div>
                </Motion.div>

                {/* CONTACT INFO SECTION */}
                <Motion.div variants={itemVariants} className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Organization Contact */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                            <h3 className="text-2xl font-bold text-purple-900 mb-8">
                                ЗРЕ Визија
                            </h3>

                            <div className="space-y-6">
                                {/* Location */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-0.5">
                                        <MapPin className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-medium">Kavadarci, North Macedonia</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-0.5">
                                        <Phone className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <a href="tel:+38975480288" className="text-gray-900 font-medium">
                                            +389 75 480 288
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-0.5">
                                        <Mail className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <a href="mailto:zrevizijakavadarci@yahoo.com" className="text-gray-900 font-medium">
                                            zrevizijakavadarci@yahoo.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* President Contact */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                            <h3 className="text-2xl font-bold text-purple-900 mb-2">
                                Претседателка
                            </h3>
                            <p className="text-lg font-semibold text-gray-900 mb-8">
                                Благица Коцева-Тодорова
                            </p>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-0.5">
                                        <Phone className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <a href="tel:+38970394203" className="text-gray-900 font-medium">
                                            +389 70 394 203
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-0.5">
                                        <Mail className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <a href="mailto:bkoceva@yahoo.com" className="text-gray-900 font-medium">
                                            bkoceva@yahoo.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Motion.div>

                {/* MAPS SECTION */}
                <Motion.div variants={itemVariants} className="">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map 1 */}
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-purple-100">
                            <div className="w-full h-96">
                                <iframe
                                    title="Google Map - ЗРЕ Визија Советувалишен Центар"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d230.73215966699132!2d22.0148248876914!3d41.434759351275865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smk!4v1773666944122!5m2!1sen!2smk"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen=""
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="p-5 bg-white text-center border-t border-purple-100">
                                <p className="text-xs font-semibold text-gray-600 mb-1">СОВЕТУВАЛИШЕН ЦЕНТАР 1</p>
                                <p className="text-sm text-gray-900 font-medium">
                                    Бул. "Марко Џумев" бр. 2, Кавадарци
                                </p>
                            </div>
                        </div>

                        {/* Map 2 */}
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-purple-100">
                            <div className="w-full h-96">
                                <iframe
                                    title="Google Map - ЗРЕ Визија Советувалишен Центар 2"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d230.73215966699132!2d22.0148248876914!3d41.434759351275865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smk!4v1773666944122!5m2!1sen!2smk"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen=""
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="p-5 bg-white text-center border-t border-purple-100">
                                <p className="text-xs font-semibold text-gray-600 mb-1">СОВЕТУВАЛИШЕН ЦЕНТАР 2</p>
                                <p className="text-sm text-gray-900 font-medium">
                                    Бул. "Марко Џумев" бр. 2, Кавадарци
                                </p>
                            </div>
                        </div>
                    </div>
                </Motion.div>
            </div>
        </Motion.section>
    );
};

export default ContactHome;
