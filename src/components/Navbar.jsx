import {Link} from "react-router-dom";
import {Menu} from "lucide-react";
import {useState} from "react";
import {X} from "lucide-react"

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    return (
        <nav className="bg-white backdrop-blur-sm shadow-lg border-b border-gray-100">
            <div className="w-full mx-auto px-10 sm:px-15 lg:px-20">
                <div className="flex justify-between items-center h-18 sm:h-24 md:h-30">
                    <div>
                        <Link to="/">
                            <img src="/Logo_vizija_transparent.png" alt="ZRE-Vizija"
                                 className="w-16 h-16 sm:h-22 sm:w-22 md:w-28 md:h-28"/>
                        </Link>
                    </div>

                    {/* Nav Links */}

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <Link to="/"
                              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Дома
                        </Link>
                        <Link to="/za-nas"
                              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            За нас
                        </Link>
                        <Link to="/sovetuvalishte"
                              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Советувалиште
                        </Link>
                        {/*<Link to="/oglasi"*/}
                        {/*      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">*/}
                        {/*    Огласи*/}
                        {/*</Link>*/}
                        <Link to="/kontakt"
                              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Контакт
                        </Link>
                    </div>

                    <button className="md:hidden p-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                            onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
                        {mobileMenuIsOpen ? (
                            <X className="w-6 h-6 sm:w-8 sm:h-8"/>
                        ) : (
                            <Menu className="w-6 h-6 sm:w-8 sm:h-8"/>
                        )}
                    </button>

                </div>
            </div>

            {mobileMenuIsOpen && (
                <div
                    className="md:hidden bg-linear-to-r from-purple-200 via-purple-100 to-blue-200 backdrop-blur-sm shadow-lg border-t border-gray-100 px-4 pb-4 animate-in slide-in-from-top duration-300">
                    <div className="px-4 py-4 sm:py-5 space-y-2 sm:space-y-3">
                        <Link to="/"
                              onClick={() => setMobileMenuIsOpen(false)}
                              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Дома
                        </Link>
                        <Link to="/za-nas"
                              onClick={() => setMobileMenuIsOpen(false)}
                              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            За нас
                        </Link>
                        <Link to="/sovetuvalishte"
                              onClick={() => setMobileMenuIsOpen(false)}
                              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Советувалиште
                        </Link>
                        {/*<Link to="/oglasi"*/}
                        {/*      onClick={() => setMobileMenuIsOpen(false)}*/}
                        {/*      className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">*/}
                        {/*    Огласи*/}
                        {/*</Link>*/}
                        <Link to="/kontakt"
                              onClick={() => setMobileMenuIsOpen(false)}
                              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium lg:text-base transition-colors">
                            Контакт
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
