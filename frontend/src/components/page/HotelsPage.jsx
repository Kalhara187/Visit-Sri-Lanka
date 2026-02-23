import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hotels Data
const hotels = [
  {
    id: 1,
    name: "Grand Hotel Colombo",
    location: "Colombo",
    description: "Luxury accommodation in the heart of Colombo with stunning city views, rooftop pool, and world-class dining.",
    shortDescription: "Luxury city hotel in Colombo",
    price: 150,
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Parking"],
    roomTypes: [
      { name: "Deluxe Room", price: 150, capacity: 2 },
      { name: "Executive Suite", price: 250, capacity: 2 },
      { name: "Family Room", price: 300, capacity: 4 },
    ],
    category: "Luxury",
  },
  {
    id: 2,
    name: "Sigiriya Rock View Resort",
    location: "Sigiriya",
    description: "Boutique resort with breathtaking views of the Sigiriya Rock Fortress. Experience ancient Sri Lanka with modern comfort.",
    shortDescription: "Rock fortress views",
    price: 120,
    rating: 4.6,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Garden", "Tour Desk"],
    roomTypes: [
      { name: "Standard Room", price: 120, capacity: 2 },
      { name: "Rock View Room", price: 180, capacity: 2 },
      { name: "Villa", price: 350, capacity: 4 },
