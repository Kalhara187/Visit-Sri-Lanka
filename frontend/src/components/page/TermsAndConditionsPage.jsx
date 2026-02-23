import React, { useEffect, useRef } from "react";

/* ═══════════════════════════ PAGE ═══════════════════════════ */
export default function TermsAndConditionsPage() {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* ══════════ inline keyframes ══════════ */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp .7s ease-out forwards;
        }
      `}</style>

      {/* ══════════ 1. HERO SECTION ══════════ */}
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white overflow-hidden"
      >
        {/* background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900" />
        
        {/* decorative circles */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white/5" />

        {/* content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sm tracking-wider uppercase border border-white/20">
            Legal Information
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-lg">
            Terms & <span className="text-teal-300">Conditions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Please read our terms and conditions carefully before using our services.
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

      {/* ══════════ CONTENT SECTION ══════════ */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* 1. Introduction */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <p>
                Welcome to <strong>Visit Sri Lanka</strong>. By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
              <p>
                These Terms & Conditions govern your relationship with Visit Sri Lanka and constitute a legally binding agreement between you and Visit Sri Lanka regarding your use of our website and services.
              </p>
            </div>
          </div>

          {/* 2. User Accounts */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. User Accounts</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <h3 className="font-semibold text-gray-800">2.1 Account Creation</h3>
              <p>
                To access certain features of our website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h3 className="font-semibold text-gray-800">2.2 Accuracy of Information</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
              </p>
              
              <h3 className="font-semibold text-gray-800">2.3 Account Security</h3>
              <p>
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create a strong password and keep it confidential</li>
                <li>Not share your account credentials with any third party</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any security breach</li>
              </ul>
            </div>
          </div>

          {/* 3. Booking & Payments */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Booking & Payments</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <h3 className="font-semibold text-gray-800">3.1 Payment Terms</h3>
              <p>
                All payments for hotel bookings and tour packages must be made in full at the time of booking. We accept various payment methods including credit cards, debit cards, and online banking. All prices are listed in USD unless otherwise specified.
              </p>
              
              <h3 className="font-semibold text-gray-800">3.2 Cancellation Policies</h3>
              <p>
                Cancellation policies vary depending on the hotel or tour package provider. Generally:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancellations made 7+ days before check-in: Full refund</li>
                <li>Cancellations made 3-6 days before check-in: 50% refund</li>
                <li>Cancellations made less than 3 days before check-in: No refund</li>
              </ul>
              
              <h3 className="font-semibold text-gray-800">3.3 Refund Conditions</h3>
              <p>
                Refunds will be processed within 14 business days of approval. Refunds are subject to the cancellation policy of the specific booking. Processing fees may apply and will be deducted from the refund amount.
              </p>
            </div>
          </div>

          {/* 4. Hotel Owner Responsibilities */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Hotel Owner Responsibilities</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <h3 className="font-semibold text-gray-800">4.1 Accurate Listing Information</h3>
              <p>
                Hotel owners are responsible for ensuring that all information provided about their properties, including descriptions, photos, amenities, pricing, and availability, is accurate and up-to-date. We reserve the right to remove listings that contain false or misleading information.
              </p>
              
              <h3 className="font-semibold text-gray-800">4.2 Service Quality Responsibility</h3>
              <p>
                Hotel owners agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide the services as described in the listing</li>
                <li>Maintain clean and safe facilities</li>
                <li>Honor all confirmed bookings</li>
                <li>Respond to guest inquiries within 24 hours</li>
                <li>Comply with all local laws and regulations</li>
              </ul>
            </div>
          </div>

          {/* 5. Prohibited Activities */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Prohibited Activities</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <p>
                Users are strictly prohibited from engaging in any of the following activities:
              </p>
              
              <h3 className="font-semibold text-gray-800">5.1 Fraud</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing false or fraudulent information</li>
                <li>Using stolen payment methods</li>
                <li>Manipulating booking counts or reviews</li>
                <li>Engaging in any form of financial fraud</li>
              </ul>
              
              <h3 className="font-semibold text-gray-800">5.2 Misuse of Content</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Copying, reproducing, or distributing website content without permission</li>
                <li>Using our content for commercial purposes without authorization</li>
                <li>Scraping or harvesting data from our website</li>
              </ul>
              
              <h3 className="font-semibold text-gray-800">5.3 Illegal Activities</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Using the website for any unlawful purpose</li>
                <li>Violating any applicable local, national, or international laws</li>
                <li>Interfering with or disrupting the website's operation</li>
              </ul>
            </div>
          </div>

          {/* 6. Limitation of Liability */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <p>
                <strong>Visit Sri Lanka</strong> acts as a platform connecting travelers with hotels and tour providers. We do not own, operate, or control the hotels or tour services listed on our platform.
              </p>
              <p>
                To the maximum extent permitted by law, Visit Sri Lanka shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Damages resulting from the actions or negligence of third parties</li>
                <li>Any discrepancies or issues with hotel services or tour packages</li>
                <li>Data loss or security breaches beyond our reasonable control</li>
              </ul>
              <p className="mt-4">
                Users agree to indemnify and hold Visit Sri Lanka harmless from any claims, damages, or expenses arising from their use of the platform.
              </p>
            </div>
          </div>

          {/* 7. Changes to Terms */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">7. Changes to Terms</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 ml-16">
              <p>
                We reserve the right to modify, update, or replace these Terms & Conditions at any time without prior notice. Any changes will be effective immediately upon posting on this page.
              </p>
              <p>
                Your continued use of the website after any changes constitutes acceptance of the new terms. We encourage you to review this page periodically to stay informed about any updates.
              </p>
              <p>
                For significant changes, we will provide notice through prominent posting on our website or by sending an email to registered users.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-teal-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Questions About These Terms?</h3>
              <p className="text-gray-600 mb-6">
                If you have any questions or concerns about these Terms & Conditions, please contact us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200"
              >
                Contact Us
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Last Updated */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

        </div>
      </section>
    </div>
  );
}
