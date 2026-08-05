"use client";

import React from "react";
import { Award, ShieldCheck, Sparkles, Snowflake, CheckCircle2 } from "lucide-react";

interface BrandSku {
  skuName: string;
  packWeight: string;
  wholesaleCartonPrice: number;
  perUnitRate: string;
  moqCartons: number;
  tempClass: string;
}

interface BrandItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  logoUrl: string;
  logoAccent: string;
  segment: string;
  skus: BrandSku[];
}

const BRANDS: BrandItem[] = [
  {
    id: "mccain",
    name: "McCAIN FOOD SERVICE",
    subtitle: "HORECA Commercial Fry",
    tag: "9mm French Fries & Potato Cheese Balls",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    logoUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🍟",
    segment: "HORECA FROZEN",
    skus: [
      {
        skuName: "McCain 9mm Commercial French Fries (2.5 Kg x 4 Master Case)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 1520,
        perUnitRate: "₹380 / 2.5 Kg Pack",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
      {
        skuName: "McCain Creamy Potato Cheese Balls (1 Kg x 10 Master Case)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 3400,
        perUnitRate: "₹340 / 1 Kg Pack",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
    ],
  },
  {
    id: "itc",
    name: "ITC MASTER CHEF",
    subtitle: "HORECA Foodservice",
    tag: "Frozen Foods & Chef Retort Gravy Bases",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    logoUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=80",
    logoAccent: "👨‍🍳",
    segment: "HORECA FROZEN",
    skus: [
      {
        skuName: "ITC Master Chef Crispy Chicken Nuggets (1 Kg x 10 Case)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 3800,
        perUnitRate: "₹380 / 1 Kg Pack",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
      {
        skuName: "ITC Master Chef Commercial Makhani Gravy Base (2.5 Kg x 8)",
        packWeight: "20 Kg Master Retort Case",
        wholesaleCartonPrice: 2320,
        perUnitRate: "₹290 / 2.5 Kg Pack",
        moqCartons: 1,
        tempClass: "Ambient Retort",
      },
    ],
  },
  {
    id: "veeba",
    name: "VEEBA FOOD SERVICES",
    subtitle: "HORECA Sauces & Mayo",
    tag: "Eggless Mayo, Sauces & Spout Dressings",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/40",
    logoUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🥗",
    segment: "HORECA SAUCES",
    skus: [
      {
        skuName: "Veeba Commercial White Garlic Mayonnaise Bucket (5 Kg Pail)",
        packWeight: "5 Kg Commercial Pail",
        wholesaleCartonPrice: 680,
        perUnitRate: "₹136 / Kg",
        moqCartons: 1,
        tempClass: "Chilled / Ambient",
      },
      {
        skuName: "Veeba Chef Special Pizza & Pasta Sauce (1 Kg Spout x 10 Case)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 1650,
        perUnitRate: "₹165 / 1 Kg Pack",
        moqCartons: 1,
        tempClass: "Ambient",
      },
    ],
  },
  {
    id: "britannia",
    name: "BRITANNIA CHEESE",
    subtitle: "HORECA Institutional",
    tag: "Commercial Cheese Slices & Diced Mozzarella",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    logoUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🧀",
    segment: "HORECA DAIRY",
    skus: [
      {
        skuName: "Britannia Diced Mozzarella Pizza Cheese (2.5 Kg x 4 Master Case)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 4700,
        perUnitRate: "₹470 / Kg",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
      {
        skuName: "Britannia Commercial Cheeswich 51 Burger Slices (750g x 12)",
        packWeight: "9 Kg Master Case",
        wholesaleCartonPrice: 4200,
        perUnitRate: "₹350 / 51 Slices",
        moqCartons: 1,
        tempClass: "Chilled Dairy (+4°C)",
      },
    ],
  },
  {
    id: "iscon",
    name: "ISCON BALAJI FOODS",
    subtitle: "HORECA Export Fry",
    tag: "Shoestring French Fries & Peri Peri Seasoned",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    logoUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🌶️",
    segment: "HORECA FROZEN",
    skus: [
      {
        skuName: "Iscon Balaji 9mm Coated Super-Crunch Shoestring Fries (2.5 Kg x 4)",
        packWeight: "10 Kg Master Carton",
        wholesaleCartonPrice: 1360,
        perUnitRate: "₹340 / 2.5 Kg Pack",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
    ],
  },
  {
    id: "godiced",
    name: "GO DICED CHEESE",
    subtitle: "Parag Milk Foods",
    tag: "Commercial Woodfired Diced Pizza Cheese",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    logoUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🍕",
    segment: "HORECA DAIRY",
    skus: [
      {
        skuName: "Go Diced Mozzarella & Cheddar Pizza Blend (2 Kg x 6 Master Case)",
        packWeight: "12 Kg Master Carton",
        wholesaleCartonPrice: 5400,
        perUnitRate: "₹450 / Kg",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
    ],
  },
  {
    id: "chatha",
    name: "CHATHA FOODS",
    subtitle: "HACCP Certified Non-Veg",
    tag: "Smoked Chicken Sausages, Frankfurters & Patties",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    logoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🍗",
    segment: "HORECA MEAT",
    skus: [
      {
        skuName: "Chatha Foods Pre-Cooked Peri-Peri & Shawarma Chicken Strips (1 Kg x 10)",
        packWeight: "10 Kg Master Case",
        wholesaleCartonPrice: 3850,
        perUnitRate: "₹385 / 1 Kg Pack",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
    ],
  },
  {
    id: "milkana",
    name: "MILKANA PROFESSIONAL",
    subtitle: "HORECA Chef Dairy",
    tag: "European Recipe Diced Mozzarella Crate",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    logoUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🥛",
    segment: "HORECA DAIRY",
    skus: [
      {
        skuName: "Milkana Chef European Recipe Diced Cheese Blend (2.5 Kg x 4)",
        packWeight: "10 Kg Master Case",
        wholesaleCartonPrice: 4400,
        perUnitRate: "₹440 / Kg",
        moqCartons: 1,
        tempClass: "-18°C Deep Frozen",
      },
    ],
  },
  {
    id: "anoop",
    name: "ANOOP SATTU",
    subtitle: "General Trade (GT)",
    tag: "100% Pure Roasted Chana Sattu Wholesale",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    logoUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🌾",
    segment: "GT RETAIL",
    skus: [
      {
        skuName: "Anoop 100% Pure Roasted Chana Sattu (500g Pack x 20 Wholesale Case)",
        packWeight: "10 Kg Wholesale Carton",
        wholesaleCartonPrice: 1900,
        perUnitRate: "₹95 / 500g Pack",
        moqCartons: 1,
        tempClass: "Ambient GT",
      },
    ],
  },
  {
    id: "ocean",
    name: "OCEAN WATER",
    subtitle: "General Trade (GT)",
    tag: "Fruit Water & Flavoured Hydration Cartons",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    logoUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=200&q=80",
    logoAccent: "💧",
    segment: "GT BEVERAGE",
    skus: [
      {
        skuName: "Ocean Fruit Water Flavoured Hydration PET Bottles (500ml x 24 Case)",
        packWeight: "12 Liter Case",
        wholesaleCartonPrice: 960,
        perUnitRate: "₹40 / Bottle",
        moqCartons: 1,
        tempClass: "Ambient GT",
      },
    ],
  },
  {
    id: "sleepyowl",
    name: "SLEEPY OWL COFFEE",
    subtitle: "General Trade (GT)",
    tag: "100% Arabica Instant & Cold Brew Bottles",
    badgeColor: "bg-amber-600/20 text-amber-300 border-amber-600/40",
    logoUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=200&q=80",
    logoAccent: "☕",
    segment: "GT BEVERAGE",
    skus: [
      {
        skuName: "Sleepy Owl Ready-to-Drink Canned Cold Brew & Hazelnut Latte (Case of 24)",
        packWeight: "4.8 Liter Case",
        wholesaleCartonPrice: 1440,
        perUnitRate: "₹60 / Can",
        moqCartons: 1,
        tempClass: "Ambient GT",
      },
    ],
  },
  {
    id: "loyka",
    name: "LOYKA GOURMET",
    subtitle: "General Trade (GT)",
    tag: "Original Almond Brittle Gift Boxes",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    logoUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=200&q=80",
    logoAccent: "🍫",
    segment: "GT CONFECTION",
    skus: [
      {
        skuName: "Loyka Original Roasted Almond Brittle Luxury Gift Box (Case of 12)",
        packWeight: "12 Box Wholesale Carton",
        wholesaleCartonPrice: 2400,
        perUnitRate: "₹200 / Box",
        moqCartons: 1,
        tempClass: "Ambient GT",
      },
    ],
  },
];

export const BrandTicker: React.FC = () => {
  const [selectedBrandModal, setSelectedBrandModal] = React.useState<BrandItem | null>(null);
  const [cartAddedSkuId, setCartAddedSkuId] = React.useState<string | null>(null);
  const [skuQuantities, setSkuQuantities] = React.useState<Record<string, number>>({});

  // Seamless loop by duplicating the 12 brands twice
  const marqueeItems = [...BRANDS, ...BRANDS];

  const getQuantity = (skuName: string) => skuQuantities[skuName] ?? 1;

  const updateQuantity = (skuName: string, delta: number) => {
    setSkuQuantities((prev) => {
      const current = prev[skuName] ?? 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [skuName]: next };
    });
  };

  const handleAddSkuToCart = (brand: BrandItem, sku: BrandSku) => {
    const qty = getQuantity(sku.skuName);
    setCartAddedSkuId(`${sku.skuName} (${qty} Cartons)`);
    setTimeout(() => setCartAddedSkuId(null), 2500);
  };

  return (
    <section className="w-full bg-slate-950 border-y border-slate-800/80 py-7 overflow-hidden relative">
      {/* Custom Keyframes for Continuous Smooth Rotation */}
      <style jsx>{`
        @keyframes brandMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-brand-marquee {
          display: flex;
          width: max-content;
          animation: brandMarquee 65s linear infinite;
        }
        .animate-brand-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono-spec font-black uppercase tracking-wider text-amber-400">
            OFFICIAL AUTHORIZED DISTRIBUTOR AGENCIES (12 BRANDS) • HOVER TILE FOR COMMERCIAL SKUS, QUANTITY &amp; PRICING
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono-spec flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hover brand card to adjust quantities &amp; add to cart • SG Trading Company</span>
        </span>
      </div>

      {/* Edge Soft Fades for Seamless Infinite Carousel Aesthetics */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      {/* Gradually Rotating Infinite Brand Carousel */}
      <div className="overflow-hidden w-full">
        <div className="animate-brand-marquee gap-4 py-1">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              onMouseEnter={() => setSelectedBrandModal(brand)}
              className="industrial-card w-72 shrink-0 rounded-2xl p-4 border border-slate-800 hover:border-amber-400 bg-slate-900/95 transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-amber-500/25 group flex flex-col justify-between cursor-pointer relative"
            >
              {/* Pop-Out Top Spotlight Badge on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] font-mono-spec font-black uppercase tracking-wider shadow-md whitespace-nowrap z-20">
                ⭐ HOVERED • COMMERCIAL SKUS &amp; ADD TO CART
              </div>

              {/* Top Row: Segment Badge & Official Checkmark */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-mono-spec font-black uppercase ${brand.badgeColor}`}
                >
                  {brand.segment}
                </span>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-mono-spec">
                  <span>{brand.logoAccent}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Middle Row: Official Brand Agency Logo & Name */}
              <div className="my-1.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-slate-700 group-hover:border-amber-400 shrink-0 bg-slate-950 shadow-md group-hover:scale-110 transition-all duration-300">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors tracking-tight truncate">
                    {brand.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
                    {brand.tag}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Authorized Distributor Tag & Action Hint */}
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-spec text-slate-400">
                <span className="group-hover:text-amber-400 font-bold transition-colors">🛒 VIEW {brand.skus.length} COMMERCIAL SKUS</span>
                <span className="text-emerald-400 font-bold">100% FACTORY SEALED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BRAND COMMERCIAL PRODUCT DETAIL & ADD-TO-CART MODAL */}
      {selectedBrandModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none transition-all duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setSelectedBrandModal(null)}
            className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-amber-500 shadow-2xl p-6 md:p-8 space-y-6"
            style={{ backgroundColor: "#FFFFFF", color: "#0F172A" }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500 shrink-0 bg-slate-100 shadow-lg">
                  <img
                    src={selectedBrandModal.logoUrl}
                    alt={selectedBrandModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono-spec font-black uppercase">
                      OFFICIAL AUTHORIZED FACTORY DISTRIBUTOR
                    </span>
                    <span className="text-xs text-emerald-700 font-mono-spec font-bold">
                      ● MAYUR VIHAR COLD ROOM 1 READY
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-black mt-1"
                    style={{ color: "#0F172A" }}
                  >
                    {selectedBrandModal.name}
                  </h3>
                  <p className="text-xs font-mono-spec mt-0.5" style={{ color: "#475569" }}>
                    {selectedBrandModal.tag} • GSTIN:{" "}
                    <strong style={{ color: "#D97706" }}>07ADQFS8839Q1ZQ</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBrandModal(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Commercial Master Case SKU List with Add to Cart Buttons */}
            <div className="space-y-4">
              <span className="text-xs font-mono-spec font-black uppercase block" style={{ color: "#D97706" }}>
                AUTHORIZED WHOLESALE MASTER CASE SKUS ({selectedBrandModal.skus.length} AVAILABLE):
              </span>

              {selectedBrandModal.skus.map((sku) => {
                const qty = getQuantity(sku.skuName);
                const totalPrice = sku.wholesaleCartonPrice * qty;
                const isAdded = cartAddedSkuId?.startsWith(sku.skuName);

                return (
                  <div
                    key={sku.skuName}
                    className="p-4 rounded-2xl border-2 border-slate-200 transition-all space-y-3"
                    style={{ backgroundColor: "#F8FAFC", color: "#0F172A" }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-mono-spec font-bold">
                            {sku.tempClass}
                          </span>
                          <span className="text-xs font-mono-spec font-bold" style={{ color: "#0F172A" }}>
                            {sku.packWeight}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold" style={{ color: "#0F172A" }}>
                          {sku.skuName}
                        </h4>
                        <p className="text-xs font-mono-spec mt-0.5" style={{ color: "#475569" }}>
                          Unit Rate Breakdown: <strong style={{ color: "#D97706" }}>{sku.perUnitRate}</strong>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono-spec uppercase block font-bold" style={{ color: "#475569" }}>
                          Wholesale Rate / Carton
                        </span>
                        <span className="text-lg font-black font-mono-spec" style={{ color: "#D97706" }}>
                          ₹{sku.wholesaleCartonPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Live Calculated Total Price Selector */}
                    <div className="p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3" style={{ backgroundColor: "#FFFFFF" }}>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-spec font-bold" style={{ color: "#0F172A" }}>
                          Select Quantity (Cartons):
                        </span>
                        <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden font-mono-spec">
                          <button
                            onClick={() => updateQuantity(sku.skuName, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 font-black rounded-l-lg cursor-pointer"
                            style={{ color: "#0F172A" }}
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-mono-spec font-black text-sm" style={{ color: "#0F172A" }}>
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(sku.skuName, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 font-black rounded-r-lg cursor-pointer"
                            style={{ color: "#0F172A" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right font-mono-spec">
                        <span className="text-[10px] uppercase block font-bold" style={{ color: "#475569" }}>
                          Total Price ({qty} {qty === 1 ? "Carton" : "Cartons"}):
                        </span>
                        <span className="text-xl font-black" style={{ color: "#059669" }}>
                          ₹{totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-mono-spec font-bold" style={{ color: "#059669" }}>
                        ✓ 100% Factory Sealed • Full GST Input Tax Credit
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Hello SG Trading Company! I would like to order ${qty} Master Case(s) of: ${sku.skuName} @ Total ₹${totalPrice.toLocaleString("en-IN")}. Please arrange refrigerated delivery from Mayur Vihar Phase-3.`
                            );
                            window.open(`https://wa.me/919667731355?text=${text}`, "_blank");
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-mono-spec font-bold text-xs cursor-pointer"
                          style={{ color: "#0F172A" }}
                        >
                          WhatsApp Quote
                        </button>

                        <button
                          onClick={() => handleAddSkuToCart(selectedBrandModal, sku)}
                          className={`px-5 py-2.5 rounded-xl font-mono-spec font-black text-xs transition-all cursor-pointer shadow-md ${
                            isAdded
                              ? "bg-emerald-600 text-white shadow-emerald-500/20"
                              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20"
                          }`}
                        >
                          {isAdded
                            ? `✓ Added ${qty} Carton(s) to Cart!`
                            : `🛒 Add ${qty} ${qty === 1 ? "Carton" : "Cartons"} (₹${totalPrice.toLocaleString("en-IN")})`}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs font-mono-spec">
              <span style={{ color: "#475569" }}>Mayur Vihar Phase-3 Central Cold Room 1 Hub</span>
              <button
                onClick={() => setSelectedBrandModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold cursor-pointer transition-all"
              >
                Close Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
