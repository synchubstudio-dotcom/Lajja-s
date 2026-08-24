"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Vadodara",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ name: "Contact Us", url: "/contact-us/" }]} />

        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Vadodara Kitchen & Customer Care
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Get in Touch with Lajja’s Foods
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Have questions about customized thepla travel packs, corporate hampers, wedding favors, or local Gujarat delivery schedules? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold font-serif text-stone-900">
                Central Kitchen & Office
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-kesari-100 text-kesari-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900">Kitchen Address:</span>
                    <p className="text-stone-600 mt-0.5">
                      {SITE_CONFIG.contact.address.street}, {SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} - {SITE_CONFIG.contact.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-kesari-100 text-kesari-800 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900">Phone & WhatsApp:</span>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-terracotta-700 font-semibold hover:underline block mt-0.5"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-kesari-100 text-kesari-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900">Email Support:</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-terracotta-700 font-semibold hover:underline block mt-0.5"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-kesari-100 text-kesari-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900">Operating Hours:</span>
                    <p className="text-stone-600 mt-0.5">{SITE_CONFIG.contact.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Flight Hamper Quick Note */}
            <div className="bg-warm-50 rounded-3xl p-6 border border-terracotta-200/70 space-y-2">
              <h3 className="text-sm font-bold font-serif text-terracotta-900">
                Planning an Overseas Trip or Flight Departure?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We prepare fresh travel packs 3-4 hours prior to flight departure. Mention your flight date in your order notes or WhatsApp us directly.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-stone-900">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill in the details below and our kitchen team will reach out within 2 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-herbal-50 border border-herbal-200 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-herbal-600 mx-auto" />
                  <h3 className="text-lg font-bold font-serif text-herbal-900">
                    Message Received with Thanks!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                    We have received your message regarding <strong>{formData.subject}</strong>. Our Vadodara kitchen coordinator will get back to you shortly at {formData.phone || formData.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Patel"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. anand@example.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                        City / Location
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-medium"
                      >
                        <option value="Vadodara">Vadodara</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Surat">Surat</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Anand">Anand & Vidyanagar</option>
                        <option value="Bharuch">Bharuch & Ankleshwar</option>
                        <option value="Other India / Abroad">Other India / International Travel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-medium"
                    >
                      <option value="General Inquiry">General Order Inquiry</option>
                      <option value="International Travel Pack Order">International Travel Pack Order</option>
                      <option value="Bulk Wedding / Corporate Gifting">Bulk Wedding / Corporate Gifting</option>
                      <option value="Custom Jain Friendly Requirement">Custom Jain Friendly Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Your Message / Order Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the quantity, delivery date, or any specific dietary requirements..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-terracotta-700 hover:bg-terracotta-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
