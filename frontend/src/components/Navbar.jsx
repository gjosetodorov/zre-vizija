import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const links = [
        { to: "/", label: "Дома" },
        { to: "/za-nas", label: "За нас" },
        { to: "/sovetuvalishen-centar", label: "Советувалишен центар" },
        { to: "/publikacii", label: "Публикации" },
        { to: "/galerija", label: "Галерија" },
        { to: "/donacii", label: "Донации" },
        { to: "/kontakt", label: "Контакт" }
    ];

    return (
        <nav className="bg-white backdrop-blur-sm shadow-lg border-b border-gray-100">
            <div className="w-full mx-auto px-10 sm:px-15 lg:px-20">
                <div className="flex justify-between items-center h-18 sm:h-24 md:h-30">

                    {/* LOGO */}
                    <Link to="/">
                        <img
                            src="/Logo_vizija_transparent.png"
                            alt="ZRE-Vizija"
                            className="w-16 h-16 sm:h-22 sm:w-22 md:w-28 md:h-28"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-700 hover:text-gray-900 px-2 py-2 rounded-md text-sm xl:text-base font-medium transition-colors whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileMenuIsOpen((prev) => !prev)}
                    >
                        {mobileMenuIsOpen ? (
                            <X className="w-6 h-6 sm:w-8 sm:h-8" />
                        ) : (
                            <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    mobileMenuIsOpen ? "max-h-125" : "max-h-0"
                }`}
            >
                <div className="bg-white border-t border-gray-100 px-6 py-4 space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuIsOpen(false)}
                            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}