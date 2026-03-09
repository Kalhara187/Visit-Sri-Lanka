import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STEPS = ["Details", "Payment", "Confirmation"];

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || null;
  const type = location.state?.type || "tour"; // 'tour' | 'hotel'

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [form, setForm] = useState({
    checkIn: today,
    checkOut: tomorrow,
    guests: 1,
    specialRequests: "",
  });

  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  // Redirect if not logged in
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No item selected</h2>
          <p className="text-gray-500 mb-6">Please select a tour or hotel to book.</p>
          <button
            onClick={() => navigate("/packages")}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Browse Tour Packages
          </button>
        </div>
      </div>
    );
  }

  // Calculate total price
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)
    )
  );
  const basePrice = item.price || 0;
  const totalPrice =
    type === "hotel"
      ? basePrice * nights * form.guests
      : basePrice * form.guests;

  const validateDetails = () => {
    const errs = {};
    if (!form.checkIn) errs.checkIn = "Check-in date is required";
    if (!form.checkOut) errs.checkOut = "Check-out date is required";
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn)
      errs.checkOut = "Check-out must be after check-in";
    if (form.guests < 1) errs.guests = "At least 1 guest required";
    return errs;
  };

  const validatePayment = () => {
    const errs = {};
    if (payment.method === "card") {
      if (!payment.cardHolder.trim()) errs.cardHolder = "Cardholder name required";
      if (!/^\d{16}$/.test(payment.cardNumber.replace(/\s/g, "")))
        errs.cardNumber = "Enter a valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry))
        errs.expiry = "Enter expiry as MM/YY";
      if (!/^\d{3,4}$/.test(payment.cvv)) errs.cvv = "Enter a valid CVV";
    }
    return errs;
  };

  const handleDetailsNext = () => {
    const errs = validateDetails();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    const errs = validatePayment();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingType: type,
          itemId: item.id,
          itemName: item.name,
          guests: form.guests,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          totalPrice,
          paymentMethod: payment.method,
          specialRequests: form.specialRequests,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBooking(data.booking);
        setStep(3);
      } else {
        setErrors({ general: data.message || "Booking failed. Please try again." });
      }
    } catch {
      setErrors({ general: "Unable to connect to server. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Book {type === "hotel" ? "Hotel" : "Tour Package"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{item.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-0">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    step > i + 1
                      ? "bg-teal-600 border-teal-600 text-white"
                      : step === i + 1
                      ? "bg-white border-teal-600 text-teal-600 dark:bg-gray-800"
                      : "bg-white border-gray-300 text-gray-400 dark:bg-gray-800"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    step === i + 1 ? "text-teal-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-20 mb-5 mx-1 transition-colors ${
                    step > i + 1 ? "bg-teal-600" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          {/* Item Summary */}
          <div className="flex gap-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {type === "hotel" ? `$${item.price}/night` : `$${item.price}/person`}
              </p>
              {type === "tour" && item.duration && (
                <p className="text-sm text-teal-600 mt-1">{item.duration}</p>
              )}
            </div>
          </div>

          {/* ── STEP 1: Details ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Booking Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {type === "hotel" ? "Check-in Date" : "Tour Start Date"}
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={form.checkIn}
                    onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                    className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.checkIn ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {type === "hotel" ? "Check-out Date" : "Tour End Date"}
                  </label>
                  <input
                    type="date"
                    min={form.checkIn || today}
                    value={form.checkOut}
                    onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                    className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.checkOut ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                  className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.guests ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                />
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary requirements, accessibility needs, etc."
                  value={form.specialRequests}
                  onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Price Summary</h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>
                      ${basePrice} {type === "hotel" ? `× ${nights} night${nights > 1 ? "s" : ""}` : ""} × {form.guests} guest{form.guests > 1 ? "s" : ""}
                    </span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-gray-800 dark:text-white mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span>Total</span>
                  <span className="text-teal-600 text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleDetailsNext}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Payment</h2>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {errors.general}
                </div>
              )}

              {/* Payment method selector */}
              <div className="flex gap-3 mb-4">
                {[
                  { id: "card", label: "💳 Credit / Debit Card" },
                  { id: "paypal", label: "🅿️ PayPal" },
                  { id: "bank", label: "🏦 Bank Transfer" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment({ ...payment, method: m.id })}
                    className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition ${
                      payment.method === m.id
                        ? "border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                        : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-300"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {payment.method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={payment.cardHolder}
                      onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.cardHolder ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                      className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="08/27"
                        maxLength={5}
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                        className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.expiry ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })}
                        className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.cvv ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {payment.method === "paypal" && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-5xl mb-3">🅿️</div>
                  <p>You will be redirected to PayPal to complete payment.</p>
                  <p className="text-sm mt-1 text-gray-400">(Demo mode — no redirect will occur)</p>
                </div>
              )}

              {payment.method === "bank" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-semibold mb-2">Bank Transfer Details</p>
                  <p>Bank: Bank of Ceylon</p>
                  <p>Account: 1234-5678-9012</p>
                  <p>Reference: VSL-BOOKING</p>
                  <p className="mt-2 text-xs text-gray-500">Send payment confirmation to reservations@visitsrilanka.lk</p>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between font-bold text-gray-800 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-600">
                <span>Total to pay</span>
                <span className="text-teal-600 text-xl">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setStep(1); setErrors({}); }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-60"
                >
                  {isLoading ? "Processing..." : `Confirm & Pay $${totalPrice.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 3 && booking && (
            <div className="text-center space-y-5">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Booking Confirmed!</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Your booking reference is <span className="font-bold text-teal-600">#{booking.id}</span>
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-sm text-left space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item</span>
                  <span className="font-medium">{booking.item_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-medium">{booking.check_in}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-medium">{booking.check_out}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="font-semibold">Total Paid</span>
                  <span className="font-bold text-teal-600">${booking.total_price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
