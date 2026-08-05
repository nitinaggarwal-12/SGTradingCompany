"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  TrendingUp,
  Snowflake,
  Clock,
  Award,
  FileText,
  Percent,
  RefreshCw,
  Gift,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

export const B2BGrowthAndSalesSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tiers" | "credit" | "subscription" | "referral">("tiers");
  const [gstInput, setGstInput] = useState("");
  const [hotelNameInput, setHotelNameInput] = useState("");
  const [monthlySpendInput, setMonthlySpendInput] = useState("150000");
  const [creditSubmitted, setCreditSubmitted] = useState(false);

  const handleApplyCredit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gstInput.trim() || !hotelNameInput.trim()) return;
    setCreditSubmitted(true);
  };

  return (
    <section id="b2b-growth-suite" className="py-12 bg-slate-900/80 border-y border-slate-800">
      <div className="max-w-8xl mx-auto px-6 md:px-12 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL B2B GROWTH, SALES &amp; CREDIT CONVERSION ENGINE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Wholesale Volume Tiering, Institutional Credit &amp; Auto-Replenishment
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Engineered specifically for 5-Star Hotels, Multi-Outlet QSR Chains &amp; Cloud Kitchen Clusters in Delhi NCR.
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono-spec">
            {[
              { id: "tiers", label: "⚡ Wholesale Volume Tiers", icon: Percent },
              { id: "credit", label: "🏛️ Institutional 14-Day Credit", icon: CreditCard },
              { id: "subscription", label: "📅 Standing Weekly Replenish", icon: RefreshCw },
              { id: "referral", label: "🍳 Chef Referral Trial Program", icon: Gift },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: WHOLESALE VOLUME TIER PRICE SCALE */}
        {activeTab === "tiers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="industrial-card p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono-spec font-bold">
                  TIER 1 • STANDARD WHOLESALE
                </span>
                <span className="text-xs text-slate-400 font-mono-spec">1 - 4 Cases</span>
              </div>
              <h3 className="text-xl font-black text-white">Boutique Cafe &amp; Single Outlet</h3>
              <p className="text-xs text-slate-300">
                Ideal for neighborhood cafes and cloud kitchen startups ordering weekly carton refills.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 font-mono-spec">
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Standard Wholesale Case Rate</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Same-Day Express Mayur Vihar Delivery</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Instant B2B GST Credit Invoice</span>
                </li>
              </ul>
            </div>

            <div className="industrial-card p-6 rounded-2xl bg-slate-950 border-2 border-amber-500 shadow-xl space-y-4 relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono-spec font-black uppercase">
                MOST POPULAR FOR QSRs
              </div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono-spec font-bold border border-amber-500/40">
                  TIER 2 • VOLUME REBATE (4% OFF)
                </span>
                <span className="text-xs text-amber-400 font-mono-spec font-bold">5 - 19 Cases</span>
              </div>
              <h3 className="text-xl font-black text-white">Multi-Outlet QSR &amp; Burger Chain</h3>
              <p className="text-xs text-slate-300">
                Designed for high-fry and mayonnaise volume QSR kitchens operating multiple fryers.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 font-mono-spec">
                <li className="flex items-center gap-2 text-amber-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Flat 4% Automatic Case Rebate</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dedicated Cold Room Stock Reservation</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Priority -18°C Digital Temperature Audit Report</span>
                </li>
              </ul>
            </div>

            <div className="industrial-card p-6 rounded-2xl bg-slate-950 border border-emerald-500/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-bold border border-emerald-500/40">
                  TIER 3 • PALLET CONTRACT (8% OFF)
                </span>
                <span className="text-xs text-emerald-400 font-mono-spec font-bold">20+ Cases</span>
              </div>
              <h3 className="text-xl font-black text-white">5-Star Hotel, Banquet &amp; Corporate</h3>
              <p className="text-xs text-slate-300">
                Institutional supply contract with dedicated refrigerated vehicle dispatch &amp; 14-day credit terms.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 font-mono-spec">
                <li className="flex items-center gap-2 text-emerald-400 font-black">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Flat 8% Wholesale Pallet Discount</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Free Dedicated Express Reefer Truck Dispatch</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Eligible for 14-Day Post-Delivery NEFT Credit Line</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: INSTITUTIONAL 14-DAY B2B CREDIT APPLICATION WORKFLOW */}
        {activeTab === "credit" && (
          <div className="industrial-card p-6 md:p-8 rounded-2xl bg-slate-950 border-2 border-amber-500/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-mono-spec font-bold uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL B2B CREDIT WORKFLOW</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Unlock 14-Day Post-Delivery Corporate Credit for Hotels &amp; QSR Chains
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                We understand institutional kitchens operate on corporate purchase orders. Corporate clients with verified GSTIN obtain 14-day automated NEFT/RTGS credit facilities backed by SG Trading Company’s Mayur Vihar Phase-3 treasury.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono-spec text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Credit Horizon:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">14 Days Post-Delivery</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Pre-Approved Limit:</span>
                  <span className="text-amber-400 font-extrabold text-sm">Up to ₹5.00 Lakhs / mo</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              {creditSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-white">
                    Institutional Credit Request Pre-Verified!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Rahul Garg &amp; Sonu have received your GST credit verification request for <strong>{hotelNameInput}</strong>. Our finance team will confirm your 14-day credit limit within 2 business hours.
                  </p>
                  <button
                    onClick={() => setCreditSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono-spec font-bold text-white mt-2 cursor-pointer"
                  >
                    Submit Another Account
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCredit} className="space-y-4">
                  <h4 className="text-sm font-extrabold text-white uppercase font-mono-spec">
                    Instant B2B Credit Application Form
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Hotel / Cloud Kitchen Enterprise Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radisson Blu Kaushambi"
                        value={hotelNameInput}
                        onChange={(e) => setHotelNameInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Corporate GSTIN Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 07AAACR1234F1Z5"
                        value={gstInput}
                        onChange={(e) => setGstInput(e.target.value.toUpperCase())}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 uppercase font-mono-spec"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      Estimated Monthly FMCG / Cold Chain Requirement (₹)
                    </label>
                    <select
                      value={monthlySpendInput}
                      onChange={(e) => setMonthlySpendInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="75000">₹50,000 - ₹1,00,000 / month</option>
                      <option value="150000">₹1,00,000 - ₹2,50,000 / month</option>
                      <option value="300000">₹2,50,000 - ₹5,00,000 / month</option>
                      <option value="600000">₹5,00,000+ / month (Pallet Institutional)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Apply for 14-Day Corporate Credit Line</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STANDING WEEKLY AUTO-REPLENISHMENT SUBSCRIPTION */}
        {activeTab === "subscription" && (
          <div className="industrial-card p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Monday &amp; Thursday Fixed Dispatch</h4>
              <p className="text-xs text-slate-300">
                Lock in automatic weekly shipments of McCain 9mm French Fries &amp; Veeba Mayonnaise so your kitchen prep never runs out before peak dinner rush.
              </p>
              <span className="text-[11px] font-mono-spec text-amber-400 font-bold block">
                ● Extra 2% Subscription Loyalty Rebate
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Snowflake className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Guaranteed Cold Room Slot Allocation</h4>
              <p className="text-xs text-slate-300">
                During festive &amp; wedding surges (Oct–Dec), subscription accounts receive reserved pallet storage in Mayur Vihar Cold Room 1 with zero stockouts.
              </p>
              <span className="text-[11px] font-mono-spec text-emerald-400 font-bold block">
                ● 100% Stock Availability Guarantee
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Pause or Modify Anytime via WhatsApp</h4>
              <p className="text-xs text-slate-300">
                Adjust case quantities or skip a delivery window up to 12 hours before dispatch by messaging Rahul Garg directly at 9667731355.
              </p>
              <span className="text-[11px] font-mono-spec text-sky-400 font-bold block">
                ● Zero Long-Term Contract Penalty
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: EXECUTIVE CHEF REFERRAL & FREE TRIAL CASE PROGRAM */}
        {activeTab === "referral" && (
          <div className="industrial-card p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-950 to-emerald-500/20 border-2 border-amber-500 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-mono-spec font-black uppercase">
                <Gift className="w-3.5 h-3.5" />
                <span>EXECUTIVE CHEF REFERRAL &amp; TRIAL PROGRAM</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Refer a Cloud Kitchen or Hotel Chef &amp; Get ₹1,500 Wholesale Credit + 1 Free Trial Case
              </h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-3xl">
                When an Executive Chef or Cloud Kitchen Procurement Manager introduces a new institutional account to SG Trading Company, both accounts receive a **Free Sample Case of McCain French Fries (2.5 Kg x 5)** or **ITC Retort Gravy Base** on their next dispatch.
              </p>
            </div>

            <a
              href="https://wa.me/919667731355?text=Namaste%20Rahul%20Garg!%20I%20would%20like%20to%20refer%20a%20new%20cloud%20kitchen%20/%20hotel%20account%20for%20the%20Chef%20Trial%20Case%20Program."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-lg"
            >
              <span>Refer Account on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
