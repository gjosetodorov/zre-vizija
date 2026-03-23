import {
    Facebook,
    Instagram,
    Mail,
    Phone
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-linear-to-r from-purple-900 to-purple-800 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">

                    {/* Logo/Brand */}
                    <div className="md:text-left">
                        <h3 className="text-2xl font-bold mb-2">ЗРЕ Визија</h3>
                        <p className="text-purple-200 text-sm leading-relaxed">
                            Кавадарци, Северна Македонија
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex gap-8">
                        <div className="space-y-2 text-sm w-1/2">
                            <h4 className="text-lg font-semibold mb-4">Линкови</h4>
                            <a href="/" className="text-purple-200 hover:text-white transition-colors block">Дома</a>
                            <a href="/za-nas" className="text-purple-200 hover:text-white transition-colors block">За Нас</a>
                            <a href="/sovetuvalishen-centar" className="text-purple-200 hover:text-white transition-colors block">Советувалишен центар</a>
                        </div>
                        <div className="space-y-2 text-sm w-1/2">
                            <a href="/publikacii" className="text-purple-200 hover:text-white transition-colors block">Публикации</a>
                            <a href="/galerija" className="text-purple-200 hover:text-white transition-colors block">Галерија</a>
                            <a href="/donacii" className="text-purple-200 hover:text-white transition-colors block">Донации</a>
                            <a href="/kontakt" className="text-purple-200 hover:text-white transition-colors block">Контакт</a>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-purple-200 text-sm">
                                <Phone className="w-4 h-4" />
                                +389 75 480 288
                            </div>
                            <div className="flex items-center gap-2 text-purple-200 text-sm">
                                <Mail className="w-4 h-4" />
                                zrevizijakavadarci@yahoo.com
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 justify-center md:justify-end pt-4">
                            <a href="https://www.facebook.com/vizijakavadarci" target="_blank" className="w-10 h-10 bg-purple-700 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/zre.vizija/" target="_blank" className="w-10 h-10 bg-purple-700 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-purple-700/50 mt-12 pt-8 text-center text-purple-300 text-sm">
                    © 2026 ЗРЕ Визија
                </div>
            </div>
        </footer>
    );
};

export default Footer;
