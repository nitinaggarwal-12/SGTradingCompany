"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import {
  Sparkles,
  ArrowLeft,
  Flame,
  Snowflake,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Bell,
  Send,
  Building2,
  Clock,
  ChevronRight,
  ThumbsUp,
  Award,
} from "lucide-react";

interface UpcomingProduct {
  id: string;
  brand: string;
  brandCategory: "Frozen Potato & Snacks" | "Frozen Meat & Delights" | "Commercial Sauces & Puree" | "Bulk Institutional Dairy";
  name: string;
  packSize: string;
  teaserImage: string;
  expectedLaunch: string;
  estimatedWholesalePrice: string;
  description: string;
  chefBenefit: string;
  eoiCount: number;
  featured?: boolean;
}

const UPCOMING_PRODUCTS: UpcomingProduct[] = [
  {
    id: "hyfun-super-fries",
    brand: "HyFun Foods",
    brandCategory: "Frozen Potato & Snacks",
    name: "HyFun Super Crispy 9mm Shoestring Fries",
    packSize: "4 x 2.5 Kg Master Carton (10 Kg)",
    teaserImage: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹345 / 2.5 Kg Pack (Special Agency Launch Rate)",
    description: "Ultra-crispy European-grade potato cut with 30-minute heat lamp texture hold. Engineered for high-throughput cloud kitchens & QSR burger outlets.",
    chefBenefit: "18% lower oil absorption & 35-minute crunch hold for delivery orders.",
    eoiCount: 142,
    featured: true,
  },
  {
    id: "hyfun-hash-browns",
    brand: "HyFun Foods",
    brandCategory: "Frozen Potato & Snacks",
    name: "HyFun Golden Hash Brown Triangular Patties",
    packSize: "6 x 1.5 Kg Commercial Carton",
    teaserImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹360 / 1.5 Kg Pack",
    description: "Grated seasoned potato hash brown patties ideal for hotel breakfast buffets, QSR morning burgers, and continental cafes.",
    chefBenefit: "Uniform portion control & zero shatter in commercial fryers.",
    eoiCount: 98,
  },
  {
    id: "godrej-yummiez-nuggets",
    brand: "Godrej Yummiez",
    brandCategory: "Frozen Meat & Delights",
    name: "Godrej Yummiez Crispy Chicken Nuggets (HORECA Pack)",
    packSize: "10 x 1 Kg Commercial Carton",
    teaserImage: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹390 / 1 Kg Pack",
    description: "100% tender breast meat chicken nuggets with golden cornflake & herb breading. Fast 3-minute fry time from frozen state.",
    chefBenefit: "FSSAI certified tender meat with zero artificial preservatives.",
    eoiCount: 165,
    featured: true,
  },
  {
    id: "godrej-yummiez-sausages",
    brand: "Godrej Yummiez",
    brandCategory: "Frozen Meat & Delights",
    name: "Godrej Yummiez Smoked Chicken Breakfast Sausages",
    packSize: "10 x 1 Kg Institutional Pack",
    teaserImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q4 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹420 / 1 Kg Pack",
    description: "Hickory-smoked chicken breakfast sausages tailored for 4-star & 5-star hotel buffets, live grill stations, and brunch menus.",
    chefBenefit: "Juicy casing snap & zero shrink on commercial griddles.",
    eoiCount: 114,
  },
  {
    id: "dabur-tomato-puree-commercial",
    brand: "Dabur Hommade Commercial",
    brandCategory: "Commercial Sauces & Puree",
    name: "Dabur Hommade Heavy Tomato Puree (Commercial Tin)",
    packSize: "6 x 3.1 Kg Commercial Tin / Pouch",
    teaserImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • General Trade & HORECA Hub",
    estimatedWholesalePrice: "₹240 / 3.1 Kg Tin",
    description: "Rich 28-30% Brix concentrated tomato puree for Indian Makhani gravy bases, Italian pizza tomato sauce, and soup kettles.",
    chefBenefit: "Replaces 12 Kg fresh tomatoes with zero skin/seed straining work.",
    eoiCount: 189,
    featured: true,
  },
  {
    id: "amul-bulk-mozzarella",
    brand: "Amul Institutional Dairy",
    brandCategory: "Bulk Institutional Dairy",
    name: "Amul Diced Pizza Cheese (Bulk Institutional Blocks)",
    packSize: "4 x 2.5 Kg Master Carton",
    teaserImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q4 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹460 / Kg (Wholesale Tier Rate)",
    description: "High-melt authentic Indian dairy Mozzarella & Cheddar cheese blend engineered for 300°C conveyor pizza ovens and cheesy garlic breads.",
    chefBenefit: "Golden blister browning & long elastic stretch without oiling off.",
    eoiCount: 210,
    featured: true,
  },
  {
    id: "chatha-peri-peri-strips",
    brand: "Chatha Foods Commercial",
    brandCategory: "Frozen Meat & Delights",
    name: "Chatha Foods Pre-Cooked Peri-Peri & Shawarma Chicken Strips",
    packSize: "10 x 1 Kg Frozen Kitchen Pack",
    teaserImage: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹385 / 1 Kg Pack",
    description: "Fully cooked flame-seared Peri-Peri & Arabic Shawarma chicken strips. Ready to toss into rolls, bowls, and pizzas with zero raw meat prep.",
    chefBenefit: "Reduces wrap & shawarma kitchen assembly time from 15 mins to 2 mins.",
    eoiCount: 176,
    featured: true,
  },
  {
    id: "itc-retort-makhani-gravy",
    brand: "ITC Master Chef Retort",
    brandCategory: "Commercial Sauces & Puree",
    name: "ITC Master Chef Commercial Makhani & Cashew Gravy Base",
    packSize: "8 x 2.5 Kg Retort Institutional Pouch",
    teaserImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Phase-3 Hub",
    estimatedWholesalePrice: "₹290 / 2.5 Kg Pack",
    description: "Master chef formulated butter chicken & paneer makhani gravy base with zero artificial colors. High shelf-life ambient retort pouch.",
    chefBenefit: "Guarantees 100% consistent gravy taste across 500+ guest hotel banquets.",
    eoiCount: 194,
    featured: true,
  },
  {
    id: "britannia-70-30-pizza-blend",
    brand: "Britannia Commercial Cheese",
    brandCategory: "Bulk Institutional Dairy",
    name: "Britannia 70:30 Hybrid Mozzarella-Cheddar Pizza Stretch Blend",
    packSize: "4 x 2.5 Kg Master Carton",
    teaserImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q4 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹480 / Kg Wholesale Rate",
    description: "Engineered 70% Mozzarella & 30% Aged Processed Cheddar blend designed for delivery pizzas that stay melty & cheesy even after 35 minutes in transit.",
    chefBenefit: "Superior stretch + rich cheddar aroma with zero liquid separation.",
    eoiCount: 228,
    featured: true,
  },
  {
    id: "sleepy-owl-rtd-canned-coldbrew",
    brand: "Sleepy Owl GT Beverage",
    brandCategory: "Commercial Sauces & Puree",
    name: "Sleepy Owl Ready-to-Drink Canned Cold Brew & Hazelnut Latte",
    packSize: "Case of 24 x 200ml Aluminium Cans",
    teaserImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • General Trade (GT) Hub",
    estimatedWholesalePrice: "₹1,440 / Case of 24 Cans (₹60 / Can)",
    description: "High-margin impulse cold brew & iced latte cans for modern kiranas, cafes, and office pantries across Mayur Vihar & Delhi NCR.",
    chefBenefit: "Delivers 25% retail margin per can with 9-month shelf life.",
    eoiCount: 153,
    featured: true,
  },
  {
    id: "veeba-white-garlic-mayo-5kg",
    brand: "Veeba Food Services",
    brandCategory: "Commercial Sauces & Puree",
    name: "Veeba Commercial White Garlic & Tandoori Mayonnaise Bucket",
    packSize: "5 Kg Commercial Heavy-Duty Pail",
    teaserImage: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Phase-3 Hub",
    estimatedWholesalePrice: "₹680 / 5 Kg Bucket",
    description: "Velvety heat-stable white garlic & eggless tandoori mayo pails engineered for rolls, momos, shawarmas, and burger finishing.",
    chefBenefit: "Zero emulsion separation even when spread on sizzling griddle wraps.",
    eoiCount: 204,
    featured: true,
  },
  {
    id: "iscon-balaji-super-crunch-fries",
    brand: "Iscon Balaji Frozen",
    brandCategory: "Frozen Potato & Snacks",
    name: "Iscon Balaji 9mm Coated Super-Crunch Shoestring Fries",
    packSize: "4 x 2.5 Kg Master Carton (10 Kg)",
    teaserImage: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=85",
    expectedLaunch: "Q3 2026 • Mayur Vihar Cold Room 1",
    estimatedWholesalePrice: "₹340 / 2.5 Kg Pack (₹1,360 / Master Case)",
    description: "High-yield Indian-grown coated potato fries with 25-minute delivery crunch retention at ₹40 lower per pack cost.",
    chefBenefit: "Increases cloud kitchen net margin per fry basket by 14%.",
    eoiCount: 188,
    featured: true,
  },
];

export default function ComingSoonLaunchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Upcoming Agencies");
  const [selectedProductForEOI, setSelectedProductForEOI] = useState<UpcomingProduct | null>(null);
  const [eoiSubmittedProducts, setEoiSubmittedProducts] = useState<string[]>([]);

  // Form State
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyCases, setMonthlyCases] = useState("10 - 25 Master Cases / month");

  const filteredProducts =
    selectedCategory === "All Upcoming Agencies"
      ? UPCOMING_PRODUCTS
      : UPCOMING_PRODUCTS.filter((p) => p.brand === selectedCategory);

  const handleOpenEOIModal = (product: UpcomingProduct) => {
    setSelectedProductForEOI(product);
  };

  const handleSubmitEOI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForEOI) return;

    if (!eoiSubmittedProducts.includes(selectedProductForEOI.id)) {
      setEoiSubmittedProducts([...eoiSubmittedProducts, selectedProductForEOI.id]);
    }

    const text = encodeURIComponent(
      `*EXPRESSION OF INTEREST (EOI) - UPCOMING BRAND LAUNCH*\n` +
      `Product: ${selectedProductForEOI.name} (${selectedProductForEOI.brand})\n` +
      `Customer / Hotel: ${businessName}\n` +
      `Contact: ${contactName} (${phone})\n` +
      `Expected Monthly Requirement: ${monthlyCases}\n\n` +
      `Please reserve priority allocation for SG Trading Company Mayur Vihar Phase-3 launch!`
    );

    window.open(`https://wa.me/919667731355?text=${text}`, "_blank");
    setSelectedProductForEOI(null);
    setBusinessName("");
    setContactName("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-[#060911] text-white font-sans selection:bg-amber-500 selection:text-slate-950">
      <StickyHeader
        onSelectCategory={() => {}}
        onScrollToCatalog={() => {}}
      />

      {/* TOP LAUNCH RADAR HERO */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#0A0F1D] via-[#060911] to-[#060911]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono-spec font-black uppercase tracking-widest shadow-lg shadow-amber-500/10">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>EXCLUSIVE LAUNCH RADAR • NEW AUTHORIZED AGENCIES PIPELINE</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Be First in Line for India&apos;s Next{" "}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  High-Demand HORECA &amp; GT Brands.
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Based on our Mayur Vihar Phase-3 Market Intelligence data, <strong className="text-white">SG Trading Company</strong> is actively onboarding <strong className="text-amber-400">HyFun Foods, Godrej Yummiez, Dabur Commercial, and Amul Institutional Dairy</strong>. Register your Expression of Interest (EOI) below to lock in launch-day wholesale rates and guaranteed freezer allocation.
              </p>
            </div>

            {/* Live Early Allocation Metrics Counter */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/60 shadow-2xl space-y-3 shrink-0 md:w-80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-spec text-amber-400 font-black uppercase">
                  EARLY ALLOCATION QUEUE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-3xl font-black text-white font-mono-spec">
                418+ HORECA Buyers
              </div>
              <p className="text-xs text-slate-300">
                Hotels, QSRs &amp; Kiranas registered across Delhi NCR for priority launch stock.
              </p>
            </div>
          </div>

          {/* Agency Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono-spec text-slate-400 uppercase font-bold mr-2">
              Filter Upcoming Agencies:
            </span>
            {[
              "All Upcoming Agencies",
              "HyFun Foods",
              "Godrej Yummiez",
              "Dabur Hommade Commercial",
              "Amul Institutional Dairy",
              "Chatha Foods Commercial",
              "ITC Master Chef Retort",
              "Britannia Commercial Cheese",
              "Sleepy Owl GT Beverage",
              "Veeba Food Services",
              "Iscon Balaji Frozen",
            ].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedCategory(brand)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-spec font-bold transition-all cursor-pointer border ${
                  selectedCategory === brand
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SNEAK PEEK PRODUCT GRID */}
      <section className="py-16 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Upcoming Authorized Commercial SKUs (Teaser Showcase)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click &quot;Register Expression of Interest (EOI)&quot; on any item to reserve your kitchen or retail store allocation.
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-mono-spec font-bold border border-emerald-500/30">
            100% UNBROKEN -18°C COLD-CHAIN LAUNCH READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const hasRegistered = eoiSubmittedProducts.includes(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-[#0B101D] text-white border-2 border-slate-800 hover:border-amber-500/80 overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Visual Teaser Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={product.teaserImage}
                      alt={product.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg z-10">
                      {product.brand}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-950/90 text-cyan-400 border border-cyan-500/40 text-xs font-mono-spec font-bold flex items-center gap-1 z-10">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{product.expectedLaunch}</span>
                    </div>

                    {/* Bottom Blur Overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B101D] to-transparent z-10" />
                  </div>

                  {/* Content Details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono-spec uppercase text-amber-400 font-bold block">
                        {product.packSize}
                      </span>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Chef Commercial Benefit Pill */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 font-mono-spec text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Executive Chef Advantage:</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug">
                        {product.chefBenefit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono-spec">
                      <span className="text-slate-400">Target Rate:</span>
                      <span className="text-amber-400 font-black">
                        {product.estimatedWholesalePrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 pt-0 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono-spec text-slate-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                      <span><strong>{product.eoiCount + (hasRegistered ? 1 : 0)}</strong> Chefs Interested</span>
                    </span>
                    <span className="text-emerald-400 font-bold">Priority Tier Open</span>
                  </div>

                  <button
                    onClick={() => handleOpenEOIModal(product)}
                    className={`w-full py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      hasRegistered
                        ? "bg-emerald-600 text-white border border-emerald-400"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>
                      {hasRegistered
                        ? "✅ EOI Registered • Click to Submit Another"
                        : "Register Expression of Interest (EOI) →"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPRESSION OF INTEREST (EOI) MODAL */}
      {selectedProductForEOI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-amber-500/80 shadow-2xl p-6 md:p-8 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono-spec font-black text-amber-400 uppercase tracking-wider block">
                  PRIORITY ALLOCATION RESERVATION
                </span>
                <h3 className="text-lg font-black text-white">
                  Expression of Interest (EOI)
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductForEOI(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase block">
                {selectedProductForEOI.brand} • {selectedProductForEOI.expectedLaunch}
              </span>
              <h4 className="text-base font-black text-white">
                {selectedProductForEOI.name}
              </h4>
              <p className="text-xs text-slate-300">
                {selectedProductForEOI.packSize} • Est. Rate: {selectedProductForEOI.estimatedWholesalePrice}
              </p>
            </div>

            <form onSubmit={handleSubmitEOI} className="space-y-4 text-xs font-mono-spec">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  Hotel / Restaurant / Store Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radisson Blu / Burger Singh / Cloud Kitchen"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Executive Chef / Manager"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 96677 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  Expected Monthly Case Requirement
                </label>
                <select
                  value={monthlyCases}
                  onChange={(e) => setMonthlyCases(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="5 - 10 Master Cases / month">5 - 10 Master Cases / month</option>
                  <option value="10 - 25 Master Cases / month">10 - 25 Master Cases / month (Tier 1 Discount)</option>
                  <option value="25 - 50 Master Cases / month">25 - 50 Master Cases / month (Tier 2 Wholesale)</option>
                  <option value="50+ Master Cases / month">50+ Master Cases / month (Institutional Corporate Contract)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Expression of Interest via WhatsApp →</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
