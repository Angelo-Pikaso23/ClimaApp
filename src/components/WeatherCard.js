import React from "react";
import { WiThermometer } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiCloudyGusts } from "react-icons/wi";
import { WiDaySunnyOvercast } from "react-icons/wi";
function getFormattedDate() {
  const date = new Date();
  const days = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} de ${month} de ${year}`;
}

export default function WeatherCard({
  city,
  temp,
  icon,
  condition,
  feelsLike,
  humidity,
  wind,
  uv
}) {
  const fechaActual = getFormattedDate();

  return (
    <div className="rounded-3xl p-8 mb-8 text-white shadow-2xl max-w-2xl mx-auto bg-white/10 backdrop-blur-lg animate-fadeIn">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <img src={icon} alt="icon" className="w-20 h-20 drop-shadow-lg" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{city}</h2>
        <div className="text-sm text-white/70 mb-2">{fechaActual}</div>
        <div className="text-6xl font-extrabold mb-4">{temp}</div>
        <p className="text-lg mb-6 capitalize text-white/80">{condition}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl p-3 bg-white/20 backdrop-blur-sm">
            <div className="text-sm opacity-80">
              <WiThermometer size={46}/>Sensación</div>
            <div className="text-lg font-semibold">{feelsLike}</div>
          </div>
          <div className="rounded-xl p-3 bg-white/20 backdrop-blur-sm">
            <div className="text-sm opacity-80">
              
              <WiHumidity size={46}/>Humedad</div>
            <div className="text-lg font-semibold">{humidity}</div>
          </div>
          <div className="rounded-xl p-3 bg-white/20 backdrop-blur-sm">
            <div className="text-sm opacity-80"><WiCloudyGusts size={46} />Viento</div>
            <div className="text-lg font-semibold">{wind}</div>
          </div>
          <div className="rounded-xl p-3 bg-white/20 backdrop-blur-sm">
            <div className="text-sm opacity-80"><WiDaySunnyOvercast size={46} />UV</div>
            <div className="text-lg font-semibold">{uv}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
