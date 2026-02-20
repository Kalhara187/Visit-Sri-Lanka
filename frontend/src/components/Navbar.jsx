import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const destinations = ["Colombo", "Kandy", "Sigiriya", "Ella", "Galle"];
const navItems = [
  { name: "Home", path: "/" },
  { name: "Hotels", path: "#" },
  { name: "Tour Packages", path: "#" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">SL</span>
            </div>
            <span className="text-xl font-bold text-teal-700">Visit Sri Lanka</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  if (item.path !== "#") {
                    e.preventDefault();
                    navigate(item.path);
                  }
                }}
                className="relative font-medium text-gray-700 hover:text-teal-600 transition"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
            ))}

            {/* Destinations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                className="flex items-center font-medium text-gray-700 hover:text-teal-600 transition"
              >
                Destinations
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isDestinationsOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDestinationsOpen && (
                <div className="absolute left-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                  {destinations.map((place) => (
                    <a
                      key={place}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
                    >
                      {place}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate('/signin')}
              className="text-teal-700 font-medium hover:underline"
            >
              Login
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow transition">
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  if (item.path !== "#") {
                    e.preventDefault();
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }
                }}
                className="block font-medium text-gray-700 hover:text-teal-600"
              >
                {item.name}
              </a>
            ))}

            <div className="border-t pt-3">
              <button
                onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                className="flex justify-between w-full font-medium text-gray-700"
              >
                Destinations
                <span>{isDestinationsOpen ? "−" : "+"}</span>
              </button>

              {isDestinationsOpen && (
                <div className="mt-2 pl-3 space-y-1">
                  {destinations.map((place) => (
                    <a key={place} href="#" className="block text-gray-600 hover:text-teal-600">
                      {place}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-3 border-t">
              <button
                onClick={() => navigate('/signin')}
                className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-lg"
              >
                Login
              </button>
              <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
