import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemanCard from "../components/PokemanCard";

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
            const results = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    console.log(pokemon.url);
                    const details = await axios.get(pokemon.url);
                    return {
                        name: pokemon.name,
                        image: details.data.sprites.front_default,
                        stats: details.data.stats[0].base_stat,
                        types: details.data.types.map((type) => type.type.name),
                    };
                })
            );
            setPokemonList(results);
            setFilteredPokemon(results);
        };

        const fetchTypes = async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/type");
            setTypes(response.data.results.map((type) => type.name));
        };

        fetchPokemon();
        fetchTypes();
    }, []);

    // Filter and sort Pokémon
    useEffect(() => {
        let updatedList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedType) {
            updatedList = updatedList.filter((pokemon) => pokemon.types.includes(selectedType));
        }

        if (sortOption === "name") {
            updatedList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "stats") {
            updatedList.sort((a, b) => b.stats - a.stats);
        }

        setFilteredPokemon(updatedList);
        setCurrentPage(1);
    }, [searchQuery, sortOption, selectedType, pokemonList]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
    const paginatedPokemon = filteredPokemon.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {loading && <p className="text-center text-red-500 text-2xl">Loading...</p>}
            {/* Search and Filters */}
            <h2 className="text-3xl font-semibold mb-6">Pokémon Explorer</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Sort Dropdown */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="stats">Base Stats</option>
                </select>

                {/* Type Filter Dropdown */}
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Filter By Type</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pokémon List */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {paginatedPokemon.map((pokemon) => (
                    <PokemanCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-lg btn border-t-green-500">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
