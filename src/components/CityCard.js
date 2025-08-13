import React from "react";
import { FaCity } from "react-icons/fa";


export default function CityCard({ name, temp, condition, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-6 cursor-pointer bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        {/* FaCity y nombre juntos a la izquierda */}
        <div className="flex items-center gap-2">
          <FaCity className="text-2xl text-blue-300" />
          <h3 className="text-xl font-semibold text-white">{name}</h3>
        </div>
        {/* Icono del clima a la derecha */}
        {icon && (
          <div className="flex justify-center items-center">
            <img src={icon} alt="icono clima" className="w-12 h-12" />
          </div>
        )}
      </div>
      <div className="mb-2">
        <span className="text-2xl font-bold text-white">{temp}</span>
        <span className="ml-2 text-white/80 capitalize">{condition}</span>
      </div>
      <p className="text-sm text-white/80">Ver clima</p>
    </div>
  );
}
