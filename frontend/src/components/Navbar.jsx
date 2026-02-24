import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Hotels", path: "/hotels" },
  { name: "Tour Packages", path: "/packages" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 via-teal-600 to-ocean-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-ocean-600 bg-clip-text text-transparent">
                Visit Sri Lanka
              </span>
              <span className="text-xs text-saffron font-medium -mt-1 hidden sm:block">
                Paradise Island
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                  isActive(item.path) 
                    ? "text-teal-700" 
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {item.name}
                {/* Active indicator */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-ocean-500 transition-all duration-300 ${
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
                {/* Hover underline animation */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-saffron w-0 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Buttons - CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/signin')}
              className="relative px-6 py-2.5 font-semibold text-teal-700 border-2 border-teal-600 rounded-full overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Sign In
              </span>
              <div className="absolute inset-0 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
            <button
              onClick={() => navigate('/register')}
              className="relative px-6 py-2.5 font-semibold text-white rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-ocean-600 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-lg border-t border-teal-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-teal-700 bg-teal-50 border-l-4 border-teal-600"
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  navigate('/signin');
                  setIsMenuOpen(false);
                }}
                className="flex-1 border-2 border-teal-600 text-teal-700 font-semibold py-3 rounded-xl hover:bg-teal-50 transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-teal-600 to-ocean-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-teal-600/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
