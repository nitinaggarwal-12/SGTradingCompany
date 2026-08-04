"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PaytmMerchantQRStandee } from "@/components/common/PaytmMerchantQRStandee";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Clock,
  MessageSquare,
  QrCode,
} from "lucide-react";

export const ContactUsSection: React.FC = () => {
  const { showToast } = useApp();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    brandInterested: "McCain Food Service (HORECA)",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast("Inquiry Sent directly to Rahul Garg & Sonu!");
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 bg-slate-950 border-b border-slate-800"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono-spec font-bold uppercase tracking-wider text-amber-400">
            <Phone className="w-4 h-4" />
            <span>DIRECT DISTRIBUTOR CONNECT & INQUIRY DESK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Connect with Rahul Garg & Sonu (SG Trading Company)
          </h2>
          <p className="text-sm text-slate-400">
            Reach out for institutional HORECA contract rates, daily cold chain deliveries, or General Trade (GT) FMCG case stock in Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Direct Contact Cards & Warehouse Address (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Rahul Garg & Sonu Direct Contact Card */}
            <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-spec font-bold uppercase text-amber-400">
                  DIRECT PHONE & WHATSAPP
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono-spec font-bold">
                  AVAILABLE NOW
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Rahul Garg & Sonu (Distributors)
              </h3>

              <div className="space-y-2.5 font-mono-spec text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919667731355"
                    className="flex-1 flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-400 font-bold transition-all"
                  >
                    <span>Rahul Garg:</span>
                    <span>9667731355</span>
                  </a>
                  <a
                    href="https://wa.me/919667731355?text=Hello%20Rahul%20Garg,%20I%20would%20like%20to%20inquire%20about%20SG%20Trading%20Company%20wholesale%20FMCG%20supplies."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919643097002"
                    className="flex-1 flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-white font-bold transition-all"
                  >
                    <span>Sonu / Cold Chain:</span>
                    <span>9643097002</span>
                  </a>
                  <a
                    href="https://wa.me/919643097002?text=Hello%20Sonu,%20I%20need%20to%20inquire%20about%20-18C%20Cold-Chain%20delivery%20from%20Mayur%20Vihar%20Phase-3."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* OFFICIAL AUTHENTIC SG TRADING COMPANY PAYTM UPI STANDEE */}
            <PaytmMerchantQRStandee />

            {/* Mayur Vihar Phase-3 Warehouse Location Card with Embedded Google Maps */}
            <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-spec font-bold text-sky-400 uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Mayur Vihar Phase-3 Warehouse Address</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=B-577+Shiv+Mandir+Road+GD+Colony+Mayur+Vihar+Phase-3+Delhi+110096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-spec font-extrabold text-[10px] transition-all"
                >
                  Open Google Maps GPS →
                </a>
              </div>

              <div>
                <p className="text-sm font-extrabold text-white leading-snug">
                  B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono-spec mt-2">
                  <span><strong>Email:</strong> sgtradingcompany@rediffmail.com</span>
                  <span><strong>Hours:</strong> Mon-Sat 8AM-8PM</span>
                </div>
              </div>

              {/* INTERACTIVE EMBEDDED GOOGLE MAPS IFRAME */}
              <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-700 relative shadow-inner">
                <iframe
                  title="SG Trading Company Mayur Vihar Phase-3 Warehouse Location"
                  src="https://www.google.com/maps?q=B-577+Shiv+Mandir+Road+GD+Colony+Mayur+Vihar+Phase-3+Delhi+110096&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Cold Chain Guarantee Card */}
            <div className="industrial-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">
                  Express Delhi NCR Dispatch
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Refrigerated -18°C delivery for McCain, ITC, Chatha & Cheese packs directly to your kitchen.
                </p>
              </div>
            </div>
          </div>

          {/* Right Direct Commercial Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="industrial-card rounded-2xl p-6 md:p-8 border border-slate-800">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Inquiry Received by Rahul Garg & Sonu!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Our team will contact you back on <strong className="text-amber-400">{formData.phone}</strong> with wholesale rates and delivery schedules for <strong className="text-white">{formData.businessName}</strong>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Send Another Commercial Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">
                      Request Wholesale Rates & Sample Dispatch
                    </h3>
                    <span className="text-xs text-slate-400 font-mono-spec">
                      Direct to Distributor Desk
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Chef / Manager / Retailer Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Hotel / Restaurant / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Establishment / Store Name"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 96677 XXXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Primary Brand / Product Line of Interest
                      </label>
                      <select
                        value={formData.brandInterested}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            brandInterested: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="McCain Food Service (HORECA)">
                          McCain Food Service (French Fries & Cheese Balls)
                        </option>
                        <option value="ITC Master Chef (HORECA)">
                          ITC Master Chef (Nuggets & Gravy Bases)
                        </option>
                        <option value="Veeba Food Services (HORECA)">
                          Veeba Food Services (Mayo, Pizza & Dressings)
                        </option>
                        <option value="Britannia Cheese (HORECA)">
                          Britannia Cheese (Diced Mozzarella & 51 Slices)
                        </option>
                        <option value="Iscon Balaji / Go Cheese / Chatha">
                          Iscon Balaji / Go Diced Cheese / Chatha Foods
                        </option>
                        <option value="General Trade GT (Anoop Sattu, Ocean, Sleepy Owl, Loyka)">
                          General Trade GT (Anoop Sattu, Ocean Water, Sleepy Owl, Loyka)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      Requirement Details / Monthly Case Volume
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify required quantity (e.g. 10 cases McCain fries weekly, 5 cases Veeba mayo...)"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Commercial Inquiry to Rahul Garg & Sonu →</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
