import { useState } from 'react';
import { Link } from 'react-router';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold">
                            Pokémon Explorer
                        </Link>
                    </div>

                    {/* Navigation Links for Desktop */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-gray-300 transition">
                            Home
                        </Link>
                        <Link to="/favorites" className="hover:text-gray-300 transition">
                            Favorites
                        </Link>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-700">
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-blue-800"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favorites"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-blue-800"
                    >
                        Favorites
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
