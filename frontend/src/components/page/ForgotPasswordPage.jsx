import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEP_REQUEST = "request";
const STEP_VERIFY = "verify";
const STEP_DONE = "done";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEP_REQUEST);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // STEP 1 — Request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        // In a real app the code is emailed; here we show it from the response for demo
        setInfo(
          data.resetCode
            ? `Your reset code is: ${data.resetCode}`
            : "A reset code has been sent to your email."
        );
        setStep(STEP_VERIFY);
      } else {
        setError(data.message || "Request failed. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2 — Verify code + set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!code.trim()) { setError("Please enter the reset code."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(STEP_DONE);
      } else {
        setError(data.message || "Reset failed. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">SL</span>
          </div>
          <h1 className="text-sm font-semibold text-teal-600 dark:text-teal-400 tracking-wider uppercase mb-1">
            Visit Sri Lanka
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Password Recovery</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-7">
            <h2 className="text-white text-center text-2xl font-bold mb-1">
              {step === STEP_REQUEST && "Forgot Password?"}
              {step === STEP_VERIFY && "Enter Reset Code"}
              {step === STEP_DONE && "Password Reset!"}
            </h2>
            <p className="text-white/80 text-center text-sm">
              {step === STEP_REQUEST && "Enter your email to receive a reset code."}
              {step === STEP_VERIFY && "Enter the code and your new password."}
              {step === STEP_DONE && "Your password has been changed successfully."}
            </p>
          </div>

          <div className="px-8 py-8">
            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* ── STEP 1: Request code ── */}
            {step === STEP_REQUEST && (
              <form onSubmit={handleRequestCode} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Remember your password?{" "}
                  <button type="button" onClick={() => navigate("/signin")} className="text-teal-600 font-semibold hover:underline">
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* ── STEP 2: Verify code + new password ── */}
            {step === STEP_VERIFY && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                {info && (
                  <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-3 text-sm text-teal-700 dark:text-teal-400">
                    {info}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reset Code
                  </label>
                  <input
                    type="text"
                    placeholder="6-digit code"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 tracking-widest text-center text-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-12 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep(STEP_REQUEST); setError(""); setInfo(""); }}
                  className="w-full text-sm text-gray-500 hover:text-teal-600 transition"
                >
                  ← Back
                </button>
              </form>
            )}

            {/* ── STEP 3: Done ── */}
            {step === STEP_DONE && (
              <div className="text-center space-y-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Your password has been reset. You can now sign in with your new password.
                </p>
                <button
                  onClick={() => navigate("/signin")}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
                >
                  Go to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
