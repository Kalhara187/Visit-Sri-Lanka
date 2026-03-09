import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_HOTEL = {
  name: "My Hotel Property",
  location: "Colombo",
  rating: 4.5,
  totalRooms: 24,
  pricePerNight: 120,
  amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Parking"],
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
};

export default function HotelOwnerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [profileMsg, setProfileMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { navigate("/signin"); return; }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.role !== "hotelOwner") {
      navigate("/dashboard");
      return;
    }

    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setProfileForm({ fullName: data.user.fullName, phone: data.user.phone || "" });
      } else {
        navigate("/signin");
      }
    } catch {
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.bookings.filter((b) => b.booking_type === "hotel"));
    } catch {
      // pass
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEditMode(false);
        setProfileMsg("Profile updated!");
        setTimeout(() => setProfileMsg(""), 3000);
      } else {
        setProfileMsg(data.message || "Update failed.");
      }
    } catch {
      setProfileMsg("Connection error.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const revenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((s, b) => s + b.total_price, 0);

  const statusBadge = (status) => {
    const map = { confirmed: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700" };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-1 rounded-full uppercase tracking-wide">
              Hotel Owner
            </span>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
              Property Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome, {user?.fullName}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="self-start md:self-auto flex items-center gap-2 border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, icon: "📋" },
            { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: "✅" },
            { label: "Total Revenue", value: `$${revenue.toFixed(0)}`, icon: "💰" },
            { label: "Total Rooms", value: MOCK_HOTEL.totalRooms, icon: "🏨" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          {["overview", "bookings", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab === "overview" ? "My Property" : tab === "bookings" ? "Bookings" : "Profile"}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="relative h-48">
              <img src={MOCK_HOTEL.image} alt="Hotel" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-4 left-6 text-white text-2xl font-bold">{MOCK_HOTEL.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-800 dark:text-white">{MOCK_HOTEL.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Rating</p>
                  <p className="font-medium text-yellow-500">⭐ {MOCK_HOTEL.rating}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Price / Night</p>
                  <p className="font-medium text-gray-800 dark:text-white">${MOCK_HOTEL.pricePerNight}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Rooms</p>
                  <p className="font-medium text-gray-800 dark:text-white">{MOCK_HOTEL.totalRooms}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {MOCK_HOTEL.amenities.map((a) => (
                    <span key={a} className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 text-xs px-2 py-1 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  To update your property details, contact the Visit Sri Lanka admin team at{" "}
                  <a href="mailto:admin@visitsrilanka.lk" className="text-teal-600 hover:underline">
                    admin@visitsrilanka.lk
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Bookings Tab ── */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  No hotel bookings yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Bookings made for your property will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{b.item_name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ref #{b.id} &bull; {b.check_in} → {b.check_out} &bull; {b.guests} guest{b.guests > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusBadge(b.status)}`}>
                          {b.status}
                        </span>
                        <span className="font-bold text-teal-600">${b.total_price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Settings</h2>
            {profileMsg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${profileMsg.includes("updated") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {profileMsg}
              </div>
            )}
            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                    Save
                  </button>
                  <button type="button" onClick={() => setEditMode(false)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3 text-sm">
                  {[
                    ["Email", user?.email],
                    ["Full Name", user?.fullName],
                    ["Phone", user?.phone || "Not set"],
                    ["Role", "Hotel Owner"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-gray-800 dark:text-white capitalize">{val}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
