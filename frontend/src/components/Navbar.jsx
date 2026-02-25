import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

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
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-ocean-500/10 border-b border-white/20 dark:border-gray-700" : "bg-gradient-to-r from-ocean-900/95 via-ocean-800/90 to-teal-900/95 backdrop-blur-lg"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ${scrolled ? "bg-gradient-to-br from-ocean-500 via-teal-500 to-green-500" : "bg-white/20 backdrop-blur-sm border border-white/30"}`}>
              <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="12" r="8" fill="#FFD700" />
                <circle cx="36" cy="12" r="5" fill="#FFA500" />
                <path d="M18 44 L18 24 Q18 20 20 18 L20 44" fill="#8B4513" />
                <path d="M18 24 Q22 20 24 24 Q22 28 18 24" fill="#8B4513" />
                <path d="M18 20 Q10 12 6 18 Q12 14 18 20" fill="#16a34a" stroke="#15803d" strokeWidth="0.5" />
                <path d="M18 20 Q12 10 8 12 Q14 10 18 18" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                <path d="M18 20 Q24 8 28 10 Q26 14 20 18" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                <path d="M18 20 Q30 14 34 18 Q30 20 22 20" fill="#16a34a" stroke="#15803d" strokeWidth="0.5" />
                <path d="M18 20 Q28 22 32 28 Q26 26 20 22" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                <path d="M4 40 Q12 36 16 40 Q24 44 28 40 Q36 36 44 40 L44 48 L4 48 Z" fill="#0ea5e9" opacity="0.8" />
                <path d="M8 44 Q16 40 20 44 Q28 48 32 44" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold bg-clip-text text-transparent transition-all duration-300 ${scrolled ? "bg-gradient-to-r from-ocean-600 to-teal-600 dark:from-teal-400 dark:to-cyan-400" : "bg-gradient-to-r from-white to-white/90"}`}>
                Visit Sri Lanka
              </span>
              <span className={`text-xs font-medium -mt-1 hidden sm:block transition-colors duration-300 ${scrolled ? "text-saffron dark:text-saffron-400" : "text-white/80"}`}>
                Tropical Paradise
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <a key={item.name} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }} className={`relative px-4 py-2 font-semibold text-sm tracking-wide transition-all duration-300 group ${isActive(item.path) ? scrolled ? "text-black dark:text-white" : "text-white" : scrolled ? "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white" : "text-white/80 hover:text-white"}`}>
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"} ${scrolled ? "bg-gradient-to-r from-ocean-500 to-teal-500" : "bg-gradient-to-r from-saffron-400 to-orange-400"}`} />
              </a>
            ))}
          </div>

          {/* Right Buttons - Theme Toggle + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-all duration-300 ${scrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-white/20 text-white hover:bg-white/30"}`} aria-label="Toggle theme">
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button onClick={() => navigate('/signin')} className={`relative px-6 py-2.5 font-semibold text-sm rounded-full overflow-hidden group transition-all duration-300 ${scrolled ? "border-2 border-ocean-600 dark:border-teal-400 text-ocean-700 dark:text-teal-400 hover:border-ocean-500 dark:hover:border-teal-300" : "border-2 border-white/40 text-white hover:border-white/80"}`}>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-gray-900">
                Sign In
              </span>
              <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${scrolled ? "bg-gradient-to-r from-ocean-500 to-teal-500" : "bg-gradient-to-r from-saffron-500 to-orange-500"}`} />
            </button>
            <button onClick={() => navigate('/register')} className={`relative px-6 py-2.5 font-semibold text-sm text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${scrolled ? "bg-gradient-to-r from-ocean-500 via-teal-500 to-saffron-500 shadow-ocean-500/30 hover:shadow-ocean-500/40" : "bg-gradient-to-r from-saffron-500 via-orange-500 to-red-500 shadow-saffron-500/30 hover:shadow-saffron-500/50"}`}>
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${scrolled ? "text-gray-700 dark:text-gray-200 hover:text-ocean-600 dark:hover:text-teal-400 hover:bg-ocean-50 dark:hover:bg-gray-800" : "text-white hover:text-white hover:bg-white/20"}`}>
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`backdrop-blur-xl border-t shadow-2xl ${scrolled ? "bg-white/95 dark:bg-gray-900/95 border-gray-100 dark:border-gray-700" : "bg-ocean-900/95 border-white/10"}`}>
          <div className="px-4 py-6 space-y-3">
            {/* Theme Toggle for Mobile */}
            <button onClick={toggleTheme} className={`flex items-center w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${scrolled ? "text-gray-700 dark:text-gray-200 hover:text-ocean-600 dark:hover:text-teal-400 hover:bg-ocean-50 dark:hover:bg-gray-800" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
              {isDarkMode ? (
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            
            {navItems.map((item) => (
              <a key={item.name} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); setIsMenuOpen(false); }} className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive(item.path) ? scrolled ? "text-ocean-700 dark:text-teal-400 bg-ocean-50 dark:bg-gray-800 border-l-4 border-ocean-600 dark:border-teal-400" : "text-white bg-white/10 border-l-4 border-saffron-500" : scrolled ? "text-gray-700 dark:text-gray-200 hover:text-ocean-600 dark:hover:text-teal-400 hover:bg-ocean-50 dark:hover:bg-gray-800" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
                {item.name}
              </a>
            ))}
            <div className="flex gap-3 pt-4 border-t border-gray-100/50 dark:border-gray-700/50">
              <button onClick={() => { navigate('/signin'); setIsMenuOpen(false); }} className={`flex-1 font-semibold py-3 rounded-xl transition-colors duration-200 ${scrolled ? "border-2 border-ocean-600 dark:border-teal-400 text-ocean-700 dark:text-teal-400 hover:bg-ocean-50 dark:hover:bg-gray-800" : "border-2 border-white/40 text-white hover:bg-white/10"}`}>
                Sign In
              </button>
              <button onClick={() => { navigate('/register'); setIsMenuOpen(false); }} className="flex-1 bg-gradient-to-r from-saffron-500 via-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-saffron-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
