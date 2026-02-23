import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tour Packages Data
const tourPackages = [
  {
    id: 1,
    name: "Classic Sri Lanka",
    shortDescription: "Experience the best of Sri Lanka in this comprehensive tour",
    fullDescription: "Discover the ancient wonders and natural beauty of Sri Lanka on this 5-day journey. Visit the iconic Sigiriya Rock Fortress, explore the cultural capital of Kandy, and enjoy the scenic tea plantations of Nuwara Eliya.",
    duration: "5 Days / 4 Nights",
    price: 450,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    locations: ["Colombo", "Sigiriya", "Kandy", "Nuwara Eliya"],
    category: "Cultural",
    highlights: ["Sigiriya Rock Fortress", "Temple of the Tooth", "Tea Plantations", "Colombo City Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Arrive at Colombo airport. Transfer to hotel. Evening city tour of Colombo." },
      { day: 2, title: "Colombo to Sigiriya", description: "Visit the iconic Sigiriya Rock Fortress. Explore Dambulla Cave Temple." },
      { day: 3, title: "Sigiriya to Kandy", description: "Travel to Kandy. Visit the Temple of the Tooth and explore Kandy city." },
      { day: 4, title: "Kandy to Nuwara Eliya", description: "Scenic train ride to Nuwara Eliya. Visit tea plantations and waterfalls." },
      { day: 5, title: "Departure", description: "Return to Colombo for departure." },
    ],
    hotels: ["4-star hotels in each city"],
    meals: "Breakfast included",
    transport: "Air-conditioned vehicle",
    cancellation: "Free cancellation up to 7 days before departure",
  },
  {
    id: 2,
    name: "Beach Paradise",
    shortDescription: "Relax on pristine beaches and explore coastal wonders",
    fullDescription: "Unwind on the beautiful beaches of southern Sri Lanka. Visit the historic Galle Fort, enjoy water sports in Bentota, and experience a memorable Madu River safari.",
    duration: "4 Days / 3 Nights",
    price: 350,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    locations: ["Colombo", "Bentota", "Galle"],
    category: "Beach",
    highlights: ["Bentota Beach", "Galle Fort", "Turtle Hatchery", "Madu River Safari"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Arrive at Colombo airport. Transfer to Bentota beach resort." },
      { day: 2, title: "Bentota Beach Day", description: "Enjoy water sports, beach activities, and relax at the resort." },
      { day: 3, title: "Galle Exploration", description: "Visit Galle Fort, Dutch Hospital, and explore the historic city." },
      { day: 4, title: "Departure", description: "Return to Colombo for departure." },
    ],
    hotels: ["Beach resort in Bentota"],
    meals: "Breakfast and dinner included",
    transport: "Air-conditioned vehicle",
    cancellation: "Free cancellation up to 7 days before departure",
  },
  {
    id: 3,
    name: "Cultural Discovery",
    shortDescription: "Explore ancient kingdoms and sacred temples",
    fullDescription: "Delve into Sri Lanka's rich cultural heritage with visits to ancient kingdoms, UNESCO World Heritage sites, and sacred temples that date back centuries.",
    duration: "7 Days / 6 Nights",
    price: 650,
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    locations: ["Colombo", "Anuradhapura", "Polonnaruwa", "Sigiriya", "Dambulla", "Kandy"],
    category: "Cultural",
    highlights: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Dambulla Caves"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Arrive at Colombo airport. Transfer to hotel." },
      { day: 2, title: "To Anuradhapura", description: "Visit the ancient city of Anuradhapura, UNESCO World Heritage site." },
      { day: 3, title: "Polonnaruwa", description: "Explore the medieval capital of Polonnaruwa." },
      { day: 4, title: "Sigiriya & Dambulla", description: "Visit Sigiriya Rock Fortress and Dambulla Cave Temple." },
      { day: 5, title: "To Kandy", description: "Travel to Kandy via Matale spice garden." },
      { day: 6, title: "Kandy Exploration", description: "Visit Temple of the Tooth, Royal Botanical Gardens." },
      { day: 7, title: "Departure", description: "Return to Colombo for departure." },
    ],
    hotels: ["Heritage hotels in ancient cities"],
    meals: "Breakfast and dinner included",
    transport: "Air-conditioned vehicle with guide",
    cancellation: "Free cancellation up to 7 days before departure",
  },
  {
    id: 4,
    name: "Adventure & Wildlife",
    shortDescription: "Thrilling safaris and mountain adventures",
    fullDescription: "Experience the wild side of Sri Lanka with exciting wildlife safaris in Yala and Udawalawe, combined with adventurous activities like hiking and camping.",
    duration: "6 Days / 5 Nights",
    price: 550,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    locations: ["Colombo", "Kandy", "Ella", "Yala", "Udawalawe"],
    category: "Adventure",
    highlights: ["Yala Safari", "Udawalawe Elephant Sanctuary", "Ella Hiking", "Nine Arches Bridge"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Arrive at Colombo airport. Transfer to Kandy." },
      { day: 2, title: "Kandy to Ella", description: "Scenic train ride to Ella. Hike to Little Adam's Peak." },
      { day: 3, title: "Ella to Yala", description: "Visit Nine Arches Bridge. Afternoon Yala safari." },
      { day: 4, title: "Yala Safari", description: "Early morning and afternoon jeep safaris in Yala National Park." },
      { day: 5, title: "Udawalawe", description: "Visit Elephant Sanctuary. Return to Colombo." },
      { day: 6, title: "Departure", description: "Departure from Colombo." },
    ],
    hotels: ["Eco-lodges and adventure camps"],
    meals: "All meals included",
    transport: "4x4 jeep for safaris",
    cancellation: "Free cancellation up to 7 days before departure",
  },
  {
    id: 5,
    name: "Hill Country Express",
    shortDescription: "Scenic journey through tea plantations",
    fullDescription: "Experience the breathtaking beauty of Sri Lanka's central highlands, famous for tea plantations, waterfalls, and cool climate.",
    duration: "3 Days / 2 Nights",
    price: 250,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    locations: ["Kandy", "Nuwara Eliya", "Ella"],
    category: "Cultural",
    highlights: ["Tea Plantations", "Nuwara Eliya", "Ella Falls", "Scenic Train Ride"],
    itinerary: [
      { day: 1, title: "Kandy to Nuwara Eliya", description: "Scenic drive to Nuwara Eliya. Visit tea factories." },
      { day: 2, title: "Nuwara Eliya to Ella", description: "Train ride to Ella. Explore Ella gap and waterfalls." },
      { day: 3, title: "Departure", description: "Return to Colombo or continue journey." },
    ],
    hotels: ["Boutique hotels in hill country"],
    meals: "Breakfast included",
    transport: "Air-conditioned vehicle",
    cancellation: "Free cancellation up to 5 days before departure",
  },
  {
    id: 6,
    name: "Luxury Escape",
    shortDescription: "Ultimate luxury experience in Sri Lanka",
    fullDescription: "Indulge in the finest accommodations and exclusive experiences Sri Lanka has to offer. From private beach resorts to world-class dining.",
    duration: "8 Days / 7 Nights",
    price: 1200,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
    locations: ["Colombo", "Sigiriya", "Kandy", " Bentota"],
    category: "Luxury",
    highlights: ["5-star Resorts", "Private Tours", "Fine Dining", "Spa Treatments"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Luxury airport transfer. Check into 5-star hotel." },
      { day: 2, title: "Private Sigiriya Tour", description: "Private guided tour of Sigiriya with exclusive access." },
      { day: 3, title: "Cultural Exploration", description: "Private tour of ancient cities with expert guide." },
      { day: 4, title: "To Kandy", description: "Scenic flight to Kandy. Private city tour." },
      { day: 5, title: "Hill Country", description: "Private helicopter to tea plantations." },
      { day: 6, title: "Beach Retreat", description: "Private transfer to luxury beach resort." },
      { day: 7, title: "Relaxation Day", description: "Full day at spa and beach." },
      { day: 8, title: "Departure", description: "Private transfer to airport." },
    ],
    hotels: ["5-star luxury resorts"],
    meals: "All meals and premium drinks",
    transport: "Private chauffeur and luxury vehicle",
    cancellation: "Free cancellation up to 14 days before departure",
  },
];

const categories = ["All", "Cultural", "Beach", "Adventure", "Luxury"];
const durations = ["All", "1-3 Days", "4-6 Days", "7+ Days"];
const budgets = ["All", "Under $300", "$300-$500", "$500-$800", "Over $800"];

export default function TourPackagesPage() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filters, setFilters] = useState({
    category: "All",
    duration: "All",
    budget: "All",
  });

  const filteredPackages = tourPackages.filter((pkg) => {
    if (filters.category !== "All" && pkg.category !== filters.category) return false;
    
    if (filters.duration !== "All") {
      const days = parseInt(pkg.duration.split(" ")[0]);
      if (filters.duration === "1-3 Days" && days > 3) return false;
      if (filters.duration === "4-6 Days" && (days < 4 || days > 6)) return false;
      if (filters.duration === "7+ Days" && days < 7) return false;
    }
    
    if (filters.budget !== "All") {
      if (filters.budget === "Under $300" && pkg.price >= 300) return false;
      if (filters.budget === "$300-$500" && (pkg.price < 300 || pkg.price > 500)) return false;
      if (filters.budget === "$500-$800" && (pkg.price < 500 || pkg.price > 800)) return false;
      if (filters.budget === "Over $800" && pkg.price <= 800) return false;
    }
    
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Tour Packages
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover Sri Lanka with the Perfect Travel Plan
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sri-lanka-teal focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Duration Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sri-lanka-teal focus:border-transparent"
              >
                {durations.map((dur) => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>
            </div>
            
            {/* Budget Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select
                value={filters.budget}
                onChange={(e) => handleFilterChange("budget", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sri-lanka-teal focus:border-transparent"
              >
                {budgets.map((bud) => (
                  <option key={bud} value={bud}>{bud}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Showing {filteredPackages.length} tour packages
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Package Image */}
                <div className="relative h-56">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-sri-lanka-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-sri-lanka-teal">
                    {pkg.duration}
                  </div>
                </div>
                
                {/* Package Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{pkg.shortDescription}</p>
                  
                  {/* Locations */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.locations.map((loc) => (
                      <span
                        key={loc}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price and Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-sri-lanka-teal">${pkg.price}</span>
                      <span className="text-gray-500 text-sm"> / person</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
                        className="border border-sri-lanka-teal text-sri-lanka-teal px-4 py-2 rounded-lg hover:bg-sri-lanka-teal hover:text-white transition-colors text-sm"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => navigate('/contact')}
                        className="bg-sri-lanka-teal text-white px-4 py-2 rounded-lg hover:bg-sri-lanka-teal-dark transition-colors text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {selectedPackage?.id === pkg.id && (
                  <div className="px-6 pb-6 border-t pt-4">
                    <p className="text-gray-600 text-sm mb-4">{pkg.fullDescription}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.highlights.map((h) => (
                        <span key={h} className="text-xs bg-sri-lanka-teal/10 text-sri-lanka-teal px-2 py-1 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">Itinerary:</h4>
                    <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                      {pkg.itinerary.map((item) => (
                        <div key={item.day} className="text-sm">
                          <span className="font-medium text-sri-lanka-teal">Day {item.day}:</span> {item.title}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Hotels:</span>
                        <p className="text-gray-600">{pkg.hotels}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Meals:</span>
                        <p className="text-gray-600">{pkg.meals}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Transport:</span>
                        <p className="text-gray-600">{pkg.transport}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Cancellation:</span>
                        <p className="text-gray-600">{pkg.cancellation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No packages found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more tour packages.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-sri-lanka-ocean to-sri-lanka-teal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can't Find the Perfect Package?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us for custom tour packages tailored to your preferences
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-sri-lanka-teal hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Contact Us for Custom Tours
          </button>
        </div>
      </section>
    </div>
  );
}
