"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Snowflake,
  Truck,
  Building2,
  Award,
  PhoneCall,
  Sparkles,
  Flame,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";

export const AboutUsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"horeca" | "gt">("horeca");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="w-full py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-16 relative z-10">
        {/* Top Grand Section Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono-spec font-black uppercase tracking-widest shadow-lg shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTHORISED INDUSTRIAL FOOD DISTRIBUTION ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Bridging India&apos;s Top Food Brands with{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Hotels, Restaurants &amp; Retail Stores.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Founded and led by <strong className="text-white">Rahul Garg &amp; Sonu</strong>,{" "}
            <strong className="text-amber-400">SG Trading Company</strong> operates Delhi NCR&apos;s most reliable cold-chain &amp; General Trade FMCG wholesale distribution engine from Mayur Vihar Phase-3.
          </p>
        </div>

        {/* 3D MOUTH-WATERING CULINARY SHOWCASE GRID (BIGGER & INTERACTIVE 3D ANIMATED) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Mouth-Watering McCain Golden Fries & Britannia Melted Cheese */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-amber-500/80 overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-amber-500/20"
            style={{
              transform:
                hoveredCard === 1
                  ? "perspective(1000px) rotateY(-4deg) rotateX(2deg) scale(1.02)"
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
            }}
          >
            <div className="relative h-64 md:h-72 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=85"
                alt="McCain Crispy French Fries & Britannia Melted Cheese"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating 3D Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>HORECA #1 BESTSELLER</span>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/40 text-xs font-mono-spec font-bold flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5" />
                <span>-18°C FROZEN</span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                McCain French Fries &amp; Britannia Mozzarella Cheese Stretch
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Golden crispy restaurant-grade 2.5 Kg french fries, diced pizza cheese, and commercial cheese slices delivered frozen to 5-star hotels, cloud kitchens, and pizza chains.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  McCain Foods
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  Britannia Cheese
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  Iscon Balaji
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Mouth-Watering ITC Master Chef & Veeba Gourmet Sauces */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-amber-500/80 overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-amber-500/20"
            style={{
              transform:
                hoveredCard === 2
                  ? "perspective(1000px) rotateY(0deg) rotateX(3deg) scale(1.02)"
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
            }}
          >
            <div className="relative h-64 md:h-72 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85"
                alt="ITC Master Chef & Veeba Gourmet Sauces & Mayo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating 3D Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-sky-500 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>QSR &amp; BANQUET SUPPLY</span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                ITC Master Chef &amp; Veeba Food Services Mayonnaise &amp; Bases
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Ready-to-cook institutional QSR delicacies, sausage frankfurters, velvety white garlic mayo, and Makhani gravel bases engineered for fast kitchen turnaround.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  ITC Master Chef
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  Veeba Mayo
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-spec">
                  Chatha Foods
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Mayur Vihar Phase-3 Central Distribution & Cold-Chain Fleet */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-amber-500/80 overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-amber-500/20"
            style={{
              transform:
                hoveredCard === 3
                  ? "perspective(1000px) rotateY(4deg) rotateX(2deg) scale(1.02)"
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
            }}
          >
            <div className="relative h-64 md:h-72 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
                alt="Central Distribution Warehouse Mayur Vihar Phase-3 Delhi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating 3D Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 text-xs font-mono-spec font-black uppercase shadow-lg flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>SAME-DAY DELHI NCR</span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                Mayur Vihar Phase-3 Central Cold-Chain Hub
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Dedicated temperature-monitored refrigerated trucks ensuring unbroken cold chain from our Mayur Vihar Phase-3 warehouse straight to your kitchen freezer.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono-spec font-bold">
                  B-577 Shiv Mandir Rd
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 text-xs font-mono-spec font-bold">
                  GST 07ADQFS8839Q1ZQ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TWO PILLARS + DIRECT INSTITUTIONAL ACTION BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Left Infrastructure Pillars (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/40 space-y-2 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-black text-sm">
                <Snowflake className="w-5 h-5" />
                <span>-18°C Cold Chain</span>
              </div>
              <p className="text-xs text-slate-300">
                Continuous digital temperature monitoring for all McCain &amp; ITC frozen cartons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/40 space-y-2 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                <Truck className="w-5 h-5" />
                <span>Express Replenish</span>
              </div>
              <p className="text-xs text-slate-300">
                Same-day &amp; early morning QSR &amp; supermarket carton dispatch across Delhi NCR.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/40 space-y-2 hover:border-emerald-400 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>100% GST Invoices</span>
              </div>
              <p className="text-xs text-slate-300">
                Compliant B2B tax credit billing for institutional corporate procurement.
              </p>
            </div>
          </div>

          {/* Right Direct CTA Box (5 Cols) */}
          <div className="lg:col-span-5 industrial-card rounded-2xl p-6 border-2 border-amber-500/60 bg-gradient-to-r from-amber-500/10 to-slate-900 space-y-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-spec font-black text-amber-400 uppercase tracking-wider block">
                DIRECT INSTITUTIONAL PROMPT
              </span>
              <h4 className="text-base font-extrabold text-white">
                Request Commercial Wholesale Rates
              </h4>
              <p className="text-xs text-slate-300">
                Direct phone &amp; WhatsApp wholesale desk: Mayur Vihar Phase-3, Delhi.
              </p>
            </div>

            <a
              href="#contact"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/25 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
