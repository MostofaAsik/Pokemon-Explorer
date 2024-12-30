// src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left Section: Logo and Tagline */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h1 className="text-xl font-bold">Pokémon Explorer</h1>
                        <p className="text-sm">Discover, learn, and explore the world of Pokémon!</p>
                    </div>

                    {/* Middle Section: Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition"
                        >
                            PokéAPI
                        </a>
                        <a
                            href="/about"
                            className="hover:text-gray-300 transition"
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className="hover:text-gray-300 transition"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Right Section: Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-sm">&copy; 2024 Pokémon Explorer. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
