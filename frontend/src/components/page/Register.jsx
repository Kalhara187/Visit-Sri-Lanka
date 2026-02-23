import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        userType: "",
        acceptTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    /* ───── password strength meter ───── */
    const calcStrength = (pw) => {
        let s = 0;
        if (pw.length >= 6) s++;
        if (pw.length >= 10) s++;
        if (/[A-Z]/.test(pw)) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^A-Za-z0-9]/.test(pw)) s++;
        return s; // 0-5
    };

    const strengthLabel = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-teal-500", "bg-emerald-500"];

    /* ───── handlers ───── */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: val }));

        if (name === "password") setPasswordStrength(calcStrength(value));

        // clear field error on input
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        const e = {};
        if (!formData.fullName.trim()) e.fullName = "Full name is required";
        if (!formData.email.trim()) e.email = "Email address is required";
        else if (!validateEmail(formData.email)) e.email = "Please enter a valid email address";
        if (!formData.password) e.password = "Password is required";
        else if (formData.password.length < 6) e.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword) e.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword)
            e.confirmPassword = "Passwords do not match";
        if (!formData.userType) e.userType = "Please select an account type";
        if (!formData.acceptTerms) e.acceptTerms = "You must accept the Terms & Conditions";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = validateForm();
        if (Object.keys(v).length > 0) { setErrors(v); return; }

        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    phone: formData.phone,
                    userType: formData.userType,
                    acceptTerms: formData.acceptTerms
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Account created successfully! Welcome to Visit Sri Lanka 🎉");
                navigate("/signin");
            } else {
                // Handle validation errors from backend
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ general: data.message || 'Registration failed' });
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ general: 'Unable to connect to server. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid =
        formData.fullName &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.userType &&
        formData.acceptTerms;

    /* ═══════════════════════ JSX ═══════════════════════ */
    return (
        <div className="min-h-screen flex">
            {/* ─────── inline keyframes ─────── */}
            <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .anim-fade-up{animation:fadeUp .6s ease-out both}
        .anim-d1{animation-delay:.1s}
        .anim-d2{animation-delay:.2s}
        .anim-d3{animation-delay:.25s}
      `}</style>

            {/* ══════════ LEFT: Video / branding panel ══════════ */}
            <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden">
                {/* background video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline
                    poster="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop"
                >
                    <source src="/videos/srilanka.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-black/50 to-emerald-900/60" />

                {/* floating content */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* top: logo */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <span className="text-white font-bold text-lg">SL</span>
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">Visit Sri Lanka</span>
                    </div>

                    {/* center: tagline */}
                    <div className="space-y-5 max-w-md">
                        <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                            Start Your <br />
                            <span className="text-teal-300">Sri Lanka</span> Adventure
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Create your free account to unlock personalised travel experiences,
                            save destinations, and book hotels across the island paradise.
                        </p>

                        {/* feature pills */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {["Personalised Trips", "Easy Booking", "Exclusive Deals"].map((t) => (
                                <span key={t} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm border border-white/20">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* bottom: testimonial */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 max-w-md">
                        <p className="text-white/90 text-sm leading-relaxed italic mb-3">
                            "Visit Sri Lanka made planning our entire holiday effortless.
                            The hotel recommendations were spot-on and the tour packages saved us so much time!"
                        </p>
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-teal-400/30 flex items-center justify-center text-white font-semibold text-sm">
                                AK
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">Asha Kumari</p>
                                <p className="text-white/60 text-xs">Traveler · 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════ RIGHT: form panel ══════════ */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 flex items-center justify-center px-4 sm:px-8 py-10">
                <div className="w-full max-w-lg anim-fade-up">

                    {/* mobile-only logo */}
                    <div className="lg:hidden text-center mb-6">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">SL</span>
                        </div>
                        <p className="text-teal-600 font-semibold text-sm tracking-wider uppercase">Visit Sri Lanka</p>
                    </div>

                    {/* card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* card header */}
                        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-7">
                            <h1 className="text-white text-center text-2xl sm:text-3xl font-bold mb-1">Create Your Account</h1>
                            <p className="text-white/80 text-center text-sm">
                                Join Visit Sri Lanka and start your journey today.
                            </p>
                        </div>

                        {/* form body */}
                        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-5" id="register-form">

                            {/* general error */}
                            {errors.general && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 anim-fade-up">
                                    <p className="text-red-600 text-sm text-center">{errors.general}</p>
                                </div>
                            )}

                            {/* ── Full Name ── */}
                            <div className="anim-fade-up anim-d1">
                                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1.5 text-sm">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text" id="fullName" name="fullName"
                                        value={formData.fullName} onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm ${errors.fullName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"} outline-none transition`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>

                            {/* ── Email ── */}
                            <div className="anim-fade-up anim-d1">
                                <label htmlFor="reg-email" className="block text-gray-700 font-medium mb-1.5 text-sm">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email" id="reg-email" name="email"
                                        value={formData.email} onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"} outline-none transition`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* ── Password ── */}
                            <div className="anim-fade-up anim-d2">
                                <label htmlFor="reg-password" className="block text-gray-700 font-medium mb-1.5 text-sm">
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="reg-password" name="password"
                                        value={formData.password} onChange={handleChange}
                                        className={`w-full pl-11 pr-12 py-3 rounded-xl border text-sm ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"} outline-none transition`}
                                        placeholder="Min 6 characters"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition">
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                                {/* strength meter */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColor[passwordStrength] : "bg-gray-200"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs mt-1 ${passwordStrength <= 2 ? "text-red-500" : "text-teal-600"}`}>
                                            {strengthLabel[passwordStrength]}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* ── Confirm Password ── */}
                            <div className="anim-fade-up anim-d2">
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1.5 text-sm">
                                    Confirm Password <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword" name="confirmPassword"
                                        value={formData.confirmPassword} onChange={handleChange}
                                        className={`w-full pl-11 pr-12 py-3 rounded-xl border text-sm ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"} outline-none transition`}
                                        placeholder="Re-enter your password"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition">
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                {/* match indicator */}
                                {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                                    <p className="text-emerald-500 text-xs mt-1 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Passwords match
                                    </p>
                                )}
                            </div>

                            {/* ── Phone (optional) ── */}
                            <div className="anim-fade-up anim-d3">
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1.5 text-sm">
                                    Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="tel" id="phone" name="phone"
                                        value={formData.phone} onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-sm"
                                        placeholder="+94 77 123 4567"
                                    />
                                </div>
                            </div>

                            {/* ── User Type Selection ── */}
                            <div className="anim-fade-up anim-d3">
                                <label className="block text-gray-700 font-medium mb-3 text-sm">
                                    Select Account Type <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Traveler Option */}
                                    <label
                                        className={`relative cursor-pointer group ${formData.userType === "traveler" ? "ring-2 ring-teal-500 ring-offset-2 rounded-xl" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="traveler"
                                            checked={formData.userType === "traveler"}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${formData.userType === "traveler" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"}`}>
                                            <div className="flex flex-col items-center text-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${formData.userType === "traveler" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                </div>
                                                <span className={`font-semibold text-sm ${formData.userType === "traveler" ? "text-teal-700" : "text-gray-700"}`}>Traveler</span>
                                                <span className="text-xs text-gray-500 mt-1">Book hotels & tours</span>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Hotel Owner Option */}
                                    <label
                                        className={`relative cursor-pointer group ${formData.userType === "hotelOwner" ? "ring-2 ring-teal-500 ring-offset-2 rounded-xl" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="hotelOwner"
                                            checked={formData.userType === "hotelOwner"}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${formData.userType === "hotelOwner" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"}`}>
                                            <div className="flex flex-col items-center text-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${formData.userType === "hotelOwner" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125-1.125 1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                                    </svg>
                                                </div>
                                                <span className={`font-semibold text-sm ${formData.userType === "hotelOwner" ? "text-teal-700" : "text-gray-700"}`}>Hotel Owner</span>
                                                <span className="text-xs text-gray-500 mt-1">Manage hotels & rooms</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                {errors.userType && <p className="text-red-500 text-xs mt-2">{errors.userType}</p>}
                            </div>

                            {/* ── Terms checkbox ── */}
                            <div className="anim-fade-up anim-d3">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox" name="acceptTerms"
                                        checked={formData.acceptTerms} onChange={handleChange}
                                        className="mt-0.5 w-4.5 h-4.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 transition"
                                    />
                                    <span className="text-sm text-gray-600 leading-snug group-hover:text-gray-800 transition">
                                        I agree to the{" "}
                                        <a href="/terms" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                                            Terms & Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a href="/terms" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </label>
                                {errors.acceptTerms && <p className="text-red-500 text-xs mt-1 ml-7">{errors.acceptTerms}</p>}
                            </div>

                            {/* ── Submit ── */}
                            <button
                                type="submit" id="register-submit-btn"
                                disabled={isLoading || !isFormValid}
                                className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2
                  ${isLoading || !isFormValid
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-teal-600 to-teal-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating Account…
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            {/* divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-white text-gray-400">or</span>
                                </div>
                            </div>

                            {/* login redirect */}
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/signin"
                                    onClick={(e) => { e.preventDefault(); navigate("/signin"); }}
                                    className="text-teal-600 hover:text-teal-700 font-semibold transition"
                                >
                                    Sign In
                                </a>
                            </p>
                        </form>
                    </div>

                    {/* back to home */}
                    <div className="text-center mt-5">
                        <a
                            href="/"
                            onClick={(e) => { e.preventDefault(); navigate("/"); }}
                            className="text-gray-400 hover:text-teal-600 transition text-sm inline-flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
