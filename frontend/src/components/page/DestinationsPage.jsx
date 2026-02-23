import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Destinations Data
const destinations = [
  {
    id: 1,
    name: "Sigiriya",
    tagline: "The Majestic Lion Rock Fortress",
    shortDescription: "Ancient rock fortress and UNESCO World Heritage site",
    fullDescription: "Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the central Matale District of Sri Lanka. Rising dramatically 200 meters above the surrounding plains, this UNESCO World Heritage Site is one of the most remarkable ancient cities in the world. The palace complex was built by King Kashyapa in the 5th century AD and features remarkable frescoes, sophisticated water gardens, and the famous Lion Paw entrance.",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=80",
    bestTime: "November to April",
    category: "Cultural",
    attractions: [
      { name: "Sigiriya Rock Fortress", description: "Ancient palace complex with frescoes", image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80" },
      { name: "Pidurangala Rock", description: "Alternative view of Sigiriya", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
      { name: "Dambulla Cave Temple", description: "UNESCO cave temple complex", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
      { name: "Minneriya National Park", description: "Elephant gathering hotspot", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "Climb Sigiriya Rock", description: "Explore the ancient fortress", icon: "🏰" },
      { name: "Watch Sunrise/Sunset", description: "Spectacular views from the top", icon: "🌅" },
      { name: "Visit Dambulla Caves", description: "Ancient Buddhist paintings", icon: "🛕" },
      { name: "Safari in Minneriya", description: "See wild elephants", icon: "🦁" },
      { name: "Village Tour", description: "Local culture and cuisine", icon: "🏘️" },
    ],
    travelTips: [
      "Start early to avoid crowds and heat",
      "Wear comfortable climbing shoes",
      "Bring water and sunscreen",
      "Allow 3-4 hours for full visit",
      "Hire a local guide for history",
    ],
    entryFee: "Approximately $30 for foreigners",
    nearbyHotels: ["Sigiriya Rock Resort", "Hotel Sigiriya", "Cinnamon Lodge"],
    relatedTours: ["Classic Sri Lanka", "Cultural Discovery", "Adventure & Wildlife"],
  },
  {
    id: 2,
    name: "Kandy",
    tagline: "The Cultural Capital of Sri Lanka",
    shortDescription: "Sacred city surrounded by mountains and temples",
    fullDescription: "Kandy, the capital city of the Central Province, is a vibrant cultural hub nestled among misty mountains and lush tea plantations. Home to the sacred Temple of the Tooth Relic, Kandy offers a perfect blend of ancient traditions and modern life. The city is famous for its scenic lake, traditional dance performances, and proximity to beautiful hill country attractions.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    bestTime: "December to April",
    category: "Cultural",
    attractions: [
      { name: "Temple of the Tooth", description: "Sacred Buddhist temple", image: "https://images.unsplash.com/photo-1599521233934-7b2d8a608a8d?w=600&q=80" },
      { name: "Kandy Lake", description: "Scenic artificial lake", image: "https://images.unsplash.com/photo-1565019595746-76e2549b2122?w=600&q=80" },
      { name: "Royal Botanical Gardens", description: "Largest botanical garden", image: "https://images.unsplash.com/photo-1588515603069-48b622710a16?w=600&q=80" },
      { name: "Udawalawe National Park", description: "Wildlife safari destination", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "Temple of the Tooth", description: "Evenening pooja ceremony", icon: "🛕" },
      { name: "Kandy Lake Walk", description: "Scenic stroll around the lake", icon: "🚶" },
      { name: "Cultural Show", description: "Traditional Kandyan dance", icon: "💃" },
      { name: "Tea Factory Tour", description: "Learn about tea making", icon: "🍵" },
      { name: "Shopping", description: "Buy local crafts and gems", icon: "🛍️" },
    ],
    travelTips: [
      "Attend the evening pooja ceremony",
      "Book cultural shows in advance",
      "Visit on weekends for Esala Perahera (July/August)",
      "Try local rice and curry",
      "Explore the local market",
    ],
    entryFee: "Temple of Tooth: $25, Gardens: $15",
    nearbyHotels: ["Kandy Lake View Hotel", "Earl's Regency", "Mahaweli Reach Hotel"],
    relatedTours: ["Classic Sri Lanka", "Hill Country Express", "Cultural Discovery"],
  },
  {
    id: 3,
    name: "Colombo",
    tagline: "Sri Lanka's Vibrant Capital City",
    shortDescription: "Commercial hub with colonial charm",
    fullDescription: "Colombo, Sri Lanka's capital city, is a bustling metropolis that seamlessly blends colonial architecture with modern skyscrapers. From the historic Fort area to the trendy neighborhoods of Colombo 7, the city offers diverse attractions including museums, galleries, parks, and excellent dining options. It's the main entry point for most visitors and a gateway to explore the island.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    bestTime: "December to March",
    category: "City",
    attractions: [
      { name: "Gangaramaya Temple", description: "Buddhist and Hindu temple", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80" },
      { name: "National Museum", description: "Ancient artifacts and history", image: "https://images.unsplash.com/photo-1588414541852-f374dc117545?w=600&q=80" },
      { name: "Galle Face Green", description: "Urban park and promenade", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
      { name: "Lotus Tower", description: "Iconic communications tower", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "City Tour", description: "Explore colonial and modern Colombo", icon: "🚗" },
      { name: "Street Food", description: "Try local kottu and hoppers", icon: "🍜" },
      { name: "Shopping", description: "Visit Odel and Pettah Market", icon: "🛍️" },
      { name: "Nightlife", description: "Bars and clubs in Colombo 3", icon: "🍸" },
      { name: "Museum Visit", description: "Learn Sri Lankan history", icon: "🏛️" },
    ],
    travelTips: [
      "Use tuk-tuks for short distances",
      "Visit Pettah for bargains",
      "Try seafood at Ministry of Crab",
      "Explore Colombo 7 for culture",
      "Book airport transfers in advance",
    ],
    entryFee: "Museums: $10-15, Temples: Free",
    nearbyHotels: ["Grand Hotel Colombo", "Cinnamon Grand", "Shangri-La Colombo"],
    relatedTours: ["Classic Sri Lanka", "City Break", "Beach Paradise"],
  },
  {
    id: 4,
    name: "Ella",
    tagline: "Paradise in the Hill Country",
    shortDescription: "Scenic hill town with waterfalls and tea estates",
    fullDescription: "Ella is a charming small town nestled in the misty mountains of Sri Lanka's hill country. Surrounded by lush tea plantations, cascading waterfalls, and hiking trails, Ella is a paradise for nature lovers and adventure seekers. The famous Nine Arches Bridge, Little Adam's Peak, and the scenic train ride through the mountains are among the must-visit attractions.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    bestTime: "December to March",
    category: "Nature",
    attractions: [
      { name: "Nine Arches Bridge", description: "Iconic railway bridge", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
      { name: "Little Adam's Peak", description: "Scenic hiking trail", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" },
      { name: "Ravana Falls", description: "Beautiful waterfall", image: "https://images.unsplash.com/photo-1559800602-4fa9a82d2d6a?w=600&q=80" },
      { name: "Ella Rock", description: "Popular hiking destination", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "Hike Little Adam's Peak", description: "Sunrise trek with views", icon: "🏔️" },
      { name: "Train to Kandy", description: "Scenic railway journey", icon: "🚂" },
      { name: "Visit Tea Plantations", description: "Learn about tea making", icon: "🍵" },
      { name: "Explore Ravana Caves", description: "Ancient cave system", icon: "🕳️" },
      { name: "Zip Lining", description: "Adventure activity", icon: "🪢" },
    ],
    travelTips: [
      "Book train tickets in advance",
      "Start hikes early morning",
      "Bring warm clothes (cool climate)",
      "Stay at boutique eco-lodges",
      "Try the famous Ravana ice cream",
    ],
    entryFee: "Free (most attractions)",
    nearbyHotels: ["Ella Mountain Retreat", "98 Acres Resort", "Melheim Ahangama"],
    relatedTours: ["Hill Country Express", "Adventure & Wildlife", "Scenic Sri Lanka"],
  },
  {
    id: 5,
    name: "Galle",
    tagline: "A Living Heritage City",
    shortDescription: "UNESCO fort city with colonial charm",
    fullDescription: "Galle is a captivating coastal city famous for its Dutch colonial fort, a UNESCO World Heritage Site. The fortified old town features cobblestone streets, boutique hotels, art galleries, and charming cafes. Beyond the fort, Galle offers beautiful beaches, turtle hatcheries, and easy access to southern Sri Lanka's wildlife parks.",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80",
    bestTime: "November to April",
    category: "Cultural",
    attractions: [
      { name: "Galle Fort", description: "UNESCO World Heritage Site", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80" },
      { name: "Dutch Hospital", description: "Colonial shopping complex", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { name: "Galle Lighthouse", description: "Historic lighthouse", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
      { name: "Unawatuna Beach", description: "Beautiful beach destination", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "Fort Walk", description: "Explore the old town", icon: "🚶" },
      { name: "Sunset at Fort", description: "Gorgeous ocean views", icon: "🌅" },
      { name: "Beach Day", description: "Relax at Unawatuna", icon: "🏖️" },
      { name: "Turtle Hatchery", description: "Learn about conservation", icon: "🐢" },
      { name: "Whale Watching", description: "See blue whales", icon: "🐋" },
    ],
    travelTips: [
      "Stay inside the fort for atmosphere",
      "Watch sunset from the ramparts",
      "Visit on weekdays to avoid crowds",
      "Try Dutch Hospital cafes",
      "Take a day trip to Mirissa",
    ],
    entryFee: "Free (Fort area), Activities: $30-50",
    nearbyHotels: ["Galle Fort Inn", "The Fort Printers", "Amari Galle"],
    relatedTours: ["Beach Paradise", "Cultural Discovery", "Southern Explorer"],
  },
  {
    id: 6,
    name: "Polonnaruwa",
    tagline: "Kingdom of the Great Kings",
    shortDescription: "Ancient capital with impressive ruins",
    fullDescription: "Polonnaruwa was the capital of Sri Lanka from the 11th to 13th centuries and is today a UNESCO World Heritage Site. The well-preserved ruins include massive stone statues, intricate carvings, ancient temples, and the impressive Parakrama Samudra (Sea of Sri Lanka) - a large irrigation lake. It's one of the best preserved ancient cities in Sri Lanka.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    bestTime: "May to September",
    category: "Cultural",
    attractions: [
      { name: "Royal Palace", description: "Ruins of the king's palace", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
      { name: "Gal Vihara", description: "Four Buddha statues", image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80" },
      { name: "Parakrama Samudra", description: "Ancient irrigation lake", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80" },
      { name: "Lankatilaka Temple", description: "Impressive brick temple", image: "https://images.unsplash.com/photo-1565019595746-76e2549b2122?w=600&q=80" },
    ],
    thingsToDo: [
      { name: "Explore Ruins", description: "Cycle through ancient city", icon: "🚴" },
      { name: "Photography", description: "Capture ancient statues", icon: "📷" },
      { name: "Bird Watching", description: "At Parakrama Samudra", icon: "🦅" },
      { name: "Sunset at Gal Vihara", description: "Golden hour magic", icon: "🌅" },
      { name: "Archaeological Museum", description: "Learn the history", icon: "🏛️" },
    ],
    travelTips: [
      "Rent a bicycle to explore",
      "Hire a guide for history",
      "Bring sunscreen and water",
      "Visit early morning",
      "Don't miss Gal Vihara statues",
    ],
    entryFee: "$25 for foreigners",
    nearbyHotels: ["Hotel Sudu Aralia", "The Lake Polonnaruwa", "Cashew Nut Resort"],
    relatedTours: ["Cultural Discovery", "Classic Sri Lanka", "Ancient Kingdoms"],
  },
];

export default function DestinationsPage() {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [activeTab, setActiveTab] = useState("about");
  const [showDestinationList, setShowDestinationList] = useState(true);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (showDestinationList) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Destinations
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the beauty, culture, and adventure across Sri Lanka
            </p>
          </div>
        </section>

        {/* Destination Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => {
                    setSelectedDestination(destination);
                    setShowDestinationList(false);
                  }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-64">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.name}</h3>
                      <p className="text-white/80 text-sm">{destination.tagline}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-sri-lanka-teal text-white px-3 py-1 rounded-full text-sm">
                      {destination.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{destination.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Best time: {destination.bestTime}</span>
                      <button className="text-sri-lanka-teal font-medium hover:underline flex items-center gap-1">
                        Explore
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <img
          src={selectedDestination.image}
          alt={selectedDestination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => setShowDestinationList(true)}
          className="absolute top-24 left-4 md:left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Destinations
        </button>

        <div className="absolute bottom-16 left-4 md:left-8 text-white">
          <span className="bg-sri-lanka-teal px-3 py-1 rounded-full text-sm mb-4 inline-block">
            {selectedDestination.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{selectedDestination.name}</h1>
          <p className="text-xl md:text-2xl text-white/90">{selectedDestination.tagline}</p>
          <p className="mt-4 text-white/80">Best time to visit: {selectedDestination.bestTime}</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-8 py-4">
            {["about", "attractions", "things-to-do", "travel-info"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap font-medium transition-colors ${
                  activeTab === tab
                    ? "text-sri-lanka-teal border-b-2 border-sri-lanka-teal"
                    : "text-gray-600 hover:text-sri-lanka-teal"
                }`}
              >
                {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* About Section */}
          {activeTab === "about" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About {selectedDestination.name}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {selectedDestination.fullDescription}
              </p>
              <div className="bg-sri-lanka-teal/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Facts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-medium text-gray-700">Best Time to Visit</p>
                      <p className="text-gray-600">{selectedDestination.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎫</span>
                    <div>
                      <p className="font-medium text-gray-700">Entry Fee</p>
                      <p className="text-gray-600">{selectedDestination.entryFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attractions Section */}
          {activeTab === "attractions" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Attractions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedDestination.attractions.map((attraction, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                      <p className="text-gray-600">{attraction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Things to Do Section */}
          {activeTab === "things-to-do" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Things to Do</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedDestination.thingsToDo.map((activity, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <span className="text-4xl mb-4 block">{activity.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.name}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Info Section */}
          {activeTab === "travel-info" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Travel Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Map */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps?q=${selectedDestination.name},+Sri+Lanka&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title={`${selectedDestination.name} Map`}
                  ></iframe>
                </div>
                
                {/* Tips */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Travel Tips</h3>
                  <ul className="space-y-3">
                    {selectedDestination.travelTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <span className="text-sri-lanka-teal mt-1">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Tours & Hotels */}
      <section className="py-12 px-4 bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Plan Your Trip to {selectedDestination.name}</h2>
          
          {/* Related Tours */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Related Tour Packages</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedDestination.relatedTours.map((tour, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 transition-colors cursor-pointer">
                  <p className="font-medium">{tour}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Nearby Hotels */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Nearby Hotels</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedDestination.nearbyHotels.map((hotel, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 transition-colors cursor-pointer">
                  <p className="font-medium">{hotel}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/packages')}
              className="bg-white text-sri-lanka-teal px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View Tour Packages
            </button>
            <button
              onClick={() => navigate('/hotels')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-sri-lanka-teal transition-colors"
            >
              Book Hotels
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
