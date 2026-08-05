"use client";

import React, { useState } from "react";
import {
  Snowflake,
  Truck,
  Flame,
  ShieldCheck,
  Thermometer,
  Zap,
  Award,
  ChevronRight,
  Gauge,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const ColdChain3DVisualizer: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<
    "cold-chain" | "fry-crisp" | "cheese-stretch"
  >("cold-chain");

  const [vanRouteProgress, setVanRouteProgress] = useState<number>(75);

  return (
    <section className="w-full py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono-spec text-xs font-extrabold uppercase">
              <Snowflake className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
              <span>3D INDUSTRIAL TELEMETRY &amp; HORECA QUALITY BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Real-Time -18°C Cold-Chain &amp; Culinary Performance Simulation
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Experience SG Trading Company’s Mayur Vihar Phase-3 cold-chain engineering telemetry, crisp-retention benchmarks, and commercial cheese stretch dynamics.
            </p>
          </div>

          {/* Interactive Simulation Switcher Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setActiveSimulator("cold-chain")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeSimulator === "cold-chain"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>1. -18°C Cold-Chain Van Telemetry</span>
            </button>

            <button
              onClick={() => setActiveSimulator("fry-crisp")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeSimulator === "fry-crisp"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>2. Fry Crisp Retention Test</span>
            </button>

            <button
              onClick={() => setActiveSimulator("cheese-stretch")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeSimulator === "cheese-stretch"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>3. 280°C Pizza Stretch Test</span>
            </button>
          </div>
        </div>

        {/* SIMULATOR 1: -18°C COLD-CHAIN INSULATED VAN ROUTE TELEMETRY */}
        {activeSimulator === "cold-chain" && (
          <div className="rounded-3xl p-6 md:p-10 border-2 border-amber-500/60 bg-white dark:bg-[#0F172A] shadow-xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Telemetry Control Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono-spec font-extrabold text-amber-700 dark:text-amber-400 uppercase">
                    LIVE REFRIGERATED FLEET TELEMETRY • DEL-NCR-VAN-04
                  </span>
                  <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    Insulated Multi-Temperature Cold-Chain Transit
                  </h3>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    Every shipment of McCain, ITC Master Chef, Veeba, and Britannia leaves our Mayur Vihar Phase-3 warehouse in GPS-monitored refrigerated units.
                  </p>
                </div>

                {/* 3D Telemetry Sensor Gauges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-300 dark:border-sky-500/30 font-mono-spec">
                    <div className="flex items-center justify-between text-xs text-sky-700 dark:text-sky-400 font-extrabold">
                      <span>FROZEN BAY TEMP</span>
                      <Thermometer className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="text-3xl font-black mt-2 text-sky-800 dark:text-sky-300">
                      -18.4°C
                    </div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold block mt-1">
                      ● UNBROKEN COLD-CHAIN OK
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 font-mono-spec">
                    <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-extrabold">
                      <span>CHILLED DAIRY BAY</span>
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-black mt-2 text-amber-800 dark:text-amber-300">
                      +2.8°C
                    </div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold block mt-1">
                      Britannia Mozzarella Zone
                    </span>
                  </div>
                </div>

                {/* Dispatch Simulator Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono-spec font-bold text-slate-800 dark:text-slate-200">
                    <span>Simulate Delivery Van Transit Progress:</span>
                    <span className="text-amber-700 dark:text-amber-400 font-black">{vanRouteProgress}% Arrived</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={vanRouteProgress}
                    onChange={(e) => setVanRouteProgress(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono-spec text-slate-500 dark:text-slate-400">
                    <span>Mayur Vihar Phase-3 Warehouse</span>
                    <span>Customer Kitchen Dock (Delhi NCR)</span>
                  </div>
                </div>
              </div>

              {/* 3D Visual Route & Van Graphic Simulation - PURE LIGHT IN LIGHT THEME / DARK IN DARK THEME */}
              <div className="lg:col-span-7 relative p-6 md:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white overflow-hidden shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-300 dark:border-slate-800 text-xs font-mono-spec">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    DISPATCH ROUTE: MAYUR VIHAR PHASE-3 ➔ DELHI NCR INSTITUTIONAL DOCK
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-extrabold">
                    GPS LIVE TELEMETRY
                  </span>
                </div>

                {/* 3D Animated Route Track */}
                <div className="py-10 relative">
                  {/* Route Line */}
                  <div className="w-full h-3.5 bg-slate-300 dark:bg-slate-800 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 transition-all duration-300"
                      style={{ width: `${vanRouteProgress}%` }}
                    />
                  </div>

                  {/* Animated Truck Icon Positioned along route */}
                  <div
                    className="absolute top-5 transition-all duration-300 -translate-x-1/2"
                    style={{ left: `${vanRouteProgress}%` }}
                  >
                    <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 shadow-2xl border-2 border-white flex flex-col items-center">
                      <Truck className="w-6 h-6 animate-bounce" />
                      <span className="text-[9px] font-mono-spec font-black mt-0.5 whitespace-nowrap">
                        -18.4°C VAN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Route Milestones - Clean White Cards in Light Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs font-mono-spec">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-extrabold">
                      07:00 AM • DISPATCH
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                      Mayur Vihar Phase-3
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">
                      Cold Room 1 Pre-Cool Verified
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] text-sky-700 dark:text-sky-400 block font-extrabold">
                      TRANSIT LOGISTICS
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                      Noida / East Delhi Ring
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">
                      Continuous Refrigeration Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-extrabold">
                      DESTINATION DOCK
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                      Customer Kitchen Receiver
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">
                      GST Tax Invoice Handover
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR 2: FRY CRISP RETENTION COMPARISON BENCHMARK */}
        {activeSimulator === "fry-crisp" && (
          <div className="rounded-3xl p-6 md:p-10 border-2 border-amber-500/60 bg-white dark:bg-[#0F172A] shadow-xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono-spec font-extrabold text-amber-700 dark:text-amber-400 uppercase">
                  CULINARY LAB BENCHMARK • HEAT LAMP TEST
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  McCain vs. Iscon Balaji 9mm Fries Crisp Retention
                </h3>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Both McCain Food Service and Iscon Balaji 9mm fries are stocked in our Mayur Vihar Phase-3 warehouse. Compare crisp-retention performance under commercial kitchen heat lamps.
                </p>

                <div className="space-y-3 pt-2 text-xs font-mono-spec">
                  <div className="p-3.5 rounded-xl border border-amber-400/50 bg-amber-50 dark:bg-amber-500/10">
                    <span className="font-extrabold text-amber-800 dark:text-amber-400 block">
                      🍟 McCain 9mm French Fries (₹380 / 2.5 Kg)
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                      Retains structural crispiness up to <strong>26 minutes</strong> under heat lamps. Ideal for 5-star banquets &amp; dine-in QSRs.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-sky-400/50 bg-sky-50 dark:bg-sky-500/10">
                    <span className="font-extrabold text-sky-800 dark:text-sky-400 block">
                      🍟 Iscon Balaji 9mm Fries (₹340 / 2.5 Kg)
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                      ₹40 lower per pack cost with <strong>19-minute</strong> crisp retention. Gives cloud kitchens a 14% higher net profit margin.
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Comparison Bar Graphic */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white space-y-6">
                <div className="flex justify-between items-center text-xs font-mono-spec border-b border-slate-300 dark:border-slate-800 pb-3">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold">
                    CRISP RETENTION DURATION (MINUTES UNDER HEAT LAMP)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">Higher = Longer Crispiness</span>
                </div>

                <div className="space-y-5 py-4">
                  {/* McCain Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-spec font-bold">
                      <span>McCain 9mm French Fries (2.5 Kg Institutional)</span>
                      <span className="text-amber-700 dark:text-amber-400 font-black">26 MINS CRISP</span>
                    </div>
                    <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden p-1">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg flex items-center justify-end pr-3 text-slate-950 font-black text-xs font-mono-spec transition-all duration-700"
                        style={{ width: "95%" }}
                      >
                        95% CRISP INDEX
                      </div>
                    </div>
                  </div>

                  {/* Iscon Balaji Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-spec font-bold">
                      <span>Iscon Balaji 9mm Fries (2.5 Kg Export Pack)</span>
                      <span className="text-sky-700 dark:text-sky-400 font-black">19 MINS CRISP (HIGH MARGIN)</span>
                    </div>
                    <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden p-1">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-lg flex items-center justify-end pr-3 text-slate-950 font-black text-xs font-mono-spec transition-all duration-700"
                        style={{ width: "78%" }}
                      >
                        78% CRISP INDEX (+14% MARGIN)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR 3: BRITANNIA 280°C COMMERCIAL CHEESE STRETCH GAUGE */}
        {activeSimulator === "cheese-stretch" && (
          <div className="rounded-3xl p-6 md:p-10 border-2 border-amber-500/60 bg-white dark:bg-[#0F172A] shadow-xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono-spec font-extrabold text-amber-700 dark:text-amber-400 uppercase">
                  BRITANNIA COMMERCIAL CHEESE PERFORMANCE
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  280°C Baking Stretch &amp; Zero Oil-Off Benchmark
                </h3>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Unlike unorganized local dairy, Britannia Diced Mozzarella &amp; Cheddar Blend melts uniformly at high pizza-oven temperatures without releasing greasy oil puddles.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono-spec">
                  <div className="p-3 rounded-xl border border-emerald-400/50 bg-emerald-50 dark:bg-emerald-500/10">
                    <span className="text-emerald-800 dark:text-emerald-400 font-extrabold block">
                      STRETCH LENGTH
                    </span>
                    <span className="text-xl font-black text-emerald-800 dark:text-emerald-300 block mt-1">
                      42 CM+
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-amber-400/50 bg-amber-50 dark:bg-amber-500/10">
                    <span className="text-amber-800 dark:text-amber-400 font-extrabold block">
                      OIL-OFF RATING
                    </span>
                    <span className="text-xl font-black text-amber-800 dark:text-amber-300 block mt-1">
                      0.0% PUDDLE
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Visual Gauge */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white space-y-6">
                <div className="flex justify-between items-center text-xs font-mono-spec border-b border-slate-300 dark:border-slate-800 pb-3">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold">
                    COMMERCIAL PIZZA MELT &amp; STRETCH METRICS (BRITANNIA &amp; GO DICED)
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">● CHEF CERTIFIED</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center font-mono-spec py-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-600 dark:text-slate-400 text-xs block">Oven Melt Temp</span>
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400 block mt-1">
                      280°C
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold block mt-1">
                      Uniform Golden Crust
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-600 dark:text-slate-400 text-xs block">Cheese Pull</span>
                    <span className="text-2xl font-black text-sky-600 dark:text-sky-400 block mt-1">
                      42 cm
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 block mt-1">
                      Elastic Pull Retention
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-600 dark:text-slate-400 text-xs block">GST Input Credit</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block mt-1">
                      100%
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 block mt-1">
                      Official Tax Invoice
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
