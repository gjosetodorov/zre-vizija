import {Phone, Mail, MapPin} from "lucide-react";

const ContactHome = () => {
    return (
        <section className="bg-linear-to-r from-purple-200 via-purple-100 to-blue-200 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Contact Info */}
                    <div className="space-y-6 text-purple-900">
                        <h2 className="text-3xl font-bold">Контакт</h2>

                        <p className="text-gray-600 leading-relaxed">
                            Контактирајте не.
                        </p>

                        <div className="space-y-4">
                            {/* Company location */}
                            <div className="flex items-center gap-3">
                                <MapPin className="text-gray-900 w-5 h-5"/>
                                <span className="text-gray-900">Kavadarci, North Macedonia</span>
                            </div>

                            {/* Company phone */}
                            <div className="flex items-center gap-3">
                                <Phone className="text-gray-900 w-5 h-5"/>
                                <span className="text-gray-900">+389 75 480 288</span>
                            </div>

                            {/* Company email */}
                            <div className="flex items-center gap-3">
                                <Mail className="text-gray-900 w-5 h-5"/>
                                <span className="text-gray-900">
                                     <a href="mailto:zrevizijakavadarci@yahoo.com" className="hover:underline">
                                         zrevizijakavadarci@yahoo.com
                                     </a>
                                </span>
                            </div>
                        </div>

                        {/* President section */}
                        <div className="pt-6 border-t border-purple-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Претседателка – Благица Коцева-Тодорова
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Phone className="text-gray-900 w-5 h-5 shrink-0"/>
                                    <span className="text-gray-900">+389 70 394 203</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="text-gray-900 w-5 h-5 shrink-0"/>
                                    <span className="text-gray-900">
                                        <a href="mailto:bkoceva@yahoo.com" className="hover:underline">
                                            bkoceva@yahoo.com
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="bg-white/90 p-4 rounded-lg space-y-3">
                        <div className="w-full h-80">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d230.73215966699132!2d22.0148248876914!3d41.434759351275865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smk!4v1773666944122!5m2!1sen!2smk"
                                className="w-full h-full border-0 rounded"
                                loading="lazy"
                                allowFullScreen
                            />
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm text-center">
                            Советувалишен центар
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactHome;
