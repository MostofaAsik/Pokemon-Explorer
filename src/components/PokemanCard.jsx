import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const PokemanCard = ({ pokemon }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate();
    };

    return (
        <div
            className="bg-white 
                border-t-4 border-t-red-500
                border-r-4 border-r-blue-500
                border-b-4 border-b-green-500
                border-l-4 border-l-yellow-500
                rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
        >
            <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {pokemon.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Base Stat: {pokemon.stats}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-300 transition-colors duration-300"
                    >
                        {type}
                    </span>
                ))}
            </div>
            <Link to={`/pokemon/${pokemon.name}`}>
                <button

                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                    <FaInfoCircle />
                    View Details
                </button>
            </Link>

        </div>
    );
};

export default PokemanCard;
