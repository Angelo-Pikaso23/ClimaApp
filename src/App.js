import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import CityCard from "./components/CityCard";

const cities = [
  { name: "Ciudad de México", id: 3530597 },
  { name: "Guadalajara", id: 4005539 },
  { name: "Monterrey", id: 3995465 },
  { name: "Cancún", id: 3531673 },
  { name: "Tijuana", id: 3981609 },
  { name: "Mérida", id: 3523349 },
  { name: "Puebla", id: 3521081 }
];

// Componente SearchBar integrado
function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar ciudad..."
        className="px-4 py-2 rounded-l-full outline-none text-black"
      />
      <button
        type="submit"
        className="bg-blue-700 px-4 py-2 rounded-r-full text-white font-semibold"
      >
        Buscar
      </button>
    </form>
  );
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '069bd2b42ae56be5fac214ac801f2530';

  // Buscar por nombre de ciudad usando la API
  const fetchWeather = async (cityOrId) => {
    try {
      setLoading(true);
      let url;
      if (!isNaN(cityOrId)) {
        url = `https://api.openweathermap.org/data/2.5/weather?id=${cityOrId}&units=metric&lang=es&appid=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrId}&units=metric&lang=es&appid=${API_KEY}`;
      }
      const res = await axios.get(url);
      setWeather(res.data);
      // Elimina la actualización de selectedCity aquí
    } catch (err) {
      console.error("Error obteniendo datos del clima", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity.id);
  }, [selectedCity]);

  return (
    <div className="gradient-bg min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          🇲🇽 Clima México
        </h1>
        <p className="text-white/80 text-lg">
          El clima actual en las principales ciudades de México
        </p>
      </div>
      <SearchBar onSearch={fetchWeather} />

      {/* Weather Card */}
      {weather && !loading && (
        <WeatherCard
          city={weather.name}
          temp={`${Math.round(weather.main.temp)}°C`}
          icon={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          condition={weather.weather[0].description}
          feelsLike={`${Math.round(weather.main.feels_like)}°C`}
          humidity={`${weather.main.humidity}%`}
          wind={`${weather.wind.speed} km/h`}
          uv="N/A"
        />
      )}

      {loading && (
        <div className="text-center text-white mt-8">⏳ Cargando clima...</div>
      )}

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-8">
        {cities.map((city) => (
          <CityCard
            key={city.id}
            name={city.name}
            onClick={() => setSelectedCity(city)}
          />
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={() => fetchWeather(selectedCity.id)}
          className="glass-effect text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        >
          🔄 Actualizar clima
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-white/60">
        <p className="text-sm">
          Datos del clima en tiempo real • Clima México {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
