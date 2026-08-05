"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  Sliders,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Snowflake,
  Truck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Target,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Users,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Percent,
  Edit3,
  Save,
  Plus,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  CheckSquare,
  Square,
  Send,
  ShieldAlert,
  UserCheck,
  RefreshCw,
  Flame,
  Star,
  Activity,
  Compass,
  Radio,
} from "lucide-react";
import MARKET_CONFIG_DATA from "@/data/market-intelligence-config.json";

interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  category: "Agency Expansion" | "Logistics & Cold Room" | "Pricing & Digital" | "Territory";
  baseRevenueMonthlyLakhs: number;
  projectedRevenueGainLakhs: number;
  projectedMarginImpactPct: number;
  investmentRequiredLakhs: number;
  paybackMonths: number;
  active: boolean;
}

const INITIAL_SCENARIOS: WhatIfScenario[] = [
  {
    id: "sc-1",
    name: "Tie Up with HyFun Foods & Godrej Yummiez (New Agencies)",
    description: "Sign authorized HORECA distribution for HyFun institutional hashbrowns/fries & Godrej Yummiez frozen starters.",
    category: "Agency Expansion",
    baseRevenueMonthlyLakhs: 48.5,
    projectedRevenueGainLakhs: 14.2,
    projectedMarginImpactPct: 2.4,
    investmentRequiredLakhs: 6.5,
    paybackMonths: 3.2,
    active: true,
  },
  {
    id: "sc-2",
    name: "Expand Mayur Vihar Cold Room Capacity (+60% -18°C Storage)",
    description: "Install modular pallet racking and secondary compressor in B-577 Cold Room 1 to eliminate peak banquet stockouts.",
    category: "Logistics & Cold Room",
    baseRevenueMonthlyLakhs: 48.5,
    projectedRevenueGainLakhs: 18.8,
    projectedMarginImpactPct: 1.8,
    investmentRequiredLakhs: 12.0,
    paybackMonths: 4.8,
    active: true,
  },
  {
    id: "sc-3",
    name: "Launch Digital B2B Order Portal & Instant RFQ Self-Service",
    description: "Migrate 40%+ Kirana & Cloud Kitchen orders from manual WhatsApp/phone calls to automated web portal ordering.",
    category: "Pricing & Digital",
    baseRevenueMonthlyLakhs: 48.5,
    projectedRevenueGainLakhs: 9.5,
    projectedMarginImpactPct: 3.1,
    investmentRequiredLakhs: 2.5,
    paybackMonths: 1.9,
    active: false,
  },
  {
    id: "sc-4",
    name: "Expand Dedicated Reefer Fleet to South & West Delhi Clusters",
    description: "Add 2 refrigerated delivery vans dedicated to Cyber Hub, Hauz Khas, and Rajouri Garden QSR/hotel clusters.",
    category: "Territory",
    baseRevenueMonthlyLakhs: 48.5,
    projectedRevenueGainLakhs: 22.4,
    projectedMarginImpactPct: 1.2,
    investmentRequiredLakhs: 16.0,
    paybackMonths: 6.1,
    active: false,
  },
];

// Circular SVG Progress Ring Component
const CircularProgressRing: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  valueText?: string;
}> = ({
  percentage,
  size = 72,
  strokeWidth = 6,
  color = "#10B981",
  label,
  valueText,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-xs font-black font-mono-spec text-white">
          {valueText || `${percentage}%`}
        </span>
      </div>
      {label && (
        <span className="text-[10px] font-mono-spec text-slate-400 uppercase mt-1 text-center font-bold">
          {label}
        </span>
      )}
    </div>
  );
};

export default function MarketIntelligenceDashboardPage() {
  const [scenarios, setScenarios] = useState<WhatIfScenario[]>(INITIAL_SCENARIOS);
  const [marketTrends, setMarketTrends] = useState(MARKET_CONFIG_DATA.marketTrends);
  const [recommendedAgencies, setRecommendedAgencies] = useState(MARKET_CONFIG_DATA.recommendedAgencies);
  const [customers, setCustomers] = useState(MARKET_CONFIG_DATA.customers);
  const [expandedCustomerIds, setExpandedCustomerIds] = useState<string[]>(["cust-04"]);
  const [selectedHub, setSelectedHub] = useState<string>("mayur-vihar");
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleCustomerAccordion = (id: string) => {
    setExpandedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleScenario = (id: string) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleRunAutonomousMarketScan = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/market-intelligence/sync", { method: "POST" });
      const data = await res.json();
      if (data.data) {
        setMarketTrends(data.data.marketTrends);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  const activeScenarios = scenarios.filter((s) => s.active);
  const baseMonthlyRev = MARKET_CONFIG_DATA.baseMonthlyRevenueLakhs;
  const addedRevGain = activeScenarios.reduce((acc, s) => acc + s.projectedRevenueGainLakhs, 0);
  const totalProjectedMonthlyRev = baseMonthlyRev + addedRevGain;
  const totalInvestment = activeScenarios.reduce((acc, s) => acc + s.investmentRequiredLakhs, 0);
  const avgMarginLift = activeScenarios.length > 0
    ? (activeScenarios.reduce((acc, s) => acc + s.projectedMarginImpactPct, 0) / activeScenarios.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-[#070A12] text-white pb-28 relative overflow-hidden">
      {/* Ambient Neon Background Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 w-[700px] h-[400px] rounded-full bg-sky-500/10 blur-[160px]" />

      {/* Futuristic Glass Command Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-mono-spec font-black flex items-center gap-2 border border-slate-800 transition-all shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Wholesale Catalog</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-mono-spec font-black uppercase shadow-md">
                  COMMAND CENTER 2.0 • PALANTIR TERMINAL
                </span>
                <span className="text-xs text-emerald-400 font-mono-spec font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>B-577 Mayur Vihar-3 Live Telemetry Active</span>
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-white tracking-tight mt-0.5">
                SG Trading Company • Executive Growth &amp; Intelligence War Room
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAutonomousMarketScan}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-mono-spec font-black text-xs flex items-center gap-2 border border-emerald-500/40 transition-all cursor-pointer shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Auto-Scanning Market..." : "Run Autonomous Daily Resync"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-6 md:px-12 pt-8 space-y-12 relative z-10">
        {/* HERO STRATEGIC DASHBOARD COCKPIT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 8 Cols: Interactive Animated Strategic Trajectory & Live Scenario Cockpit */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border-2 border-slate-800/80 hover:border-amber-500/50 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <span className="text-xs font-mono-spec text-amber-400 font-black uppercase tracking-wider block">
                  REAL-TIME ADOPTION TRAJECTORY ENGINE
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
                  Monthly Revenue Simulation Cockpit
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-black border border-emerald-500/40">
                  +{((addedRevGain / baseMonthlyRev) * 100).toFixed(1)}% REVENUE LIFT
                </span>
              </div>
            </div>

            {/* Glowing Trajectory Progress Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono-spec text-slate-400 uppercase">Current Base Run-Rate</span>
                <div className="text-2xl font-black text-slate-300 font-mono-spec">
                  ₹{baseMonthlyRev.toFixed(2)} <span className="text-xs text-slate-400">L/mo</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono-spec block">12 Authorized Brands Baseline</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] font-mono-spec text-emerald-400 uppercase font-bold">Projected Active Gain</span>
                <div className="text-2xl font-black text-emerald-400 font-mono-spec">
                  +₹{addedRevGain.toFixed(2)} <span className="text-xs text-slate-400">L/mo</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono-spec block">
                  {activeScenarios.length} Strategic Scenarios Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-2 border-amber-500 space-y-1">
                <span className="text-[11px] font-mono-spec text-amber-400 font-black uppercase">Simulated Total Target</span>
                <div className="text-3xl font-black text-white font-mono-spec">
                  ₹{totalProjectedMonthlyRev.toFixed(2)} <span className="text-xs text-slate-400">L/mo</span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono-spec block font-bold">
                  Annualized: ₹{(totalProjectedMonthlyRev * 12).toFixed(1)} Lakhs/yr
                </span>
              </div>
            </div>

            {/* Interactive Scenario Cards Stack */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-spec text-slate-400 uppercase block font-bold">
                Toggle Scenarios below to simulate immediate financial impact:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scenarios.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => toggleScenario(sc.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      sc.active
                        ? "bg-slate-950 border-amber-500 shadow-lg shadow-amber-500/10"
                        : "bg-slate-950/50 border-slate-800/80 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono-spec uppercase">
                          {sc.category}
                        </span>
                        {sc.active && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono-spec font-black">
                            ● ON
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-extrabold text-white line-clamp-1">{sc.name}</h4>
                    </div>

                    <div className="text-right shrink-0 font-mono-spec">
                      <span className="text-sm font-black text-emerald-400 block">
                        +₹{sc.projectedRevenueGainLakhs.toFixed(1)}L
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ROI: {sc.paybackMonths}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Interactive SVG Radar Spider Chart (SG Trading vs Metro vs Mandi) */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900/60 backdrop-blur-xl border-2 border-slate-800/80 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono-spec text-emerald-400 font-black uppercase">
                STRATEGIC COMPETITIVE RADAR
              </span>
              <h3 className="text-lg font-black text-white">
                Multi-Axis Dominance Scorecard
              </h3>
              <p className="text-xs text-slate-400">
                SG Trading Company (Gold) vs. Metro Cash &amp; Carry (Sky Blue) vs. Mandi Wholesalers (Red).
              </p>
            </div>

            {/* Glowing SVG Radar Chart */}
            <div className="relative py-4 flex items-center justify-center">
              <svg viewBox="0 0 300 280" className="w-full max-w-[260px] h-auto">
                {/* Concentric Polygons */}
                <polygon
                  points="150,20 270,105 225,245 75,245 30,105"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="150,55 235,115 203,215 97,215 65,115"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="150,90 200,125 180,185 120,185 100,125"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />

                {/* Radar Axis Lines */}
                <line x1="150" y1="150" x2="150" y2="20" stroke="rgba(255,255,255,0.12)" />
                <line x1="150" y1="150" x2="270" y2="105" stroke="rgba(255,255,255,0.12)" />
                <line x1="150" y1="150" x2="225" y2="245" stroke="rgba(255,255,255,0.12)" />
                <line x1="150" y1="150" x2="75" y2="245" stroke="rgba(255,255,255,0.12)" />
                <line x1="150" y1="150" x2="30" y2="105" stroke="rgba(255,255,255,0.12)" />

                {/* Mandi Wholesalers (Red Polygon - Low Scores) */}
                <polygon
                  points="150,110 180,135 150,195 110,205 70,135"
                  fill="rgba(239, 68, 68, 0.15)"
                  stroke="#EF4444"
                  strokeWidth="2"
                />

                {/* Metro Cash & Carry (Sky Blue Polygon - Mid Scores) */}
                <polygon
                  points="150,55 220,115 190,215 110,215 80,115"
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />

                {/* SG Trading Company (Amber/Gold Polygon - Dominant 98/100) */}
                <polygon
                  points="150,24 265,108 220,242 78,242 34,108"
                  fill="rgba(245, 158, 11, 0.25)"
                  stroke="#F59E0B"
                  strokeWidth="3"
                />

                {/* Axis Labels */}
                <text x="150" y="14" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">-18°C COLD CHAIN</text>
                <text x="275" y="110" fill="#CBD5E1" fontSize="9" textAnchor="start">EXPRESS DISPATCH</text>
                <text x="228" y="260" fill="#CBD5E1" fontSize="9" textAnchor="middle">LOW MOQ FLEX</text>
                <text x="72" y="260" fill="#CBD5E1" fontSize="9" textAnchor="middle">GST B2B CREDIT</text>
                <text x="25" y="110" fill="#CBD5E1" fontSize="9" textAnchor="end">AUTH. FACTORY SEAL</text>
              </svg>
            </div>

            {/* Radar Legend */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 font-mono-spec text-[10px]">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>SG (98/100)</span>
              </div>
              <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Metro (74/100)</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span>Mandi (45/100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE DELHI NCR COLD-CHAIN TELEMETRY WAR-ROOM MAP VISUALIZER */}
        <section className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border-2 border-slate-800/80 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>DELHI NCR LOGISTICS COMMAND • INTERACTIVE GPS TELEMETRY MAP</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Mayur Vihar Phase-3 Central Warehouse &amp; Express NCR Dispatch Hubs
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono-spec">
              {[
                { id: "mayur-vihar", label: "🏢 B-577 Mayur Vihar-3 Central Warehouse (Hub)" },
                { id: "radisson", label: "🏨 Kaushambi / East Delhi (Radisson Blu Hub)" },
                { id: "noida", label: "🍔 Noida Sector-62 QSR Cluster (Burger Singh)" },
                { id: "indirapuram", label: "☁️ Indirapuram Cloud Kitchen Hub (EatClub)" },
              ].map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub.id)}
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    selectedHub === hub.id
                      ? "bg-amber-500 text-slate-950 font-black border-amber-400"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {hub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual SVG NCR Map with Telemetry Vectors */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 overflow-hidden min-h-[280px] flex items-center justify-center">
            <svg viewBox="0 0 800 260" className="w-full h-auto max-h-[260px]">
              {/* Subtle Grid Map Lines */}
              <line x1="0" y1="60" x2="800" y2="60" stroke="rgba(255,255,255,0.04)" />
              <line x1="0" y1="130" x2="800" y2="130" stroke="rgba(255,255,255,0.04)" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.04)" />
              <line x1="200" y1="0" x2="200" y2="260" stroke="rgba(255,255,255,0.04)" />
              <line x1="400" y1="0" x2="400" y2="260" stroke="rgba(255,255,255,0.04)" />
              <line x1="600" y1="0" x2="600" y2="260" stroke="rgba(255,255,255,0.04)" />

              {/* Pulsing Animated Delivery Routes from Mayur Vihar Central Hub (Center 400, 130) */}
              <path
                d="M 400 130 L 180 80"
                stroke={selectedHub === "radisson" ? "#F59E0B" : "rgba(16, 185, 129, 0.4)"}
                strokeWidth={selectedHub === "radisson" ? "4" : "2"}
                strokeDasharray="6 4"
              />
              <path
                d="M 400 130 L 630 75"
                stroke={selectedHub === "noida" ? "#F59E0B" : "rgba(16, 185, 129, 0.4)"}
                strokeWidth={selectedHub === "noida" ? "4" : "2"}
                strokeDasharray="6 4"
              />
              <path
                d="M 400 130 L 590 195"
                stroke={selectedHub === "indirapuram" ? "#F59E0B" : "rgba(16, 185, 129, 0.4)"}
                strokeWidth={selectedHub === "indirapuram" ? "4" : "2"}
                strokeDasharray="6 4"
              />

              {/* CENTRAL WAREHOUSE NODE (B-577 Mayur Vihar Phase-3) */}
              <circle cx="400" cy="130" r="28" fill="rgba(245, 158, 11, 0.2)" />
              <circle cx="400" cy="130" r="16" fill="#F59E0B" />
              <circle cx="400" cy="130" r="6" fill="#070A12" />
              <text x="400" y="175" fill="#F59E0B" fontSize="12" fontWeight="black" textAnchor="middle">
                B-577 MAYUR VIHAR-3 CENTRAL WAREHOUSE (-18°C)
              </text>

              {/* Kaushambi Radisson Blu Hub Node */}
              <circle cx="180" cy="80" r="12" fill={selectedHub === "radisson" ? "#F59E0B" : "#10B981"} />
              <text x="180" y="60" fill="#CBD5E1" fontSize="11" fontWeight="bold" textAnchor="middle">
                Kaushambi / Radisson Blu (3.5 Km • 15 mins)
              </text>

              {/* Noida Sec-62 Burger Singh Cluster Node */}
              <circle cx="630" cy="75" r="12" fill={selectedHub === "noida" ? "#F59E0B" : "#10B981"} />
              <text x="630" y="55" fill="#CBD5E1" fontSize="11" fontWeight="bold" textAnchor="middle">
                Noida Sec-62 QSR Hub (8.2 Km • 22 mins)
              </text>

              {/* Indirapuram EatClub Cloud Kitchen Node */}
              <circle cx="590" cy="195" r="12" fill={selectedHub === "indirapuram" ? "#F59E0B" : "#10B981"} />
              <text x="590" y="220" fill="#CBD5E1" fontSize="11" fontWeight="bold" textAnchor="middle">
                Indirapuram Cloud Kitchen (6.4 Km • 18 mins)
              </text>
            </svg>
          </div>
        </section>

        {/* CUSTOMER CRM VISUAL RADIAL GAUGE ACCORDIONS SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>VISUAL CUSTOMER CRM • RADIAL SVG RING GAUGES &amp; STRATEGY CARDS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Target Account Profiles with Visual Risk &amp; Win Probability Rings
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customers.map((cust) => {
              const isExpanded = expandedCustomerIds.includes(cust.id);
              return (
                <div
                  key={cust.id}
                  className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border-2 border-slate-800/80 hover:border-amber-500/50 p-6 space-y-5 transition-all shadow-2xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 text-[10px] font-mono-spec font-black uppercase">
                          {cust.segment}
                        </span>
                        <span className="text-xs font-mono-spec text-slate-400">
                          {cust.monthlyCaseVolume}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white">{cust.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>{cust.location}</span>
                      </p>
                    </div>

                    {/* Circular Visual SVG Gauge Rings */}
                    <div className="flex items-center gap-5">
                      <CircularProgressRing
                        percentage={100 - cust.paymentRiskPct}
                        color={cust.paymentRiskPct <= 6 ? "#10B981" : "#F59E0B"}
                        valueText={`${cust.paymentRiskPct}%`}
                        label="PAYMENT RISK"
                      />
                      <CircularProgressRing
                        percentage={cust.acceptanceRatePct}
                        color="#F59E0B"
                        valueText={`${cust.acceptanceRatePct}%`}
                        label="WIN PROBABILITY"
                      />
                    </div>
                  </div>

                  {/* Why He Is a Good Customer Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                    <span className="text-xs font-mono-spec font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>WHY HE IS A GOOD CUSTOMER &amp; LONG-TERM EVALUATION:</span>
                    </span>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {cust.whyGoodCustomer}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
                      {cust.longTermEvaluation}
                    </p>
                  </div>

                  {/* Expandable Actionable Customer Acquisition Recommendations */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      <span>Contact: <strong>{cust.contactPerson}</strong></span>
                    </div>

                    <button
                      onClick={() => toggleCustomerAccordion(cust.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-mono-spec text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Acquisition Plan" : "Show Acquisition Plan"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && cust.acquisitionRecommendations && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2 animate-in fade-in duration-300">
                      <span className="text-xs font-mono-spec font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        <span>CUSTOMIZED ACQUISITION ACTION RECOMMENDATIONS:</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-200 font-medium">
                        {cust.acquisitionRecommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
