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
  CreditCard,
  Building,
} from "lucide-react";

interface OfferDeal {
  id: string;
  code: string;
  title: string;
  category:
    | "Bulk Volume Rebates"
    | "Combo Bundles"
    | "Banquet & Hotel Specials"
    | "New Account Bonus"
    | "Credit Card Cashback Offers";
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
    id: "hdfc-corporate-card-cashback",
    code: "SG-HDFCCORP1500",
    title: "HDFC Bank Commercial Corporate Card: Flat ₹1,500 Instant Cashback",
    category: "Credit Card Cashback Offers",
    brand: "HDFC Bank Corporate Cards",
    discountBadge: "FLAT ₹1,500 INSTANT CASHBACK",
    validity: "Valid Through August 2026 • Commercial Credit Cards",
    description:
      "Pay your wholesale HORECA cold-chain invoice using HDFC Corporate, Business, or Commercial Purchase Credit Card and receive flat ₹1,500 instant cashback + 5X Reward Points on invoices of ₹40,000+.",
    minOrderRequirement: "Invoice value ₹40,000+ via HDFC Corporate Card",
    estimatedSavings: "₹1,500 Instant Cashback + 5X Corporate Rewards",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=85",
    featured: true,
  },
  {
    id: "icici-commercial-card-cashback",
    code: "SG-ICICIB2B2500",
    title: "ICICI Bank B2B Commercial Card: 8% Cashback Up to ₹2,500",
    category: "Credit Card Cashback Offers",
    brand: "ICICI Bank Corporate",
    discountBadge: "FLAT 8% CASHBACK (UP TO ₹2,500)",
    validity: "Monthly Cold-Room Replenishment Special",
    description:
      "Enjoy flat 8% cashback up to ₹2,500 on all recurring frozen food and cheese replenishment orders placed using ICICI Bank Corporate & Commercial Credit Cards.",
    minOrderRequirement: "Min Invoice ₹20,000 via ICICI Commercial Card",
    estimatedSavings: "Up to ₹2,500 Monthly Cashback",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67f5d42445?auto=format&fit=crop&w=800&q=85",
    featured: true,
  },
  {
    id: "axis-corporate-card-offer",
    code: "SG-AXISCORP2000",
    title: "Axis Bank Commercial Credit Card: Flat 10% Instant Discount",
    category: "Credit Card Cashback Offers",
    brand: "Axis Bank Commercial",
    discountBadge: "FLAT 10% INSTANT DISCOUNT (UP TO ₹2,000)",
    validity: "Active All Days • Instant Invoice Credit",
    description:
      "Instant 10% discount up to ₹2,000 on wholesale master cartons of McCain French Fries, Britannia Mozzarella, and Veeba Sauces when paid using Axis Bank Commercial Credit Cards.",
    minOrderRequirement: "Min Invoice ₹15,000 via Axis Commercial Card",
    estimatedSavings: "Up to ₹2,000 Instant Invoice Discount",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "paytm-upi-credit-offer",
    code: "SG-PAYTMUPI500",
    title: "Paytm Merchant UPI & UPI Credit Card: Flat ₹500 Cash Credit",
    category: "Credit Card Cashback Offers",
    brand: "Paytm Merchant QR (paytmqr69pf0i@ptys)",
    discountBadge: "FLAT ₹500 INSTANT CASH CREDIT",
    validity: "Instant Dispatch Verification • Mayur Vihar-3 Hub",
    description:
      "Instant ₹500 cash credit on your wholesale order when paying via RuPay Credit Card on UPI or Paytm Merchant QR at our Mayur Vihar Phase-3 Cold Room dispatch counter.",
    minOrderRequirement: "Min Order ₹10,000 via UPI Credit / Paytm QR",
    estimatedSavings: "₹500 Instant Dispatch Credit",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
  },
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
    description:
      "Unlock institutional factory pricing on Britannia Diced Mozzarella & 70:30 Hybrid Cheese blocks when ordering 5 or more Master Cases for your pizzeria or cloud kitchen network.",
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
    description:
      "Purchase 4 Heavy-Duty 5 Kg Buckets of Veeba White Garlic or Tandoori Mayonnaise and get 2 Chef Special 1 Kg Pizza & Pasta Sauce spout pouches absolutely free.",
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
    description:
      "Special institutional pricing for hotel catering directors and wedding caterers. Stock up on Makhani & Cashew gravy bases for 500+ guest banquets.",
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
    description:
      "New restaurants, QSR chains, and hotels registering their first wholesale cold-chain supply order of ₹25,000+ with SG Trading Company receive a flat ₹1,000 instant invoice discount + dedicated account coordinator.",
    minOrderRequirement: "First Order of ₹25,000+",
    estimatedSavings: "₹1,000 Instant Invoice Discount",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=85",
  },
];

export default function CurrentOffersPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Live Offers");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [monthlySpend, setMonthlySpend] = useState<number>(75000);

  // Loyalty calculations: Every ₹100 spent = 1 point + 250 First-Time Customer Welcome Bonus
  const earnedPoints = Math.floor(monthlySpend / 100);
  const annualPoints = earnedPoints * 12 + 250;
  const unlockedTier =
    annualPoints >= 3000
      ? "Platinum Institutional"
      : annualPoints >= 1000
      ? "Gold Executive"
      : "Silver Chef";
  const freeCartonsPerYear = Math.floor(annualPoints / 1000);
  const yearlyBenefitValue = freeCartonsPerYear * 1520 + 1000;

  const categories = [
    "All Live Offers",
    "Credit Card Cashback Offers",
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
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* INTERACTIVE LOYALTY POINTS & REWARD INCENTIVE CALCULATOR */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8">
        <div className="p-8 rounded-3xl bg-white border-2 border-amber-500/60 shadow-lg space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono-spec font-black uppercase">
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                <span>SG COLD-CHAIN CHEF REWARDS &amp; VIP INCENTIVE POINT SYSTEM</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                More Purchase • More Points • Free Commercial Master Cases &amp; Gifts
              </h2>
              <p className="text-xs md:text-sm text-slate-700">
                Every <strong className="text-amber-800">₹100 spent = 1 SG Wholesale Loyalty Point</strong>. First-time customers get <strong className="text-emerald-700">+250 Instant Welcome Points</strong> + Flat ₹1,000 invoice credit on their first order of ₹25,000+.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono-spec text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold">
                🥉 Silver (0-1K)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold">
                🥈 Gold (1K-3K)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
                🥇 Platinum (3K+)
              </span>
            </div>
          </div>

          {/* Interactive Points Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center justify-between font-mono-spec text-xs">
                <span className="text-slate-700 uppercase font-bold">Estimated Monthly Spend:</span>
                <span className="text-lg font-black text-amber-800">
                  ₹{monthlySpend.toLocaleString("en-IN")} / month
                </span>
              </div>

              <input
                type="range"
                min={25000}
                max={500000}
                step={5000}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-mono-spec text-slate-500">
                <span>₹25,000/mo</span>
                <span>₹2.5 Lakh/mo</span>
                <span>₹5 Lakh/mo</span>
              </div>
            </div>

            {/* Calculated Results HUD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:col-span-2 font-mono-spec">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-[10px] text-slate-600 uppercase block font-bold">Monthly Points</span>
                <span className="text-2xl font-black text-amber-800">{earnedPoints.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block mt-1">+250 Welcome Bonus</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-[10px] text-slate-600 uppercase block font-bold">Annual Points</span>
                <span className="text-2xl font-black text-slate-900">{annualPoints.toLocaleString()}</span>
                <span className="text-[10px] text-amber-800 block mt-1">Tier: {unlockedTier}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-[10px] text-slate-600 uppercase block font-bold">Free Master Cases / Yr</span>
                <span className="text-2xl font-black text-emerald-700">{freeCartonsPerYear} Cases</span>
                <span className="text-[10px] text-slate-700 block mt-1">McCain / Britannia Free</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-[10px] text-slate-600 uppercase block font-bold">Est. Yearly Benefit</span>
                <span className="text-2xl font-black text-amber-800">₹{yearlyBenefitValue.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block mt-1">+ GST Input Savings</span>
              </div>
            </div>
          </div>

          {/* Redeem Reward Catalog Row */}
          <div className="pt-4 border-t border-slate-200">
            <span className="text-xs font-mono-spec font-black uppercase text-amber-800 block mb-3">
              CHEF REWARDS REDEMPTION STORE (REDEEM POINTS FOR FREE PRODUCTS &amp; GIFTS):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-spec text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-black text-[10px]">
                    250 POINTS
                  </span>
                  <Gift className="w-4 h-4 text-amber-700" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Free 1 Kg Pack McCain Fries or Veeba Mayo</h4>
                <p className="text-[11px] text-slate-600">Earned immediately upon first order of ₹25,000+.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-black text-[10px]">
                    500 POINTS
                  </span>
                  <Gift className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Commercial Chef Knife Kit OR Flat ₹750 Invoice Credit</h4>
                <p className="text-[11px] text-slate-600">Redeemable on next Mayur Vihar cold room order.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-black text-[10px]">
                    1,000 POINTS
                  </span>
                  <Gift className="w-4 h-4 text-amber-700" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Free 1 Full Master Case McCain 9mm Fries (10 Kg)</h4>
                <p className="text-[11px] text-slate-600">Worth ₹1,520 + Digital Commercial Kitchen Scale.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-black text-[10px]">
                    2,500 POINTS
                  </span>
                  <Gift className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Commercial Heavy-Duty Induction Unit OR ₹4,000 Discount</h4>
                <p className="text-[11px] text-slate-600">Platinum VIP Institutional Perk + Free Delivery.</p>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-slate-200 mt-6">
            <span className="text-xs font-mono-spec text-slate-600 uppercase font-bold mr-2">
              Filter Promotions:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-spec font-bold transition-all cursor-pointer border ${
                  selectedFilter === cat
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20"
                    : "bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Grid Section */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.id}
                className="group rounded-3xl bg-white text-slate-900 border-2 border-slate-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Image & Badge Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img
                      src={deal.imageUrl}
                      alt={deal.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Deal Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg z-10">
                      {deal.discountBadge}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
                  </div>

                  {/* Deal Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono-spec">
                      <span className="text-amber-700 font-bold uppercase">{deal.brand}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Snowflake className="w-3.5 h-3.5" /> -18°C Ready
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                      {deal.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {deal.description}
                    </p>

                    {/* Requirements & Savings Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono-spec text-xs">
                      <div className="flex items-center justify-between text-slate-700">
                        <span>Min Requirement:</span>
                        <strong className="text-slate-900">{deal.minOrderRequirement}</strong>
                      </div>
                      <div className="flex items-center justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                        <span>Estimated Value:</span>
                        <span>{deal.estimatedSavings}</span>
                      </div>
                    </div>

                    {/* Promo Code Box */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200">
                      <div>
                        <span className="text-[10px] font-mono-spec text-slate-500 block uppercase font-bold">
                          Official Promo Code:
                        </span>
                        <span className="text-sm font-mono-spec font-black text-amber-700 tracking-wider">
                          {deal.code}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(deal.code)}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-mono-spec font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
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

                  <p className="text-[10px] text-center text-slate-500 font-mono-spec">
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
        <div className="p-8 md:p-12 rounded-3xl bg-white border-2 border-amber-500/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono-spec font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>CUSTOM WHOLESALE INSTITUTIONAL CONTRACTS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Need Annual Institutional Contract Pricing for 50+ Hotel &amp; QSR Outlets?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
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
