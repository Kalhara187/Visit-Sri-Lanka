import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "hotels", label: "Hotels", icon: "🏨" },
  { id: "bookings", label: "Bookings", icon: "📋" },
  { id: "feedback", label: "Feedback", icon: "💬" },
  { id: "contacts", label: "Messages", icon: "✉️" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [actionMsg, setActionMsg] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!token) { navigate("/signin"); return; }
    if (user.role !== "admin") { navigate("/dashboard"); return; }
    fetchAll();
  }, []);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [s, u, h, b, f, c] = await Promise.all([
        fetch(`${API}/admin/stats`, { headers }).then((r) => r.json()),
        fetch(`${API}/admin/users`, { headers }).then((r) => r.json()),
        fetch(`${API}/admin/hotels`, { headers }).then((r) => r.json()),
        fetch(`${API}/admin/bookings`, { headers }).then((r) => r.json()),
        fetch(`${API}/admin/feedback`, { headers }).then((r) => r.json()),
        fetch(`${API}/admin/contacts`, { headers }).then((r) => r.json()),
      ]);
      if (s.success) setStats(s.stats);
      if (u.success) setUsers(u.users);
      if (h.success) setHotels(h.hotels);
      if (b.success) setBookings(b.bookings);
      if (f.success) setFeedback(f.feedback);
      if (c.success) setContacts(c.contacts);
    } catch {
      // pass
    } finally {
      setIsLoading(false);
    }
  };

  const flash = (msg) => { setActionMsg(msg); setTimeout(() => setActionMsg(""), 3000); };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    const res = await fetch(`${API}/admin/users/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (data.success) { setUsers((p) => p.filter((u) => u.id !== id)); flash("User deleted."); }
  };

  const handleHotelStatus = async (id, action) => {
    const res = await fetch(`${API}/admin/hotels/${id}/${action}`, { method: "PUT", headers });
    const data = await res.json();
    if (data.success) {
      setHotels((p) =>
        p.map((h) => (h.id === id ? { ...h, status: action === "approve" ? "approved" : "rejected" } : h))
      );
      flash(`Hotel ${action}d.`);
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!window.confirm("Delete this hotel permanently?")) return;
    const res = await fetch(`${API}/admin/hotels/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (data.success) { setHotels((p) => p.filter((h) => h.id !== id)); flash("Hotel deleted."); }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    const res = await fetch(`${API}/admin/feedback/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (data.success) { setFeedback((p) => p.filter((f) => f.id !== id)); flash("Feedback deleted."); }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    const res = await fetch(`${API}/admin/contacts/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (data.success) { setContacts((p) => p.filter((c) => c.id !== id)); flash("Message deleted."); }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const statusPill = (status) => {
    const map = {
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
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
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full uppercase tracking-wide">
              Administrator
            </span>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage users, hotels, bookings, feedback and messages
            </p>
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

        {/* Flash message */}
        {actionMsg && (
          <div className="mb-4 p-3 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-sm">
            {actionMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 pb-3 px-2 font-semibold text-sm transition border-b-2 ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.id === "hotels" && stats?.pendingHotels > 0 && (
                <span className="ml-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 rounded-full">
                  {stats.pendingHotels}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Total Users", value: stats?.totalUsers ?? 0, icon: "👥", color: "teal" },
              { label: "Hotels", value: stats?.totalHotels ?? 0, icon: "🏨", color: "blue" },
              { label: "Pending Hotels", value: stats?.pendingHotels ?? 0, icon: "⏳", color: "yellow" },
              { label: "Bookings", value: stats?.totalBookings ?? 0, icon: "📋", color: "green" },
              { label: "Feedback", value: stats?.totalFeedback ?? 0, icon: "💬", color: "purple" },
              { label: "Messages", value: stats?.totalContacts ?? 0, icon: "✉️", color: "orange" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-1"
              >
                <div className="text-3xl">{s.icon}</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ─── USERS TAB ─── */}
        {activeTab === "users" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h2 className="font-bold text-gray-800 dark:text-white">Registered Users ({users.length})</h2>
            </div>
            {users.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No users registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="text-left px-5 py-3">Name</th>
                      <th className="text-left px-5 py-3">Email</th>
                      <th className="text-left px-5 py-3">Role</th>
                      <th className="text-left px-5 py-3">Phone</th>
                      <th className="text-left px-5 py-3">Joined</th>
                      <th className="text-left px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-5 py-3 font-medium text-gray-800 dark:text-white">{u.fullName}</td>
                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                            u.role === "hotelOwner" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"
                          }`}>
                            {u.role === "hotelOwner" ? "Hotel Owner" : "Traveler"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{u.phone || "—"}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── HOTELS TAB ─── */}
        {activeTab === "hotels" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-800 dark:text-white">Hotel Listings ({hotels.length})</h2>
            </div>
            {hotels.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No hotel listings yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="text-left px-5 py-3">Hotel</th>
                      <th className="text-left px-5 py-3">Owner</th>
                      <th className="text-left px-5 py-3">Location</th>
                      <th className="text-left px-5 py-3">Price/Night</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-left px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {hotels.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-5 py-3 font-medium text-gray-800 dark:text-white">{h.name}</td>
                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                          <div>{h.ownerName}</div>
                          <div className="text-xs text-gray-400">{h.ownerEmail}</div>
                        </td>
                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{h.location}</td>
                        <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-medium">
                          ${Number(h.price_per_night).toFixed(0)}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusPill(h.status)}`}>
                            {h.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2 flex-wrap">
                            {h.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleHotelStatus(h.id, "approve")}
                                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleHotelStatus(h.id, "reject")}
                                  className="text-xs bg-orange-400 text-white px-2 py-1 rounded hover:bg-orange-500 transition"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {h.status === "rejected" && (
                              <button
                                onClick={() => handleHotelStatus(h.id, "approve")}
                                className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                              >
                                Approve
                              </button>
                            )}
                            {h.status === "approved" && (
                              <button
                                onClick={() => handleHotelStatus(h.id, "reject")}
                                className="text-xs bg-orange-400 text-white px-2 py-1 rounded hover:bg-orange-500 transition"
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteHotel(h.id)}
                              className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── BOOKINGS TAB ─── */}
        {activeTab === "bookings" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-800 dark:text-white">All Bookings ({bookings.length})</h2>
            </div>
            {bookings.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No bookings yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="text-left px-5 py-3">Ref #</th>
                      <th className="text-left px-5 py-3">Guest</th>
                      <th className="text-left px-5 py-3">Item</th>
                      <th className="text-left px-5 py-3">Type</th>
                      <th className="text-left px-5 py-3">Dates</th>
                      <th className="text-left px-5 py-3">Total</th>
                      <th className="text-left px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-5 py-3 text-gray-400 text-xs">#{b.id}</td>
                        <td className="px-5 py-3">
                          <div className="font-medium text-gray-800 dark:text-white">{b.userName}</div>
                          <div className="text-xs text-gray-400">{b.userEmail}</div>
                        </td>
                        <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{b.item_name}</td>
                        <td className="px-5 py-3">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded capitalize">
                            {b.booking_type}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-500 text-xs">
                          {b.check_in} → {b.check_out}
                        </td>
                        <td className="px-5 py-3 font-bold text-teal-600">${Number(b.total_price).toFixed(2)}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusPill(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── FEEDBACK TAB ─── */}
        {activeTab === "feedback" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-800 dark:text-white">User Feedback ({feedback.length})</h2>
            </div>
            {feedback.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No feedback submitted yet.</div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {feedback.map((f) => (
                  <div key={f.id} className="p-5 flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 dark:text-white">{f.name}</span>
                        <span className="text-yellow-500 text-sm">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</span>
                        {f.category && (
                          <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded capitalize">
                            {f.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{f.email}</p>
                      {f.subject && <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.subject}</p>}
                      <p className="text-sm text-gray-600 dark:text-gray-400">{f.message}</p>
                      <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
                        {f.created_at ? new Date(f.created_at).toLocaleString() : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteFeedback(f.id)}
                      className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── CONTACTS TAB ─── */}
        {activeTab === "contacts" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-800 dark:text-white">Contact Messages ({contacts.length})</h2>
            </div>
            {contacts.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No contact messages yet.</div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {contacts.map((c) => (
                  <div key={c.id} className="p-5 flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 dark:text-white">{c.name}</span>
                        {c.phone && <span className="text-xs text-gray-400">{c.phone}</span>}
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{c.email}</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{c.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{c.message}</p>
                      <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
                        {c.created_at ? new Date(c.created_at).toLocaleString() : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(c.id)}
                      className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
