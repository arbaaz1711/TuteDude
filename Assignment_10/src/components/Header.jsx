import React from "react";
import sticky from "../assets/sticky-note.png";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src={sticky}
                alt="Keeper"
                className="w-14 h-14 inline-block "
              />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 leading-tight">
                Keeper
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 font-medium">
              Your Personal Note Taking App
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
