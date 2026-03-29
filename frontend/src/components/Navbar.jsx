import { Link, NavLink } from "react-router-dom";
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
        <nav className="border-b border-purple-200 bg-linear-to-r from-purple-50/90 via-white to-purple-100/80 shadow-sm backdrop-blur-md">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between md:h-28">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="rounded-xl p-1 transition-transform duration-200"
                    >
                        <img
                            src="/Logo_vizija_transparent.png"
                            alt="ZRE-Vizija"
                            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden items-center rounded-full border border-purple-200 bg-white/90 p-1.5 shadow-sm lg:flex">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `rounded-full px-4 py-2.5 text-sm font-semibold transition-all xl:px-5 xl:text-base ${
                                        isActive
                                            ? "bg-purple-900 text-white shadow-md"
                                            : "text-purple-900 hover:bg-purple-100 hover:text-purple-950"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        type="button"
                        className="rounded-xl border border-purple-200 bg-white p-2.5 text-purple-900 transition-colors hover:bg-purple-100 hover:text-purple-950 lg:hidden"
                        onClick={() => setMobileMenuIsOpen((prev) => !prev)}
                        aria-expanded={mobileMenuIsOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuIsOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuIsOpen ? (
                            <X className="h-7 w-7 sm:h-8 sm:w-8" />
                        ) : (
                            <Menu className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div
                id="mobile-menu"
                className={`overflow-hidden transition-all duration-300 lg:hidden ${
                    mobileMenuIsOpen ? "max-h-96 py-2" : "max-h-0"
                }`}
            >
                <div className="space-y-1 rounded-2xl border border-purple-200 bg-white p-3 shadow-sm">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuIsOpen(false)}
                            className={({ isActive }) =>
                                `block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-purple-900 text-white"
                                        : "text-purple-900 hover:bg-purple-100 hover:text-purple-950"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}