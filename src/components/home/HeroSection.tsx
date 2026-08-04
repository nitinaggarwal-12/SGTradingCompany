"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { TURNKEY_KITCHEN_CONFIGS } from "@/data/products";
import { TurnkeyEstablishmentType } from "@/types/equipment";
import {
  ShieldCheck,
  Snowflake,
  Zap,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Sliders,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
}) => {
  const { loadTurnkeyPackageToRFQ } = useApp();

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<TurnkeyEstablishmentType>("qsr-burger-chain");

  const currentConfig =
    TURNKEY_KITCHEN_CONFIGS.find((c) => c.id === selectedEstablishment) ||
    TURNKEY_KITCHEN_CONFIGS[0];

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 md:py-16 lg:py-20 border-b border-slate-200 dark:border-slate-800/80">
      {/* Background Subtle Industrial Mesh & Radial Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#334155 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Technical Authority & Messaging */}
          <div className="lg:col-span-6 space-y-7">
            {/* Visiting Card Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SG TRADING COMPANY • AUTH. DISTRIBUTOR (DELHI NCR)</span>
            </div>

            {/* Proportional Scaling Hero Header */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
              Authorized Distributor for{" "}
              <span className="text-amber-600 dark:text-amber-400">
                HORECA &amp; General Trade (GT)
              </span>{" "}
              FMCG Supplies.
            </h1>

            <p className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl text-slate-700 dark:text-slate-200">
              Direct institutional distributor for{" "}
              <strong className="text-amber-700 dark:text-amber-400 font-extrabold">
                McCain Food Service, ITC Master Chef, Veeba, Britannia Cheese, Iscon Balaji, Go Diced, Chatha Foods &amp; Milkana Professional
              </strong>{" "}
              (HORECA) alongside{" "}
              <strong className="text-amber-700 dark:text-amber-400 font-extrabold">
                Anoop Sattu, Ocean Water, Sleepy Owl Coffee &amp; Loyka
              </strong>{" "}
              (General Trade).
            </p>

            {/* Direct Visiting Card Contact Credentials & Paytm UPI QR Code Box - 100% Razor Sharp Contrast */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-amber-500 shadow-2xl grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Left & Center: Credentials & Warehouse Address */}
              <div className="sm:col-span-8 space-y-4 font-mono-spec">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] uppercase font-extrabold tracking-wider text-amber-700 dark:text-amber-400">
                      Authorized Distributors
                    </span>
                    <span className="font-extrabold text-xl block mt-0.5 text-slate-900 dark:text-white">
                      Rahul Garg &amp; Sonu
                    </span>
                    <a
                      href="tel:+919667731355"
                      className="text-amber-700 dark:text-amber-400 font-extrabold text-sm block mt-1 hover:underline"
                    >
                      Ph: 9667731355 / 9643097002
                    </a>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-extrabold tracking-wider text-sky-700 dark:text-sky-400">
                      Mayur Vihar Phase-3 Warehouse
                    </span>
                    <span className="font-bold block text-xs leading-relaxed mt-0.5 text-slate-900 dark:text-slate-100">
                      B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-bold block text-[11px] mt-1">
                      Email: sgtradingcompany@rediffmail.com
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-[10px] font-extrabold border border-emerald-300 dark:border-emerald-500/40">
                    ● -18°C COLD ROOM 1 READY
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 text-[10px] font-extrabold border border-amber-300 dark:border-amber-500/40">
                    GSTIN: 07ADQFS8839Q1ZQ
                  </span>
                </div>
              </div>

              {/* Right: Authentic SG Trading Company Paytm UPI Merchant QR Standee */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-sky-500/80 shadow-md">
                <span className="text-[10px] font-mono-spec font-black text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1.5 text-center">
                  Paytm UPI Merchant QR
                </span>
                <img
                  src="/sg-trading-company-paytm-qr.png"
                  alt="SG Trading Company Paytm UPI Merchant QR Code Standee"
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain rounded-lg border border-slate-200 shadow bg-white"
                />
                <span className="text-[10px] font-mono-spec font-black text-slate-900 dark:text-amber-400 mt-1.5">
                  paytmqr69pf0i@ptys
                </span>
                <span className="text-[9px] font-mono-spec font-bold text-slate-600 dark:text-slate-400">
                  9667731355 • Instant Pay
                </span>
              </div>
            </div>

            {/* Brand Logos Bar */}
            <div className="space-y-2">
              <span className="text-xs font-mono-spec font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                Official Authorized Brands Distributed (12):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "McCain (HORECA)",
                  "ITC Master Chef",
                  "Veeba Food Services",
                  "Britannia Cheese",
                  "Iscon Balaji",
                  "Go Diced Cheese",
                  "Chatha Foods",
                  "Milkana Professional",
                  "Anoop Sattu (GT)",
                  "Ocean Water (GT)",
                  "Sleepy Owl Coffee (GT)",
                  "Loyka (GT)",
                ].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-mono-spec font-bold text-slate-800 dark:text-slate-200"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Browse Authorized Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:+919667731355"
                className="px-6 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/60 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Rahul Garg: 9667731355</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Turnkey Supply Bundle Estimator */}
          <div id="turnkey" className="lg:col-span-6">
            <div className="industrial-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-amber-500/30">
              {/* Top Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono-spec font-bold uppercase tracking-wider text-amber-400">
                      WHOLESALE BUNDLE CONFIGURATOR
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Turnkey HORECA & GT Case Configurator
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-mono-spec font-bold border border-amber-500/30">
                  DISTRIBUTOR RATE RFQ
                </span>
              </div>

              {/* Establishment Type Selector Pills */}
              <div className="py-5 space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Your Supply Requirement Segment:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "qsr-burger-chain", label: "QSR Burger & Fried Chicken Chain" },
                    { id: "hotel-banquet-buffet", label: "Hotel Banquet & Buffet Dairy" },
                    { id: "supermarket-gt-distributor", label: "General Trade (GT) Retail Case" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setSelectedEstablishment(
                          item.id as TurnkeyEstablishmentType
                        )
                      }
                      className={`px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left border ${
                        selectedEstablishment === item.id
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                          : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Engineering Output Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 mb-5">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono-spec block uppercase">
                    Daily Volume
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono-spec mt-0.5 block">
                    {currentConfig.recommendedCovers}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono-spec block uppercase">
                    Logistics Fleet
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono-spec mt-0.5 block">
                    {currentConfig.estimatedSqFt}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono-spec block uppercase">
                    Cold Chain Storage
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-sky-400 font-mono-spec mt-0.5 block">
                    {currentConfig.totalPowerLoadKW}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono-spec block uppercase">
                    Delhi NCR Supply
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono-spec mt-0.5 block">
                    {currentConfig.lpgCylindersDay}
                  </span>
                </div>
              </div>

              {/* Package Summary & Key Deliverables */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-bold text-white">
                  {currentConfig.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentConfig.layoutDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {currentConfig.keyDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Load Turnkey Package into RFQ */}
              <button
                onClick={() => loadTurnkeyPackageToRFQ(currentConfig)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>
                  Load {currentConfig.recommendedProductIds.length} Recommended FMCG Brand SKUs into Wholesale RFQ Basket →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
