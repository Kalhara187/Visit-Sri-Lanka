import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const EMPTY_HOTEL_FORM = {
  name: "",
  description: "",
  location: "",
  facilities: "",
  contactDetails: "",
  pricePerNight: "",
  totalRooms: "",
  roomTypes: "",
  imageUrl: "",
};



export default function HotelOwnerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("hotels");
  const [isLoading, setIsLoading] = useState(true);
  const [profileMsg, setProfileMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });
  const [hotelForm, setHotelForm] = useState(EMPTY_HOTEL_FORM);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hotelMsg, setHotelMsg] = useState("");
  const [hotelErrors, setHotelErrors] = useState({});
  const [savingHotel, setSavingHotel] = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    if (!token) { navigate("/signin"); return; }
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.role !== "hotelOwner") { navigate("/dashboard"); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [pRes, hRes, bRes] = await Promise.all([
        fetch(`${API}/auth/me`, { headers: authHeaders }),
        fetch(`${API}/hotels/my`, { headers: authHeaders }),
        fetch(`${API}/hotels/my-bookings`, { headers: authHeaders }),
      ]);
      const [pData, hData, bData] = await Promise.all([pRes.json(), hRes.json(), bRes.json()]);
      if (pData.success) {
        setUser(pData.user);
        setProfileForm({ fullName: pData.user.fullName, phone: pData.user.phone || "" });
      } else {
        navigate("/signin"); return;
      }
      if (hData.success) setHotels(hData.hotels);
      if (bData.success) setBookings(bData.bookings);
    } catch {
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  const flash = (setter, msg, delay = 4000) => {
    setter(msg);
    setTimeout(() => setter(""), delay);
  };

  // â”€â”€ Profile update â”€â”€
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/profile`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEditMode(false);
        flash(setProfileMsg, "Profile updated!");
      } else {
        flash(setProfileMsg, data.message || "Update failed.");
      }
    } catch {
      flash(setProfileMsg, "Connection error.");
    }
  };

  // â”€â”€ Hotel form helpers â”€â”€
  const startAddHotel = () => {
    setEditingHotelId(null);
    setHotelForm(EMPTY_HOTEL_FORM);
    setHotelErrors({});
    setShowAddForm(true);
  };

  const startEditHotel = (hotel) => {
    setEditingHotelId(hotel.id);
    setHotelForm({
      name: hotel.name || "",
      description: hotel.description || "",
      location: hotel.location || "",
      facilities: hotel.facilities || "",
      contactDetails: hotel.contact_details || "",
      pricePerNight: hotel.price_per_night ?? "",
      totalRooms: hotel.total_rooms ?? "",
      roomTypes: hotel.room_types || "",
      imageUrl: hotel.image_url || "",
    });
    setHotelErrors({});
    setShowAddForm(true);
  };

  const validateHotelForm = () => {
    const e = {};
    if (!hotelForm.name.trim()) e.name = "Hotel name is required";
    if (!hotelForm.location.trim()) e.location = "Location is required";
    if (hotelForm.pricePerNight !== "" && isNaN(Number(hotelForm.pricePerNight)))
      e.pricePerNight = "Price must be a number";
    if (hotelForm.totalRooms !== "" && isNaN(Number(hotelForm.totalRooms)))
      e.totalRooms = "Rooms must be a number";
    return e;
  };

  const handleSaveHotel = async (e) => {
    e.preventDefault();
    const errs = validateHotelForm();
    if (Object.keys(errs).length > 0) { setHotelErrors(errs); return; }
    setSavingHotel(true);
    try {
      const url = editingHotelId ? `${API}/hotels/${editingHotelId}` : `${API}/hotels`;
      const method = editingHotelId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(hotelForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        flash(setHotelMsg, editingHotelId ? "Hotel updated!" : "Hotel submitted for review.");
        const hRes = await fetch(`${API}/hotels/my`, { headers: authHeaders });
        const hData = await hRes.json();
        if (hData.success) setHotels(hData.hotels);
      } else {
        flash(setHotelMsg, data.message || "Failed to save hotel.");
      }
    } catch {
      flash(setHotelMsg, "Connection error.");
    } finally {
      setSavingHotel(false);
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!window.confirm("Delete this hotel listing?")) return;
    try {
      const res = await fetch(`${API}/hotels/${id}`, { method: "DELETE", headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setHotels((p) => p.filter((h) => h.id !== id));
        flash(setHotelMsg, "Hotel deleted.");
      }
    } catch {
      flash(setHotelMsg, "Connection error.");
    }
  };

  // â”€â”€ Booking status management â”€â”€
  const handleBookingStatus = async (bookingId, status) => {
    try {
      const res = await fetch(`${API}/hotels/${bookingId}/booking-status`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((p) => p.map((b) => b.id === bookingId ? { ...b, status } : b));
      }
    } catch {
      // pass
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

  const statusPill = (status) => {
    const map = {
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
    };
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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Property Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome, {user?.fullName}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="self-start md:self-auto flex items-center gap-2 border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "My Hotels", value: hotels.length, icon: "ðŸ¨" },
            { label: "Total Bookings", value: bookings.length, icon: "ðŸ“‹" },
            { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: "âœ…" },
            { label: "Total Revenue", value: `$${revenue.toFixed(0)}`, icon: "ðŸ’°" },
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
          {["hotels", "bookings", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab === "hotels" ? "My Hotels" : tab === "bookings" ? "Bookings" : "Profile"}
            </button>
          ))}
        </div>

        {/* â”€â”€ Hotels Tab â”€â”€ */}
        {activeTab === "hotels" && (
          <div>
            {hotelMsg && (
              <div className={`mb-4 p-3 rounded-lg text-sm border ${hotelMsg.includes("error") || hotelMsg.includes("failed") || hotelMsg.includes("Failed")
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-teal-50 text-teal-700 border-teal-200"
                }`}>
                {hotelMsg}
              </div>
            )}

            {/* Add hotel button */}
            {!showAddForm && (
              <div className="mb-6">
                <button
                  onClick={startAddHotel}
                  className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  <span className="text-lg">+</span> Add New Hotel
                </button>
              </div>
            )}

            {/* Add / Edit form */}
            {showAddForm && (
              <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  {editingHotelId ? "Edit Hotel" : "Add New Hotel"}
                </h2>
                <form onSubmit={handleSaveHotel} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Hotel Name *", type: "text" },
                    { key: "location", label: "Location *", type: "text" },
                    { key: "pricePerNight", label: "Price per Night ($)", type: "number" },
                    { key: "totalRooms", label: "Total Rooms", type: "number" },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                      <input
                        type={type}
                        value={hotelForm[key]}
                        onChange={(e) => { setHotelForm((p) => ({ ...p, [key]: e.target.value })); setHotelErrors((p) => ({ ...p, [key]: "" })); }}
                        className={`w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${hotelErrors[key] ? "border-red-400" : "border-gray-300 dark:border-gray-600"}`}
                      />
                      {hotelErrors[key] && <p className="text-xs text-red-500 mt-1">{hotelErrors[key]}</p>}
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={hotelForm.description}
                      onChange={(e) => setHotelForm((p) => ({ ...p, description: e.target.value }))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  {[
                    { key: "roomTypes", label: "Room Types (e.g. Standard, Deluxe, Suite)" },
                    { key: "facilities", label: "Facilities (comma-separated)" },
                    { key: "contactDetails", label: "Contact Details" },
                    { key: "imageUrl", label: "Hotel Image URL" },
                  ].map(({ key, label }) => (
                    <div key={key} className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                      <input
                        type="text"
                        value={hotelForm[key]}
                        onChange={(e) => setHotelForm((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={savingHotel}
                      className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-60"
                    >
                      {savingHotel ? "Savingâ€¦" : editingHotelId ? "Update Hotel" : "Submit Hotel"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Hotel listings */}
            {hotels.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">ðŸ¨</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">No hotels listed yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Add your first hotel to start receiving bookings.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hotels.map((h) => (
                  <div key={h.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-gray-800 dark:text-white text-lg">{h.name}</h4>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusPill(h.status)}`}>
                            {h.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <span>ðŸ“ {h.location}</span>
                          <span>ðŸ’µ ${Number(h.price_per_night).toFixed(0)}/night</span>
                          <span>ðŸ› {h.total_rooms} rooms</span>
                          {h.contact_details && <span>ðŸ“ž {h.contact_details}</span>}
                        </div>
                        {h.facilities && (
                          <p className="text-xs text-gray-400 mt-1">Facilities: {h.facilities}</p>
                        )}
                        {h.room_types && (
                          <p className="text-xs text-gray-400 mt-1">Rooms: {h.room_types}</p>
                        )}
                        {h.status === "pending" && (
                          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                            â³ Under review by admin
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEditHotel(h)}
                          className="text-sm border border-teal-300 text-teal-600 px-3 py-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHotel(h.id)}
                          className="text-sm border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* â”€â”€ Bookings Tab â”€â”€ */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">ðŸ“­</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">No bookings yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Bookings for your hotels will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{b.item_name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Guest: {b.guestName || "N/A"} ({b.guestEmail})
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ref #{b.id} &bull; {b.check_in} â†’ {b.check_out} &bull; {b.guests} guest{b.guests > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusPill(b.status)}`}>
                          {b.status}
                        </span>
                        <span className="font-bold text-teal-600">${Number(b.total_price).toFixed(2)}</span>
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => handleBookingStatus(b.id, "rejected")}
                            className="text-xs border border-orange-300 text-orange-500 px-2 py-1 rounded hover:bg-orange-50 transition"
                          >
                            Reject
                          </button>
                        )}
                        {(b.status === "pending" || b.status === "rejected") && (
                          <button
                            onClick={() => handleBookingStatus(b.id, "confirmed")}
                            className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </div>
                    {b.special_requests && (
                      <p className="text-xs text-gray-400 mt-2">Note: {b.special_requests}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* â”€â”€ Profile Tab â”€â”€ */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Settings</h2>
            {profileMsg && (
              <div className={`mb-4 p-3 rounded-lg text-sm border ${profileMsg.includes("updated") || profileMsg === "Profile updated!"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
                }`}>
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
                  <button type="submit" className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">Save</button>
                  <button type="button" onClick={() => setEditMode(false)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
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
                    ["Member Since", user?.created_at ? new Date(user.created_at).toLocaleDateString() : "â€”"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-gray-800 dark:text-white">{val}</span>
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
