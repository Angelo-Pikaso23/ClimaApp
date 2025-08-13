import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-2 mb-5 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Ingresa una ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-full bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-full text-white flex items-center gap-2 transition-colors"
      >
        <FaSearch /> Buscar
      </button>
    </form>
  );
}
