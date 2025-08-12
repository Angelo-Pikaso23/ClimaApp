import React from "react";

export default function CityCard({ name, onClick }) {
  return (
    <div
      onClick={onClick}
      className="city-card rounded-2xl p-6 text-white cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span className="text-2xl">🏙️</span>
      </div>
      <p className="text-sm opacity-80">Ver clima</p>
    </div>
  );
}
