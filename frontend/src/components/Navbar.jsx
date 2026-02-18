import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);

  const destinations = [
    { name: 'Colombo', href: '#' },
    { name: 'Kandy', href: '#' },
    { name: 'Sigiriya', href: '#' },
    { name: 'Ella', href: '#' },
    { name: 'Galle', href: '#' },
  ];

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Hotels', href: '#' },
    { name: 'Tour Packages', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sri-lanka-teal to-sri-lanka-ocean rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SL</span>
              </div>
              <span className="text-xl font-bold text-sri-lanka-teal">Visit Sri Lanka</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-sri-lanka-teal font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}

            {/* Destinations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                className="text-gray-700 hover:text-sri-lanka-teal font-medium transition-colors duration-200 flex items-center"
              >
                Destinations
                <svg
                  className={`ml-1 h-5 w-5 transition-transform duration-200 ${isDestinationsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDestinationsOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                  {destinations.map((destination) => (
                    <a
                      key={destination.name}
                      href={destination.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-sri-lanka-teal hover:text-white transition-colors duration-200"
                    >
                      {destination.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 lg:w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-sri-lanka-teal focus:ring-1 focus:ring-sri-lanka-teal"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Login/Register Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sri-lanka-teal hover:text-sri-lanka-teal-dark font-medium transition-colors duration-200">
              Login
            </button>
            <button className="bg-sri-lanka-teal hover:bg-sri-lanka-teal-dark text-white px-4 py-2 rounded-full font-medium transition-colors duration-200">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sri-lanka-teal focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sri-lanka-teal focus:ring-1 focus:ring-sri-lanka-teal"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-sri-lanka-teal font-medium py-2"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Destinations */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-sri-lanka-teal font-medium py-2"
              >
                <span>Destinations</span>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${isDestinationsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDestinationsOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  {destinations.map((destination) => (
                    <a
                      key={destination.name}
                      href={destination.href}
                      className="block text-gray-600 hover:text-sri-lanka-teal py-1"
                    >
                      {destination.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Login/Register */}
            <div className="border-t border-gray-100 pt-4 flex space-x-4">
              <button className="flex-1 text-sri-lanka-teal border border-sri-lanka-teal px-4 py-2 rounded-lg font-medium">
                Login
              </button>
              <button className="flex-1 bg-sri-lanka-teal text-white px-4 py-2 rounded-lg font-medium">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
