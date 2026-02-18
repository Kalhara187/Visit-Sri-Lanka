import React from "react";

const destinations = [
  {
    name: "Colombo",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Kandy",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
  },
  {
    name: "Sigiriya",
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd",
  },
  {
    name: "Ella",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

const tours = ["3 Day Tour", "5 Day Tour", "7 Day Tour"];

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      >
        <div className="text-center bg-black/50 p-10 rounded-2xl backdrop-blur-md">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Visit Sri Lanka
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the Pearl of the Indian Ocean
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-semibold transition">
              Explore Destinations
            </button>
            <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-xl font-semibold transition">
              Book Your Trip
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Destinations
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {destinations.map((place) => (
            <div
              key={place.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <button className="text-green-600 font-medium hover:underline">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Sri Lanka</h2>
        <p className="text-gray-600 leading-relaxed">
          Sri Lanka is a tropical paradise famous for golden beaches, lush green
          mountains, wildlife safaris, and rich cultural heritage. Travelers
          from around the world visit this beautiful island to experience
          history, nature, and warm hospitality in one unforgettable journey.
        </p>
      </section>

      {/* Tour Packages */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Popular Tour Packages
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tours.map((tour) => (
            <div
              key={tour}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{tour}</h3>
              <p className="text-gray-600 mb-6">
                Enjoy a guided journey across Sri Lanka with comfortable hotels,
                transport, and unforgettable experiences included.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Visit Sri Lanka. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
