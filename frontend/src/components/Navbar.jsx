import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Hotels", path: "/hotels" },
  { name: "Tour Packages", path: "/packages" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Feedback", path: "/feedback" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-ocean-500/10 border-b border-white/20" 
          : "bg-gradient-to-r from-ocean-900/95 via-ocean-800/90 to-teal-900/95 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ${
              scrolled 
                ? "bg-gradient-to-br from-ocean-500 via-teal-500 to-saffron-500" 
                : "bg-white/20 backdrop-blur-sm border border-white/30"
            }`}>
              <span className={`text-xl font-bold ${scrolled ? "text-white" : "text-white"}`}>SL</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold bg-clip-text text-transparent transition-all duration-300 ${
                scrolled 
                  ? "bg-gradient-to-r from-ocean-600 to-teal-600" 
                  : "bg-gradient-to-r from-white to-white/90"
              }`}>
                Visit Sri Lanka
              </span>
              <span className={`text-xs font-medium -mt-1 hidden sm:block transition-colors duration-300 ${
                scrolled ? "text-saffron" : "text-saffron-light"
              }`}>
                Paradise Island
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`relative px-4 py-2 font-semibold text-sm tracking-wide transition-all duration-300 group ${
                  isActive(item.path) 
                    ? scrolled ? "text-ocean-600" : "text-white"
                    : scrolled ? "text-gray-600 hover:text-ocean-600" : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                {/* Active/Hover indicator */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
                  isActive(item.path) 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                } ${
                  scrolled 
                    ? "bg-gradient-to-r from-ocean-500 to-teal-500" 
                    : "bg-gradient-to-r from-saffron-400 to-orange-400"
                }`} />
              </a>
            ))}
          </div>

          {/* Right Buttons - CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/signin')}
              className={`relative px-6 py-2.5 font-semibold text-sm rounded-full overflow-hidden group transition-all duration-300 ${
                scrolled 
                  ? "border-2 border-ocean-600 text-ocean-700 hover:border-ocean-500" 
                  : "border-2 border-white/40 text-white hover:border-white/80"
              }`}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Sign In
              </span>
              <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                scrolled 
                  ? "bg-gradient-to-r from-ocean-500 to-teal-500" 
                  : "bg-gradient-to-r from-saffron-500 to-orange-500"
              }`} />
            </button>
            <button
              onClick={() => navigate('/register')}
              className={`relative px-6 py-2.5 font-semibold text-sm text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                scrolled 
                  ? "bg-gradient-to-r from-ocean-500 via-teal-500 to-saffron-500 shadow-ocean-500/30 hover:shadow-ocean-500/40" 
                  : "bg-gradient-to-r from-saffron-500 via-orange-500 to-red-500 shadow-saffron-500/30 hover:shadow-saffron-500/50"
              }`}
            >
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled 
                ? "text-gray-700 hover:text-ocean-600 hover:bg-ocean-50" 
                : "text-white hover:text-white hover:bg-white/20"
            }`}
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
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`backdrop-blur-xl border-t shadow-2xl ${
          scrolled 
            ? "bg-white/95 border-gray-100" 
            : "bg-ocean-900/95 border-white/10"
        }`}>
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? scrolled 
                      ? "text-ocean-700 bg-ocean-50 border-l-4 border-ocean-600" 
                      : "text-white bg-white/10 border-l-4 border-saffron-500"
                    : scrolled 
                      ? "text-gray-700 hover:text-ocean-600 hover:bg-ocean-50" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="flex gap-3 pt-4 border-t border-gray-100/50">
              <button
                onClick={() => {
                  navigate('/signin');
                  setIsMenuOpen(false);
                }}
                className={`flex-1 font-semibold py-3 rounded-xl transition-colors duration-200 ${
                  scrolled 
                    ? "border-2 border-ocean-600 text-ocean-700 hover:bg-ocean-50" 
                    : "border-2 border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-saffron-500 via-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-saffron-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
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
