import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hotels Data
const hotels = [
  {
    id: 1,
    name: "Grand Hotel Colombo",
    location: "Colombo",
    shortDescription: "Luxury accommodation in the heart of Colombo",
    fullDescription: "Experience world-class hospitality at Grand Hotel Colombo. Located in the heart of the city, our hotel offers stunning views, exceptional service, and luxurious amenities perfect for both business and leisure travelers.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    price: 150,
    rating: 4.5,
    reviews: 328,
    category: "Luxury",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Gym", "Restaurant", "Room Service", "Parking"],
    roomTypes: [
      { name: "Deluxe Room", price: 150, capacity: 2 },
      { name: "Executive Suite", price: 250, capacity: 2 },
      { name: "Family Room", price: 300, capacity: 4 },
    ],
    address: "123 Marine Drive, Colombo 03",
    phone: "+94 11 234 5678",
    email: "reservations@grandhotel.lk",
  },
  {
    id: 2,
    name: "Sigiriya Rock Resort",
    location: "Sigiriya",
    shortDescription: "Unique stay with views of the iconic rock fortress",
    fullDescription: "Wake up to breathtaking views of Sigiriya Rock Fortress at our unique resort. Experience ancient Sri Lankan hospitality combined with modern comforts in this UNESCO World Heritage region.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    price: 120,
    rating: 4.8,
    reviews: 256,
    category: "Resort",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Garden", "Bike Rental", "Tour Desk"],
    roomTypes: [
      { name: "Standard Room", price: 120, capacity: 2 },
      { name: "Rock View Room", price: 180, capacity: 2 },
      { name: "Villa", price: 350, capacity: 4 },
    ],
    address: "Near Sigiriya Rock, Sigiriya",
    phone: "+94 66 123 4567",
    email: "book@sigiriyarockresort.lk",
  },
  {
    id: 3,
    name: "Kandy Lake View Hotel",
    location: "Kandy",
    shortDescription: "Scenic views of Kandy Lake and mountains",
    fullDescription: "Perched on a hillside overlooking Kandy Lake, our hotel offers panoramic views of the city and surrounding mountains. Experience the rich culture of Sri Lanka's cultural capital.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    price: 95,
    rating: 4.3,
    reviews: 412,
    category: "Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Garden", "Concierge", "Parking"],
    roomTypes: [
      { name: "Standard Room", price: 95, capacity: 2 },
      { name: "Lake View Room", price: 140, capacity: 2 },
      { name: "Family Suite", price: 220, capacity: 4 },
    ],
    address: "28 Lake View Road, Kandy",
    phone: "+94 81 222 3456",
    email: "reservations@kandylakeview.lk",
  },
  {
    id: 4,
    name: "Bentota Beach Resort",
    location: "Bentota",
    shortDescription: "Beachfront paradise with water sports",
    fullDescription: "Escape to our beachfront paradise in Bentota. Enjoy golden sands, crystal-clear waters, and exciting water sports at Sri Lanka's premier beach destination.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    price: 130,
    rating: 4.6,
    reviews: 523,
    category: "Beach Resort",
    amenities: ["Free WiFi", "Beach Access", "Water Sports", "Pool", "Spa", "Restaurant", "Bar"],
    roomTypes: [
      { name: "Garden Room", price: 130, capacity: 2 },
      { name: "Beach Room", price: 180, capacity: 2 },
      { name: "Beach Villa", price: 400, capacity: 4 },
    ],
    address: "Galle Road, Bentota",
    phone: "+94 34 123 4567",
    email: "info@bentosaresort.lk",
  },
  {
    id: 5,
    name: "Ella Mountain Retreat",
    location: "Ella",
    shortDescription: "Serene mountain escape in tea country",
    fullDescription: "Nestled in the misty mountains of Ella, our retreat offers a peaceful escape surrounded by tea plantations and waterfalls. Perfect for nature lovers and adventure seekers.",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    price: 85,
    rating: 4.7,
    reviews: 189,
    category: "Boutique",
    amenities: ["Free WiFi", "Restaurant", "Garden", "Hiking Trails", "Bonfire", "Parking"],
    roomTypes: [
      { name: "Mountain Room", price: 85, capacity: 2 },
      { name: "Premium Room", price: 120, capacity: 2 },
      { name: "Cottage", price: 200, capacity: 3 },
    ],
    address: "1 Mountain View, Ella",
    phone: "+94 57 123 4567",
    email: "stay@ellamountain.lk",
  },
  {
    id: 6,
    name: "Galle Fort Inn",
    location: "Galle",
    shortDescription: "Historic boutique hotel in UNESCO fort",
    fullDescription: "Experience colonial elegance at Galle Fort Inn, a beautifully restored boutique hotel inside the UNESCO World Heritage Galle Fort. Walk through centuries of history while enjoying modern comforts.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    price: 175,
    rating: 4.9,
    reviews: 167,
    category: "Boutique",
    amenities: ["Free WiFi", "Restaurant", "Rooftop Terrace", "Library", "Concierge"],
    roomTypes: [
      { name: "Heritage Room", price: 175, capacity: 2 },
      { name: "Fort Suite", price: 280, capacity: 2 },
      { name: "Family Suite", price: 350, capacity: 4 },
    ],
    address: "42 Light House Street, Galle Fort",
    phone: "+94 91 234 5678",
    email: "book@gallefortinn.lk",
  },
  {
    id: 7,
    name: "Nuwara Eliya Grand Hotel",
    location: "Nuwara Eliya",
    shortDescription: "Colonial charm in Little England",
    fullDescription: "Step back in time at our grand colonial-era hotel in Nuwara Eliya, known as Little England. Enjoy the cool mountain climate, golf, and timeless elegance.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    price: 110,
    rating: 4.4,
    reviews: 298,
    category: "Heritage",
    amenities: ["Free WiFi", "Golf Course", "Restaurant", "Bar", "Garden", "Horse Riding"],
    roomTypes: [
      { name: "Standard Room", price: 110, capacity: 2 },
      { name: "Garden View", price: 150, capacity: 2 },
      { name: "Suite", price: 280, capacity: 3 },
    ],
    address: "15 Grand Hotel Road, Nuwara Eliya",
    phone: "+94 52 123 4567",
    email: "reservations@nuwaragrand.lk",
  },
  {
    id: 8,
    name: "Jaffna Heritage Hotel",
    location: "Jaffna",
    shortDescription: "Cultural hub in the northern capital",
    fullDescription: "Discover the unique culture of northern Sri Lanka at our heritage hotel in Jaffna. Experience warm hospitality, delicious cuisine, and rich history.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    price: 75,
    rating: 4.2,
    reviews: 156,
    category: "Hotel",
    amenities: ["Free WiFi", "Restaurant", "Conference Room", "Parking"],
    roomTypes: [
      { name: "Standard Room", price: 75, capacity: 2 },
      { name: "Deluxe Room", price: 100, capacity: 2 },
      { name: "Family Room", price: 150, capacity: 4 },
    ],
    address: "100 Independence Avenue, Jaffna",
    phone: "+94 21 222 3456",
    email: "info@jaffnaheritage.lk",
  },
];

const locations = ["All", "Colombo", "Sigiriya", "Kandy", "Bentota", "Ella", "Galle", "Nuwara Eliya", "Jaffna"];
const categories = ["All", "Luxury", "Resort", "Hotel", "Beach Resort", "Boutique", "Heritage"];
const priceRanges = ["All", "Under $100", "$100-$150", "$150-$200", "Over $200"];

export default function HotelsPage() {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filters, setFilters] = useState({
    location: "All",
    category: "All",
    price: "All",
  });

  const filteredHotels = hotels.filter((hotel) => {
    if (filters.location !== "All" && hotel.location !== filters.location) return false;
    if (filters.category !== "All" && hotel.category !== filters.category) return false;
    
    if (filters.price !== "All") {
      if (filters.price === "Under $100" && hotel.price >= 100) return false;
      if (filters.price === "$100-$150" && (hotel.price < 100 || hotel.price > 150)) return false;
      if (filters.price === "$150-$200" && (hotel.price < 150 || hotel.price > 200)) return false;
      if (filters.price === "Over $200" && hotel.price <= 200) return false;
    }
    
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-sri-lanka-teal to-sri-lanka-ocean py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover the best hotels and resorts across Sri Lanka
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Location Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sri-lanka-teal focus:border-transparent"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Hotel Type</label>
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
            
            {/* Price Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sri-lanka-teal focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Showing {filteredHotels.length} hotels
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Hotel Image */}
                <div className="relative h-56">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-sri-lanka-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                    {hotel.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-sri-lanka-teal flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {hotel.rating}
                  </div>
                </div>
                
                {/* Hotel Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-500 text-sm">{hotel.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{hotel.shortDescription}</p>
                  
                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-sri-lanka-teal font-medium">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  {/* Price and Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-sri-lanka-teal">${hotel.price}</span>
                      <span className="text-gray-500 text-sm"> / night</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedHotel(selectedHotel?.id === hotel.id ? null : hotel)}
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
                {selectedHotel?.id === hotel.id && (
                  <div className="px-6 pb-6 border-t pt-4">
                    <p className="text-gray-600 text-sm mb-4">{hotel.fullDescription}</p>
                    
                    {/* Address & Contact */}
                    <div className="mb-4 text-sm">
                      <p className="font-medium text-gray-700">📍 {hotel.address}</p>
                      <p className="text-gray-600">{hotel.phone}</p>
                    </div>
                    
                    {/* Room Types */}
                    <h4 className="font-semibold text-gray-800 mb-2">Available Rooms:</h4>
                    <div className="space-y-2 mb-4">
                      {hotel.roomTypes.map((room) => (
                        <div key={room.name} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                          <span className="text-sm text-gray-700">{room.name} (Up to {room.capacity} guests)</span>
                          <span className="font-semibold text-sri-lanka-teal">${room.price}/night</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* All Amenities */}
                    <h4 className="font-semibold text-gray-800 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs bg-sri-lanka-teal/10 text-sri-lanka-teal px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No hotels found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more accommodations.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-sri-lanka-ocean to-sri-lanka-teal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Finding the Right Hotel?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our travel experts are here to help you find the perfect accommodation
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-sri-lanka-teal hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Contact Us for Assistance
          </button>
        </div>
      </section>
    </div>
  );
}
