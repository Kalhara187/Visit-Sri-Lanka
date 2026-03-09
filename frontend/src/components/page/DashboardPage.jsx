import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { navigate("/signin"); return; }
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
      }
    } catch {
      navigate("/signin");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch {
      // pass
    } finally {
      setIsLoading(false);
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
        setProfileMsg("Profile updated successfully!");
        setTimeout(() => setProfileMsg(""), 3000);
      } else {
        setProfileMsg(data.message || "Update failed.");
      }
    } catch {
      setProfileMsg("Connection error.");
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
        );
      }
    } catch {
      // pass
    } finally {
      setCancellingId(null);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const statusBadge = (status) => {
    const map = {
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.fullName}!
            </p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, icon: "📋", color: "teal" },
            { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: "✅", color: "green" },
            { label: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length, icon: "❌", color: "red" },
            {
              label: "Total Spent",
              value: `$${bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + b.total_price, 0).toFixed(0)}`,
              icon: "💰",
              color: "yellow",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          {["bookings", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab === "bookings" ? "My Bookings" : "Profile Settings"}
            </button>
          ))}
        </div>

        {/* ── Bookings Tab ── */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Start planning your Sri Lanka adventure!
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate("/packages")}
                    className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
                  >
                    Browse Tour Packages
                  </button>
                  <button
                    onClick={() => navigate("/hotels")}
                    className="border border-teal-600 text-teal-600 px-5 py-2 rounded-lg hover:bg-teal-50 transition"
                  >
                    Browse Hotels
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-lg flex-shrink-0">
                          {b.booking_type === "hotel" ? "🏨" : "🗺️"}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white">{b.item_name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {b.booking_type === "hotel" ? "Hotel" : "Tour Package"} &bull; Ref #
                            {b.id}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {b.check_in} → {b.check_out} &bull; {b.guests} guest{b.guests > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusBadge(b.status)}`}>
                          {b.status}
                        </span>
                        <span className="font-bold text-teal-600">${b.total_price.toFixed(2)}</span>
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            disabled={cancellingId === b.id}
                            className="text-sm text-red-500 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-60"
                          >
                            {cancellingId === b.id ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </div>
                    {b.special_requests && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Note: {b.special_requests}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Profile Settings
            </h2>

            {profileMsg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${profileMsg.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {profileMsg}
              </div>
            )}

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-800 dark:text-white font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Account Type</span>
                <span className="capitalize text-teal-600 font-medium">{user?.role}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Member Since</span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                </span>
              </div>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditMode(false); setProfileForm({ fullName: user.fullName, phone: user.phone || "" }); }}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1 text-sm">
                  <p className="text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user?.fullName}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user?.phone || "Not set"}</p>
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
