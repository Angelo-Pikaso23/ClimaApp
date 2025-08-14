import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import CityCard from "./components/CityCard";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { RxUpdate } from "react-icons/rx";
import { GoCheckCircle } from "react-icons/go";

const cities = [
  { name: "Ciudad de México", id: 3530597 },
  { name: "Guadalajara", id: 4005539 },
  { name: "Monterrey", id: 3995465 },
  { name: "Cancún", id: 3531673 },
  { name: "Tijuana", id: 3981609 },
  { name: "Mérida", id: 3523349 },
  { name: "Puebla", id: 3521081 }
];

export default function App() {
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [citiesWeather, setCitiesWeather] = useState({});
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [manualSearch, setManualSearch] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

  const fetchWeather = useCallback(async (cityOrId, showNotif = false) => {
    try {
      setLoading(true);

      if (showNotif) {
        setNotification({ type: "loading", message: "Actualizando clima..." });
        setShowNotification(true);
      }

      let url;
      if (!isNaN(cityOrId)) {
        url = `https://api.openweathermap.org/data/2.5/weather?id=${cityOrId}&units=metric&lang=es&appid=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrId}&units=metric&lang=es&appid=${API_KEY}`;
      }

      const res = await axios.get(url);
      setWeather(res.data);

      if (showNotif) {
        setNotification({ type: "success", message: "Clima actualizado" });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        setTimeout(() => setNotification(null), 2000);
      }
    } catch (err) {
      console.error("Error obteniendo datos del clima", err);
      setWeather(null);
      setNotification({ type: "error", message: "Error al actualizar el clima" });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
      setTimeout(() => setNotification(null), 2000);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  const formatDate = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!manualSearch) {
      fetchWeather(selectedCity.id, false);
    }
    setManualSearch(false);
    setDateTime(formatDate(new Date()));
    const interval = setInterval(() => {
      setDateTime(formatDate(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedCity, manualSearch, fetchWeather]);

  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      const weatherData = {};
      for (const city of cities) {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&lang=es&appid=${API_KEY}`;
          const res = await axios.get(url);
          weatherData[city.id] = {
            temp: `${Math.round(res.data.main.temp)}°C`,
            condition: res.data.weather[0].description,
            icon: res.data.weather[0].icon
          };
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch {
          weatherData[city.id] = {
            temp: "--",
            condition: "Sin datos",
            icon: null
          };
        }
      }
      setCitiesWeather(weatherData);
    };
    fetchAllCitiesWeather();
  }, [API_KEY]);

  const handleManualUpdate = () => {
    fetchWeather(selectedCity.id, true);
  };

  const handleSearch = async (cityOrName) => {
    const foundCity = cities.find(c => c.name.toLowerCase() === cityOrName.toLowerCase());
    if (foundCity) {
      setManualSearch(false);
      setSelectedCity(foundCity);
    } else {
      try {
        setLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrName}&units=metric&lang=es&appid=${API_KEY}`;
        const res = await axios.get(url);
        setWeather(res.data);
        setManualSearch(true);
        setSelectedCity({ name: res.data.name, id: res.data.id });
      } catch (err) {
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <Header dateTime={dateTime} />
      <SearchBar onSearch={handleSearch} />

      {notification && (
        <div
          className={`fixed top-6 right-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-500 ease-in-out ${showNotification ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          style={{ minWidth: "220px" }}
        >
          <span className="flex items-center gap-2">
            {notification.type === "loading" && <RxUpdate className="animate-spin" />}
            {notification.type === "success" && <GoCheckCircle className="text-green-300" />}
            {notification.type === "error" && "❌"}
            {notification.message}
          </span>
        </div>
      )}

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
        <div className="text-center text-white mt-8 animate-pulse">
          ⏳ Cargando clima...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-8">
        {cities.map((city) => (
          <CityCard
            key={city.id}
            name={city.name}
            temp={citiesWeather[city.id]?.temp}
            condition={citiesWeather[city.id]?.condition}
            icon={
              citiesWeather[city.id]?.icon
                ? `https://openweathermap.org/img/wn/${citiesWeather[city.id].icon}@2x.png`
                : undefined
            }
            onClick={() => setSelectedCity(city)}
          />
        ))}
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={handleManualUpdate}
          className="bg-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <RxUpdate /> Actualizar clima
        </button>
      </div>

      <div className="text-center mt-12 text-white/60">
        <p className="text-sm">
          Datos del clima en tiempo real • Clima México {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
