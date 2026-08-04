"use client";

import React from "react";
import { Award, ShieldCheck, Sparkles, Snowflake } from "lucide-react";

export const BrandTicker: React.FC = () => {
  const BRANDS = [
    { name: "BRITANNIA CHEESE", subtitle: "HORECA Institutional", tag: "Cheese Slices & Diced Mozzarella" },
    { name: "ITC MASTER CHEF", subtitle: "HORECA Foodservice", tag: "Frozen Foods & Chef Gravy Bases" },
    { name: "VEEBA FOOD SERVICES", subtitle: "HORECA Sauces & Mayo", tag: "Eggless Mayo, Sauces & Dressings" },
    { name: "MILKANA PROFESSIONAL", subtitle: "HORECA Chef Dairy", tag: "European Recipe Diced Mozzarella" },
    { name: "McCAIN FOOD SERVICE", subtitle: "HORECA Commercial Fry", tag: "9mm French Fries & Cheese Balls" },
    { name: "ISCON BALAJI FOODS", subtitle: "HORECA Export Fry", tag: "Shoestring French Fries & Patties" },
    { name: "GO DICED CHEESE", subtitle: "Parag Milk Foods", tag: "Commercial Diced Pizza Cheese" },
    { name: "CHATHA FOODS", subtitle: "HACCP Certified Non-Veg", tag: "Smoked Chicken Sausages & Patties" },
    { name: "ANOOP SATTU", subtitle: "General Trade (GT)", tag: "100% Pure Roasted Chana Sattu" },
    { name: "OCEAN WATER", subtitle: "General Trade (GT)", tag: "Fruit Water & Flavoured Hydration" },
    { name: "SLEEPY OWL COFFEE", subtitle: "General Trade (GT)", tag: "100% Arabica Instant & Cold Brew" },
    { name: "LOYKA GOURMET", subtitle: "General Trade (GT)", tag: "Original Almond Brittle Gift Boxes" },
  ];

  return (
    <section className="w-full bg-slate-950 border-b border-slate-800/80 py-8 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono-spec font-bold uppercase tracking-wider text-amber-400">
            AUTHORIZED DISTRIBUTION PORTFOLIO (DELHI NCR)
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono-spec">
          Rahul Garg & Sonu • Mayur Vihar Phase-3, Delhi
        </span>
      </div>

      {/* 3D Visual Cards Grid / Marquee */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {BRANDS.map((brand, idx) => (
          <div
            key={idx}
            className="industrial-card rounded-xl p-3.5 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono-spec font-bold text-amber-400 uppercase">
                {brand.subtitle}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="my-2">
              <h4 className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                {brand.name}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                {brand.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
