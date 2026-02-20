import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ───────────────────── data ───────────────────── */
const whyChooseUs = [
  {
    title: "Reliable Information",
    desc: "Accurate, up-to-date travel information curated by local experts who know Sri Lanka inside out.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Easy Booking",
    desc: "Browse and book hotels effortlessly with our intuitive platform designed for a seamless experience.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Curated Packages",
    desc: "Hand-picked tour packages that showcase the very best of Sri Lanka, from coast to highlands.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Modern Design",
    desc: "A user-friendly, beautifully designed interface that makes travel planning a delight.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Local Tourism Support",
    desc: "Every booking helps support local communities, sustainable tourism, and Sri Lanka's economy.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop",
    alt: "Sigiriya Rock Fortress",
    label: "Sigiriya",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop",
    alt: "Lush Green Mountains",
    label: "Highlands",
  },
  {
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop",
    alt: "Cultural Heritage of Kandy",
    label: "Kandy",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
    alt: "Beautiful Beach in Sri Lanka",
    label: "Beaches",
  },
];

const stats = [
  { value: "2,500+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "80+", label: "Partner Hotels" },
  { value: "50+", label: "Tour Packages" },
];

/* ───────────── reusable fade-in on scroll ────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════ */
export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* ─────── inline keyframes (keeps everything self-contained) ─────── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp .7s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-ring {
          0%   { transform: scale(.9); opacity: .7; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .pulse-ring::before {
          content: '';
          position: absolute; inset: -8px;
          border-radius: 9999px;
          border: 2px solid rgba(13,148,136,.5);
          animation: pulse-ring 2s ease-out infinite;
        }
        .gallery-item:hover img {
          transform: scale(1.08);
        }
      `}</style>

      {/* ══════════ 1. HERO SECTION with Background Video ══════════ */}
      <section
        id="about-hero"
        className="relative h-[70vh] min-h-[480px] flex items-center justify-center text-white overflow-hidden"
      >
        {/* ── background video ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop"
        >
          <source src="/videos/srilanka.mp4" type="video/mp4" />
        </video>

        {/* ── semi-transparent dark overlay for readability ── */}
        <div className="absolute inset-0 bg-black/50" />
        {/* ── gradient fade at bottom for smooth transition ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-900/60" />

        {/* content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sm tracking-wider uppercase border border-white/20">
            Discover Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-lg">
            About <span className="text-teal-300">Visit Sri Lanka</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Your trusted travel companion designed to help you explore the
            beauty and diversity of the Pearl of the Indian Ocean.
          </p>
        </div>

        {/* decorative bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full text-gray-50"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,42.7C960,32,1056,32,1152,42.7C1248,53,1344,75,1392,85.3L1440,96L1440,100L0,100Z"
          />
        </svg>
      </section>

      {/* ══════════ 2. INTRODUCTION ══════════ */}
      <section className="bg-gray-50 py-20 px-6">
        <FadeSection className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* text */}
          <div>
            <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900">
              Your Gateway to <br className="hidden md:block" />
              Sri Lanka
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-800">Visit Sri Lanka</strong> is your
              trusted travel companion designed to help you explore the beauty
              and diversity of Sri Lanka. Our platform provides reliable
              information about destinations, hotels, tour packages, and travel
              tips — all in one place.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're searching for the perfect beach getaway, a
              cultural pilgrimage through ancient cities, or an adrenaline-filled
              adventure in the highlands, we're here to turn your dream trip
              into reality.
            </p>
          </div>

          {/* image collage */}
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={img.label}
                className={`gallery-item relative rounded-2xl overflow-hidden shadow-lg group ${i === 0 ? "row-span-2" : ""
                  }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-500 ${i === 0 ? "h-full" : "h-44"
                    }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ══════════ 3. ABOUT SRI LANKA ══════════ */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40" />

        <FadeSection className="relative max-w-5xl mx-auto text-center">
          <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm">
            The Destination
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900">
            Discover Sri Lanka
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-lg">
            Sri Lanka, known as the{" "}
            <span className="text-teal-700 font-semibold">
              Pearl of the Indian Ocean
            </span>
            , is a tropical paradise filled with golden beaches, lush green
            mountains, wildlife safaris, ancient cities, and vibrant cultural
            heritage. From the busy streets of Colombo to the historic charm of
            Kandy and the breathtaking views of Ella, Sri Lanka offers
            unforgettable experiences for every traveler.
          </p>
        </FadeSection>

        {/* stats bar */}
        <FadeSection className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 text-center shadow-md border border-teal-100/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-teal-700">
                  {s.value}
                </p>
                <p className="text-gray-500 mt-1 text-sm font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ══════════ 4. MISSION & VISION ══════════ */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <FadeSection>
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 group hover:shadow-2xl transition-shadow duration-300 h-full">
              {/* icon */}
              <div className="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-200/50 pulse-ring">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🎯 Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to make travel planning{" "}
                <span className="font-semibold text-gray-800">
                  simple, accessible, and enjoyable
                </span>{" "}
                by providing accurate information and easy booking options for
                tourists around the world. We strive to bridge the gap between
                travelers and the wonders of Sri Lanka.
              </p>
            </div>
          </FadeSection>

          {/* Vision */}
          <FadeSection>
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 group hover:shadow-2xl transition-shadow duration-300 h-full">
              {/* icon */}
              <div className="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50 pulse-ring">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🌍 Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the{" "}
                <span className="font-semibold text-gray-800">
                  leading digital travel platform
                </span>{" "}
                promoting Sri Lanka to the world while supporting sustainable
                tourism and local communities. We envision a future where every
                traveler can discover Sri Lanka's magic with ease and
                confidence.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════ 5. WHY CHOOSE US ══════════ */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400" />

        <FadeSection className="max-w-6xl mx-auto text-center">
          <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm">
            Our Strengths
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-14 text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={item.title}
                className="group relative bg-gradient-to-br from-white to-teal-50/40 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                {/* number watermark */}
                <span className="absolute top-4 right-5 text-6xl font-extrabold text-teal-100/60 select-none pointer-events-none group-hover:text-teal-200/60 transition-colors">
                  0{idx + 1}
                </span>

                <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-2 relative z-10">
                  {item.title}
                </h4>
                <p className="text-gray-500 leading-relaxed text-sm relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ══════════ 6. CTA SECTION ══════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900" />
        {/* decorative circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 animate-float" style={{ animationDelay: "2s" }} />

        <FadeSection className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Explore <br className="hidden sm:block" /> Sri Lanka?
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Start planning your dream journey today. Discover stunning
            destinations, browse curated packages, and book the perfect hotel —
            all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-full bg-white text-teal-800 font-bold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
            >
              Start Your Journey Today
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View Destinations
            </button>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
