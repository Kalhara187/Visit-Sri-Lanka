import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Featured Destinations Data
const destinations = [
  {
    name: "Colombo",
    description: "The vibrant capital city with colonial architecture and modern attractions",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    name: "Kandy",
    description: "Cultural capital surrounded by mountains and ancient temples",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
  },
  {
    name: "Sigiriya",
    description: "Ancient rock fortress and UNESCO World Heritage site",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
  },
  {
    name: "Ella",
    description: "Scenic hill country with waterfalls and tea plantations",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
  {
    name: "Galle",
    description: "Historic fort city on the southern coast",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
  },
  {
    name: "Polonnaruwa",
    description: "Ancient kingdom ruins and archaeological wonders",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
];

// Why Choose Us Data
const whyChooseUs = [
  {
    title: "Trusted Travel Partner",
    description: "Years of experience helping travelers discover the best of Sri Lanka",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Easy Booking",
    description: "Simple and hassle-free booking process for hotels and tours",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Affordable Packages",
    description: "Best value for money with transparent pricing and no hidden costs",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

// Tour Packages Data
const tourPackages = [
  {
    name: "Classic Sri Lanka",
    duration: "5 Days / 4 Nights",
    price: "$450",
    description: "Visit Colombo, Sigiriya, Kandy, and Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    highlights: ["Sigiriya Rock Fortress", "Temple of the Tooth", "Tea Plantations", "Colombo City Tour"],
  },
  {
    name: "Beach Paradise",
    duration: "4 Days / 3 Nights",
    price: "$350",
    description: "Relax at the beautiful beaches of Bentota and Galle",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    highlights: ["Bentota Beach", "Galle Fort", "Turtle Hatchery", "Madu River Safari"],
  },
  {
    name: "Cultural Discovery",
    duration: "7 Days / 6 Nights",
    price: "$650",
    description: "Explore ancient kingdoms, temples, and cultural sites",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    highlights: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Dambulla Caves"],
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    rating: 5,
    comment: "Absolutely amazing experience! The team helped us plan the perfect trip. The accommodations were excellent and the tour guides were very knowledgeable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    comment: "Best vacation ever! Sri Lanka is truly a gem. The beaches, the wildlife, the people - everything was perfect. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    name: "Emma Williams",
    location: "Australia",
    rating: 5,
    comment: "Such a beautiful country with so much to offer. The booking process was smooth and the team was always available to help.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans text-gray-800 dark:text-gray-100">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
          >
            <source src="/videos/srilanka.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Discover the Beauty of <span className="text-sri-lanka-teal">Sri Lanka</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Experience the Pearl of the Indian Ocean - from pristine beaches to ancient temples, lush mountains to vibrant cities
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("destinations")}
              className="bg-gradient-to-r from-sri-lanka-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Destinations
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-sri-lanka-teal hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Book Your Trip
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section id="destinations" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the most breathtaking locations across our beautiful island
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((place, index) => (
              <div
                key={place.name}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">Explore Now</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-sri-lanka-teal transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{place.description}</p>
                  <button className="mt-4 text-sri-lanka-teal font-medium hover:underline flex items-center gap-1">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-sri-lanka-teal to-sri-lanka-ocean">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your trusted partner for an unforgettable Sri Lankan adventure
            </p>
            <div className="w-24 h-1 bg-white mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-sri-lanka-teal shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tour Packages Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Popular Tour Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Handcrafted itineraries for an unforgettable experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tourPackages.map((tour, index) => (
              <div
                key={tour.name}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-sri-lanka-teal text-white px-4 py-1 rounded-full font-semibold text-sm">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{tour.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tour.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs bg-sri-lanka-teal/10 text-sri-lanka-teal px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <div>
                      <span className="text-3xl font-bold text-sri-lanka-teal">{tour.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm"> / person</span>
                    </div>
                    <button className="bg-sri-lanka-teal hover:bg-sri-lanka-teal-dark text-white px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real experiences from our valued customers
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-sri-lanka-sand to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">About Sri Lanka</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Sri Lanka is a tropical paradise famous for golden beaches, lush green
            mountains, wildlife safaris, and rich cultural heritage. Travelers
            from around the world visit this beautiful island to experience
            history, nature, and warm hospitality in one unforgettable journey.
            From the ancient rock fortress of Sigiriya to the pristine beaches of Bentota,
            from the sacred Temple of the Tooth to the scenic train rides through tea plantations,
            Sri Lanka offers something for every traveler.
          </p>
          <button
            onClick={() => navigate('/about')}
            className="mt-8 bg-sri-lanka-teal hover:bg-sri-lanka-teal-dark text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Learn More About Us
          </button>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Explore Sri Lanka
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the beautiful locations across the island. Click on the map to
              explore tourist destinations, hotels, and attractions.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps?q=Sri%20Lanka&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Lanka Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-sri-lanka-ocean to-sri-lanka-teal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Start Your Sri Lankan Adventure Today
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy travelers who have experienced the magic of Sri Lanka. Book your dream vacation now!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-sri-lanka-teal hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border-2 border-white text-white hover:bg-white hover:text-sri-lanka-teal px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
