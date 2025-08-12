import React from "react";

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
  return (
    <div className="weather-card rounded-3xl p-8 mb-8 text-white shadow-2xl max-w-2xl mx-auto">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <img src={icon} alt="icon" className="w-16 h-16 weather-icon" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{city}</h2>
        <div className="text-6xl font-light mb-4">{temp}</div>
        <p className="text-xl mb-6 capitalize">{condition}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="glass-effect rounded-xl p-3">
            <div className="text-sm opacity-80">Sensación</div>
            <div className="text-lg font-semibold">{feelsLike}</div>
          </div>
          <div className="glass-effect rounded-xl p-3">
            <div className="text-sm opacity-80">Humedad</div>
            <div className="text-lg font-semibold">{humidity}</div>
          </div>
          <div className="glass-effect rounded-xl p-3">
            <div className="text-sm opacity-80">Viento</div>
            <div className="text-lg font-semibold">{wind}</div>
          </div>
          <div className="glass-effect rounded-xl p-3">
            <div className="text-sm opacity-80">UV</div>
            <div className="text-lg font-semibold">{uv}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
