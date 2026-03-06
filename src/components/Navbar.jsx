import {useState} from "react";
import {FaBars, FaTimes, FaSearch, FaShoppingCart} from "react-icons/fa";
import {NavLink, Link} from "react-router-dom";

export default function Navbar({navbarLinks = []}) {
    // 1. Estado para controlar el menú móvil
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-gradient-to-r from-red-700 to-red-900 border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 font-extrabold tracking-tight text-white">
                    <span>🏋️</span>
                    <span>ZoneGym Dolores Hidalgo</span>
                </div>

                {/* Contenedor Derecha: Nav PC + Iconos + Hamburguesa */}
                <div className="flex items-center gap-3 text-white">
                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex gap-2 text-sm">
                        {navbarLinks.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                className={({isActive}) =>
                                    `px-3 py-2 rounded-full transition ${
                                        isActive ? "bg-white/20" : "hover:bg-white/10"
                                    }`
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Iconos de Search/Cart (Visibles siempre o según prefieras) */}
                    <div className="flex gap-3 text-lg mr-2">
                        <FaSearch className="cursor-pointer hover:text-gray-300" />
                        <FaShoppingCart className="cursor-pointer hover:text-gray-300" />
                    </div>

                    {/* Botón Login Desktop */}
                    <Link
                        to="/login"
                        className="hidden md:block px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold"
                    >
                        Iniciar sesión
                    </Link>

                    {/* ✅ 2. Botón Hamburguesa: Solo visible en móvil */}
                    <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* ✅ 3. Menú Desplegable Móvil */}
            {/* Se muestra solo si isOpen es true y estamos en pantalla pequeña */}
            {isOpen && (
                <div className="md:hidden bg-red-900 border-t border-white/10 px-4 py-4 flex flex-col gap-3 animate-fade-in-down">
                    {navbarLinks.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                            className={({isActive}) =>
                                `px-4 py-3 rounded-lg text-white transition ${
                                    isActive ? "bg-white/20" : "hover:bg-white/10"
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg bg-white text-red-800 font-bold text-center"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            )}
        </header>
    );
}
