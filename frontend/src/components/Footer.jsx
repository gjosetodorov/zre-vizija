import {
    Facebook,
    Instagram,
    MapPin,
    Mail,
    Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-purple-700/60 bg-linear-to-b from-purple-900 via-purple-900 to-purple-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-extrabold tracking-wide">ЗРЕ Визија</h3>
                        <p className="text-sm leading-7 text-purple-200">
                            Визија што обединува, еднаквост што ослободува.
                            Рамноправност без компромис.
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-700/70 bg-purple-800/40 px-4 py-2 text-xs font-medium text-purple-100">
                            <MapPin className="h-4 w-4" />
                            Кавадарци, Северна Македонија
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-purple-200">Навигација</h4>
                        <nav className="space-y-3 text-sm">
                            <Link to="/" className="block text-purple-100 transition-colors hover:text-white">Дома</Link>
                            <Link to="/za-nas" className="block text-purple-100 transition-colors hover:text-white">За Нас</Link>
                            <Link to="/sovetuvalishen-centar" className="block text-purple-100 transition-colors hover:text-white">Советувалишен центар</Link>
                            <Link to="/kontakt" className="block text-purple-100 transition-colors hover:text-white">Контакт</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-purple-200">Ресурси</h4>
                        <nav className="space-y-3 text-sm">
                            <Link to="/publikacii" className="block text-purple-100 transition-colors hover:text-white">Публикации</Link>
                            <Link to="/galerija" className="block text-purple-100 transition-colors hover:text-white">Галерија</Link>
                            <Link to="/donacii" className="block text-purple-100 transition-colors hover:text-white">Донации</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-purple-200">Контакт</h4>
                        <div className="space-y-3 text-sm text-purple-100">
                            <p className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-purple-300" />
                                +389 75 480 288
                            </p>
                            <p className="flex items-center gap-2 break-all">
                                <Mail className="h-4 w-4 text-purple-300" />
                                zrevizijakavadarci@yahoo.com
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/vizijakavadarci"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-600/70 bg-purple-800/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/zre.vizija/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-600/70 bg-purple-800/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-purple-700/60 pt-5 text-center text-xs text-purple-300 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 ЗРЕ Визија. Сите права се задржани.</p>
                    <p>Поддршка и доверливост за секоја жена.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
