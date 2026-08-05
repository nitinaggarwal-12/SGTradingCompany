"use client";

import React from "react";
import { Award, ShieldCheck, Sparkles, Snowflake, CheckCircle2 } from "lucide-react";

interface BrandItem {
  name: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  logoAccent: string;
  segment: string;
}

const BRANDS: BrandItem[] = [
  {
    name: "McCAIN FOOD SERVICE",
    subtitle: "HORECA Commercial Fry",
    tag: "9mm French Fries & Potato Cheese Balls",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    logoAccent: "🍟",
    segment: "HORECA FROZEN",
  },
  {
    name: "ITC MASTER CHEF",
    subtitle: "HORECA Foodservice",
    tag: "Frozen Foods & Chef Retort Gravy Bases",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    logoAccent: "👨‍🍳",
    segment: "HORECA FROZEN",
  },
  {
    name: "VEEBA FOOD SERVICES",
    subtitle: "HORECA Sauces & Mayo",
    tag: "Eggless Mayo, Sauces & Spout Dressings",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/40",
    logoAccent: "🥗",
    segment: "HORECA SAUCES",
  },
  {
    name: "BRITANNIA CHEESE",
    subtitle: "HORECA Institutional",
    tag: "Commercial Cheese Slices & Diced Mozzarella",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    logoAccent: "🧀",
    segment: "HORECA DAIRY",
  },
  {
    name: "ISCON BALAJI FOODS",
    subtitle: "HORECA Export Fry",
    tag: "Shoestring French Fries & Peri Peri Seasoned",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    logoAccent: "🌶️",
    segment: "HORECA FROZEN",
  },
  {
    name: "GO DICED CHEESE",
    subtitle: "Parag Milk Foods",
    tag: "Commercial Woodfired Diced Pizza Cheese",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    logoAccent: "🍕",
    segment: "HORECA DAIRY",
  },
  {
    name: "CHATHA FOODS",
    subtitle: "HACCP Certified Non-Veg",
    tag: "Smoked Chicken Sausages, Frankfurters & Patties",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    logoAccent: "🍗",
    segment: "HORECA MEAT",
  },
  {
    name: "MILKANA PROFESSIONAL",
    subtitle: "HORECA Chef Dairy",
    tag: "European Recipe Diced Mozzarella Crate",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    logoAccent: "🥛",
    segment: "HORECA DAIRY",
  },
  {
    name: "ANOOP SATTU",
    subtitle: "General Trade (GT)",
    tag: "100% Pure Roasted Chana Sattu Wholesale",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    logoAccent: "🌾",
    segment: "GT RETAIL",
  },
  {
    name: "OCEAN WATER",
    subtitle: "General Trade (GT)",
    tag: "Fruit Water & Flavoured Hydration Cartons",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    logoAccent: "💧",
    segment: "GT BEVERAGE",
  },
  {
    name: "SLEEPY OWL COFFEE",
    subtitle: "General Trade (GT)",
    tag: "100% Arabica Instant & Cold Brew Bottles",
    badgeColor: "bg-amber-600/20 text-amber-300 border-amber-600/40",
    logoAccent: "☕",
    segment: "GT BEVERAGE",
  },
  {
    name: "LOYKA GOURMET",
    subtitle: "General Trade (GT)",
    tag: "Original Almond Brittle Gift Boxes",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    logoAccent: "🍫",
    segment: "GT CONFECTION",
  },
];

export const BrandTicker: React.FC = () => {
  // Seamless loop by duplicating the 12 brands twice
  const marqueeItems = [...BRANDS, ...BRANDS];

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
          animation: brandMarquee 38s linear infinite;
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
            OFFICIAL AUTHORIZED DISTRIBUTOR AGENCIES (12 BRANDS) • CONTINUOUS NCR MARQUEE
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono-spec flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hover carousel to pause • Rahul Garg &amp; Sonu • Mayur Vihar Phase-3, Delhi</span>
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
              className="industrial-card w-72 shrink-0 rounded-2xl p-4 border border-slate-800 hover:border-amber-500/80 bg-slate-900/90 transition-all shadow-lg group flex flex-col justify-between"
            >
              {/* Top Row: Segment Badge & Official Checkmark */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-mono-spec font-black uppercase ${brand.badgeColor}`}
                >
                  {brand.segment}
                </span>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-mono-spec">
                  <span>{brand.logoAccent}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Middle Row: Official Brand Agency Name */}
              <div className="my-1">
                <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors tracking-tight">
                  {brand.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
                  {brand.tag}
                </p>
              </div>

              {/* Bottom Row: Authorized Distributor Tag */}
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-spec text-slate-400">
                <span>AUTH. DISTRIBUTOR</span>
                <span className="text-amber-400 font-bold">100% FACTORY SEALED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
