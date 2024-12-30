import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';

const ViewDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Fetch Pokémon data from API
    useEffect(() => {
        const fetchPokemonData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemon({
                name: data.name,
                image: data.sprites.front_default,
                abilities: data.abilities.map((ability) => ability.ability.name),
                types: data.types.map((type) => type.type.name),
                stats: data.stats.map((stat) => ({
                    name: stat.stat.name,
                    baseStat: stat.base_stat
                })),
            });
        };

        fetchPokemonData();
    }, [name]);


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(name)) {
            setIsFavorite(true);
        }
    }, [name]);


    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(name)) {
            const updatedFavorites = favorites.filter(fav => fav !== name);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {

            favorites.push(name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Pokémon Details Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl flex flex-col md:flex-row gap-6 border-4 border-gray-300 hover:border-yellow-500 transition-all duration-300">
                {/* Pokémon Image */}
                <div className="flex justify-center mb-6 md:mb-0">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-32 h-32 object-cover rounded-md shadow-md md:w-48 md:h-48 md:hover:scale-125 transition-transform duration-300"
                    />
                </div>

                {/* Pokémon Info */}
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h2>

                    {/* Types */}
                    <div className="flex justify-center mb-4 gap-3">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="px-4 py-2 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                        ))}
                    </div>

                    {/* Abilities */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Abilities:</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            {pokemon.abilities.map((ability, index) => (
                                <li key={index}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Base Stats */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Base Stats:</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            {pokemon.stats.map((stat) => (
                                <li key={stat.name}>
                                    {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: {stat.baseStat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={handleFavorite}
                        disabled={isFavorite}
                        className={`px-4 py-2 text-white text-sm rounded-md w-full md:w-auto flex justify-center items-center gap-2 ${isFavorite ? 'bg-yellow-500' : 'bg-gray-500'
                            } hover:bg-yellow-400 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    >
                        <FaStar />
                        Favourite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
