"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Flame,
  Gift,
  CheckCircle2,
  Copy,
  Check,
  Snowflake,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";

interface OfferDeal {
  id: string;
  code: string;
  title: string;
  category: "Bulk Volume Rebates" | "Combo Bundles" | "Banquet & Hotel Specials" | "New Account Bonus";
  brand: string;
  discountBadge: string;
  validity: string;
  description: string;
  minOrderRequirement: string;
  estimatedSavings: string;
  imageUrl: string;
  featured?: boolean;
}

const LIVE_OFFERS: OfferDeal[] = [
  {
    id: "mccain-10-plus-1",
    code: "SG-MCCAIN10PLUS1",
    title: "McCain 9mm French Fries: Buy 10 Master Cases, Get 1 FREE",
    category: "Bulk Volume Rebates",
    brand: "McCain Food Service",
    discountBadge: "BUY 10 GET 1 FREE (SAVE ₹1,520)",
    validity: "Valid Through August 2026 • Mayur Vihar Cold Room 1",
    description:
      "Order 10 Master Cases (100 Kg total) of McCain Commercial 9mm Shoestring French Fries and receive 1 full Master Case (10 Kg) completely FREE + Zero refrigerated van delivery charges across Delhi NCR.",
    minOrderRequirement: "10 Master Cases (100 Kg Total)",
    estimatedSavings: "₹1,520 Direct Carton Savings + Free Delivery",
    imageUrl: "https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=85",
    featured: true,
  },
  {
    id: "britannia-bulk-cheese",
    category: "Combo Bundles",
    code: "SG-CHEESEBULK450",
    title: "Britannia 70:30 Hybrid Mozzarella Pizza Blend Tier Pricing",
    brand: "Britannia Commercial Cheese",
    discountBadge: "FLAT ₹450 / KG (SAVE ₹200 / CASE)",
    validity: "Active HORECA Special • Instant Approval",
    description: "Unlock institutional factory pricing on Britannia Diced Mozzarella & 70:30 Hybrid Cheese blocks when ordering 5 or more Master Cases for your pizzeria or cloud kitchen network.",
    minOrderRequirement: "5+ Master Cartons (50 Kg+ Total)",
    estimatedSavings: "₹1,000+ Savings Per Order + 100% GST Input Credit",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
    featured: true,
  },
  {
    id: "veeba-garlic-mayo-combo",
    category: "Combo Bundles",
    code: "SG-VEEBACONTRA",
    title: "Veeba Mayo Commercial Starter: Buy 4 Buckets, Get 2 Sauces FREE",
    brand: "Veeba Food Services",
    discountBadge: "FREE 2 x 1 KG PIZZA SAUCES",
    validity: "Limited Commercial Batch • Mayur Vihar Warehouse",
    description: "Purchase 4 Heavy-Duty 5 Kg Buckets of Veeba White Garlic or Tandoori Mayonnaise and get 2 Chef Special 1 Kg Pizza & Pasta Sauce spout pouches absolutely free.",
    minOrderRequirement: "4 x 5 Kg Commercial Buckets",
    estimatedSavings: "₹330 Free Product Value",
    imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "itc-retort-banquet-pass",
    category: "Banquet & Hotel Specials",
    code: "SG-ITCBANQUET265",
    title: "ITC Master Chef Commercial Retort Gravy Banquet Volume Pass",
    brand: "ITC Master Chef Retort",
    discountBadge: "SPECIAL ₹265 / 2.5 KG POUCH",
    validity: "Hotel Banquet & Caterer Exclusive Rate",
    description: "Special institutional pricing for hotel catering directors and wedding caterers. Stock up on Makhani & Cashew gravy bases for 500+ guest banquets.",
    minOrderRequirement: "20+ Institutional Pouches (2 Master Cases)",
    estimatedSavings: "₹500 Savings Per Master Case",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=85",
    featured: true,
  },
  {
    id: "new-account-welcome-voucher",
    category: "New Account Bonus",
    code: "SG-WELCOME1000",
    title: "Mayur Vihar & Delhi NCR New Account Welcome Credit Voucher",
    brand: "SG Trading Company Corporate",
    discountBadge: "FLAT ₹1,000 INVOICE CASHBACK",
    validity: "First Order Exclusive • Official GSTIN Verified",
    description: "New restaurants, QSR chains, and hotels registering their first wholesale cold-chain supply order of ₹25,000+ with SG Trading Company receive a flat ₹1,000 instant invoice discount + dedicated account coordinator.",
    minOrderRequirement: "First Order of ₹25,000+",
    estimatedSavings: "₹1,000 Instant Invoice Discount",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67f5d42445?auto=format&fit=crop&w=800&q=85",
  },
];

export default function CurrentOffersPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Live Offers");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = [
    "All Live Offers",
    "Bulk Volume Rebates",
    "Combo Bundles",
    "Banquet & Hotel Specials",
    "New Account Bonus",
  ];

  const filteredOffers =
    selectedFilter === "All Live Offers"
      ? LIVE_OFFERS
      : LIVE_OFFERS.filter((o) => o.category === selectedFilter);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleWhatsAppClaim = (deal: OfferDeal) => {
    const text = encodeURIComponent(
      `Hello SG Trading Company! I would like to claim Commercial Promotion [${deal.code}]: "${deal.title}" for our kitchen in Delhi NCR. Please share active invoice verification.`
    );
    window.open(`https://wa.me/919667731355?text=${text}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#060911] text-white">
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-[#060911] py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono-spec font-black uppercase">
                <Flame className="w-4 h-4" />
                <span>OFFICIAL AUTHORIZED FACTORY WHOLESALE PROMOTIONS • AUGUST 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Current Offers &amp;{" "}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Wholesale Promotions.
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Direct factory-supported volume rebates, commercial combo deals, and banquet promotions dispatched from our <strong className="text-white">B-577 Mayur Vihar Phase-3 Central Cold Room 1 Hub</strong> with full GST Input Credit (<strong className="text-amber-400">GSTIN: 07ADQFS8839Q1ZQ</strong>).
              </p>
            </div>

            {/* Quick Promo Summary HUD */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/60 shadow-2xl space-y-3 shrink-0 md:w-80 font-mono-spec">
              <div className="flex items-center justify-between text-xs text-amber-400 font-black uppercase">
                <span>ACTIVE PROMO STATUS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-3xl font-black text-white">
                5 Active Deals
              </div>
              <p className="text-xs text-slate-300">
                Guaranteed factory-sealed stock • Next-morning refrigerated delivery across Delhi NCR.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-8 border-t border-slate-800/80 mt-8">
            <span className="text-xs font-mono-spec text-slate-400 uppercase font-bold mr-2">
              Filter Promotions:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-spec font-bold transition-all cursor-pointer border ${
                  selectedFilter === cat
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Grid Section */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.id}
                className="group rounded-3xl bg-[#0B101D] text-white border-2 border-slate-800 hover:border-amber-500/80 overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Badge Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={deal.imageUrl}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Deal Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg">
                      {deal.discountBadge}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B101D] to-transparent" />
                  </div>

                  {/* Deal Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono-spec">
                      <span className="text-amber-400 font-bold uppercase">{deal.brand}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Snowflake className="w-3.5 h-3.5" /> -18°C Ready
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white leading-snug group-hover:text-amber-400 transition-colors">
                      {deal.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {deal.description}
                    </p>

                    {/* Requirements & Savings Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 font-mono-spec text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Min Requirement:</span>
                        <strong className="text-white">{deal.minOrderRequirement}</strong>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                        <span>Estimated Value:</span>
                        <span>{deal.estimatedSavings}</span>
                      </div>
                    </div>

                    {/* Promo Code Box */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono-spec text-slate-400 block uppercase font-bold">
                          Official Promo Code:
                        </span>
                        <span className="text-sm font-mono-spec font-black text-amber-400 tracking-wider">
                          {deal.code}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(deal.code)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono-spec font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => handleWhatsAppClaim(deal)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>🔥 Claim Wholesale Promotion &amp; Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-mono-spec">
                    {deal.validity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Volume Quote Banner */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-20">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>CUSTOM WHOLESALE INSTITUTIONAL CONTRACTS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Need Annual Institutional Contract Pricing for 50+ Hotel &amp; QSR Outlets?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our Mayur Vihar Phase-3 procurement team negotiates custom factory-direct volume rates for multi-unit QSR franchises, 5-star hotel groups, and regional catering businesses.
            </p>
          </div>

          <Link
            href="/#contact-section"
            className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-xl shadow-amber-500/20 shrink-0"
          >
            Request Dedicated Account Rate Card →
          </Link>
        </div>
      </section>
    </main>
  );
}
