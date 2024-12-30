import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleUnfavorite = (name) => {
        const updatedFavorites = favorites.filter(fav => fav.name !== name);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        toast.success(`${name} has been removed from favorites!`);
    };

    if (favorites.length === 0) {
        return <p className='text-center text-red-500 mt-6'>No favorites yet.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Your Favorite Pokémon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((pokemon) => (
                    <div key={pokemon.name} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition border-4 border-gradient">
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-center mb-2">
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </h3>
                        <button
                            onClick={() => handleUnfavorite(pokemon.name)}
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                        >
                            <FaStar className="inline-block mr-2" />
                            Unfavorite
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Favourites;
