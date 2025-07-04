import React from "react";
import sticky from "../assets/sticky-note.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-purple-300">
              <img
                src={sticky}
                alt="Keeper"
                className="w-8 h-8 inline-block "
              />{" "}
              Keeper
            </h3>
            <p className="text-gray-400 text-sm">
              Your Personal Note Taking App
            </p>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-purple-300 font-semibold">Features</p>
              <p className="text-gray-400 text-sm">
                Create • Organize • Remember
              </p>
            </div>
            <div className="text-center">
              <p className="text-purple-300 font-semibold">Built with</p>
              <p className="text-gray-400 text-sm">React • Tailwind • Vite</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © 2025 Keeper App. Made with ❤️ for better note-taking.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
