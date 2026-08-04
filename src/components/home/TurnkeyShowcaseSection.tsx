"use client";

import React, { useState } from "react";
import { TURNKEY_KITCHEN_CONFIGS } from "@/data/products";
import { useApp } from "@/context/AppContext";
import {
  LayoutGrid,
  CheckCircle2,
  FileText,
  Flame,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const TurnkeyShowcaseSection: React.FC = () => {
  const { loadTurnkeyPackageToRFQ } = useApp();
  const [activeTab, setActiveTab] = useState(TURNKEY_KITCHEN_CONFIGS[0].id);

  const activeConfig =
    TURNKEY_KITCHEN_CONFIGS.find((c) => c.id === activeTab) ||
    TURNKEY_KITCHEN_CONFIGS[0];

  return (
    <section className="w-full py-16 md:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-spec font-bold uppercase tracking-wider text-amber-400">
            <LayoutGrid className="w-4 h-4" />
            <span>TURNKEY COMMERCIAL KITCHEN PROJECT BLUEPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            End-to-End Turnkey Commercial Kitchen Engineering
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            From AutoCAD layout blueprints and exhaust CFM air-flow calculation to SS304 fabrication and commissioning. Explore our standardized turnkey packages.
          </p>
        </div>

        {/* Package Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 pb-4 border-b border-slate-800">
          {TURNKEY_KITCHEN_CONFIGS.map((config) => (
            <button
              key={config.id}
              onClick={() => setActiveTab(config.id)}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === config.id
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {config.title}
            </button>
          ))}
        </div>

        {/* Active Blueprint Display Card */}
        <div className="industrial-card rounded-2xl p-6 md:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase tracking-wider">
                TURNKEY ARCHITECTURE BLUEPRINT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {activeConfig.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                {activeConfig.subtitle}
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
              {activeConfig.layoutDescription}
            </p>

            {/* Key Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeConfig.keyDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono-spec">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Daily Output
                </span>
                <span className="text-white font-bold">
                  {activeConfig.recommendedCovers}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Kitchen Area
                </span>
                <span className="text-amber-400 font-bold">
                  {activeConfig.estimatedSqFt}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Electrical Load
                </span>
                <span className="text-sky-400 font-bold">
                  {activeConfig.totalPowerLoadKW}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  LPG Fuel Load
                </span>
                <span className="text-emerald-400 font-bold">
                  {activeConfig.lpgCylindersDay}
                </span>
              </div>
            </div>

            <button
              onClick={() => loadTurnkeyPackageToRFQ(activeConfig)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>
                Load Complete {activeConfig.title} Equipment Manifest into RFQ Basket →
              </span>
            </button>
          </div>

          {/* Right Layout Visual Blueprint Illustration */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono-spec font-bold text-amber-400">
                  LAYOUT ZONE ARCHITECTURE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono-spec">
                  SS 304 ZONING
                </span>
              </div>

              {/* Graphical Blueprint Flow Representation */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono-spec">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Flame className="w-4 h-4" />
                    <span>01. Hot Cooking Line</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    SS304 Gas Ranges, Twin Fryers & Exhaust Ventilation Hood
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                    <Zap className="w-4 h-4" />
                    <span>02. Cold Storage Bay</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    1000L Upright Chillers & Worktop Preparation Refrigerators
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>03. Food Prep & Processing</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Spiral Dough Mixers, Vegetable Cutters & Butcher Mincers
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                    <LayoutGrid className="w-4 h-4" />
                    <span>04. FSSAI Sink & Dispatch</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Double Bowl Deep Wash Sinks & Stainless Worktable Undershelves
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 text-center font-mono-spec">
                Complete AutoCAD DWG + 3D Layout Package Included with Turnkey RFQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
