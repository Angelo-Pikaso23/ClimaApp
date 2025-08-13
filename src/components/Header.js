import React from "react";
import { BiTime } from "react-icons/bi";
export default function Header({ city, country, dateTime }) {
    return (
        <header className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-white/20 backdrop-blur-lg text-white text-center shadow-lg relative">
            
            <div className="absolute top-4 right-6 flex items-center gap-2">
                <BiTime className="text-2xl" />
                <p className="text-lg capitalize">{dateTime}</p>
            </div>
            <div className="text-justify mb-6">
                <h1 className="text-5xl font-bold text-white mb-2 animate-fadeIn">
                    ClimApp
                </h1>
                <p className="text-white/80 text-lg">
                    Clima actualizado de las ciudades de México
                </p>
            </div>
        </header>

    );
}
