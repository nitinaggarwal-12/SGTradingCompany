"use client";

import React, { useState, useEffect } from "react";
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
  Play,
  Pause,
  FileText,
  Smartphone,
} from "lucide-react";
import MARKET_CONFIG_DATA from "@/data/market-intelligence-config.json";

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
  const strokeDashoffset = circumference - (Math.min(Math.max(percentage, 0), 100) / 100) * circumference;

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
            className="transition-all duration-500 ease-out"
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
  // LIVE REAL-TIME INTERACTIVE SLIDER COCKPIT STATE
  const [coldRoomExpansionPct, setColdRoomExpansionPct] = useState<number>(50); // 0 to 100%
  const [newAgenciesCount, setNewAgenciesCount] = useState<number>(2); // 0 to 5 brands
  const [reeferVanCount, setReeferVanCount] = useState<number>(4); // 2 to 8 vans
  const [digitalAdoptionPct, setDigitalAdoptionPct] = useState<number>(35); // 0 to 80%

  // Live Simulated Reefer Van Progress for Real-Time Map Animation
  const [vanProgress, setVanProgress] = useState<number>(25);
  const [liveTemp, setLiveTemp] = useState<number>(-18.4);

  // PHONE-BASED DRIVER TRACKING & STATUS STATE
  const [selectedDriverPhone, setSelectedDriverPhone] = useState<string>("+91 9667731355");
  const [driverMilestone, setDriverMilestone] = useState<"LOADED" | "TRANSIT" | "DOCK" | "DELIVERED">("TRANSIT");
  const [lastPhonePingSec, setLastPhonePingSec] = useState<number>(12);

  const [marketTrends, setMarketTrends] = useState(MARKET_CONFIG_DATA.marketTrends);
  const [customers, setCustomers] = useState(MARKET_CONFIG_DATA.customers);
  const [expandedCustomerIds, setExpandedCustomerIds] = useState<string[]>(["cust-04"]);
  const [selectedHub, setSelectedHub] = useState<string>("van-02");
  const [isSyncing, setIsSyncing] = useState(false);

  // Live Reefer Van Telemetry Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setVanProgress((prev) => (prev >= 98 ? 0 : prev + 2));
      setLiveTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.2;
        return Number((Math.max(-19.2, Math.min(-17.8, prev + delta))).toFixed(1));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // REAL-TIME DYNAMIC MATH CALCULATIONS FROM SLIDERS
  const baseMonthlyRev = 48.5; // Lakhs INR
  const coldRoomRevLift = (coldRoomExpansionPct / 100) * 16.5; // Up to +16.5 Lakhs
  const agencyRevLift = newAgenciesCount * 6.8; // Up to +34.0 Lakhs
  const vanRevLift = (reeferVanCount - 2) * 4.2; // Up to +25.2 Lakhs
  const digitalRevLift = (digitalAdoptionPct / 100) * 8.4; // Up to +8.4 Lakhs

  const totalProjectedMonthlyRev = baseMonthlyRev + coldRoomRevLift + agencyRevLift + vanRevLift + digitalRevLift;
  const addedRevGain = totalProjectedMonthlyRev - baseMonthlyRev;
  const deliveryTimeNoidaMins = Math.max(35, Math.round(140 - reeferVanCount * 18));
  const totalCapexLakhs = (coldRoomExpansionPct * 0.15) + (newAgenciesCount * 3.2) + ((reeferVanCount - 2) * 5.5) + (digitalAdoptionPct * 0.05);

  // Generate 12-Month Projected Trajectory Points for Dynamic SVG Chart
  const generateChartPoints = () => {
    const points: number[] = [];
    for (let month = 0; month < 12; month++) {
      const growthFactor = 1 + (month / 11) * (addedRevGain / baseMonthlyRev);
      points.push(baseMonthlyRev * growthFactor);
    }
    return points;
  };

  const chartPoints = generateChartPoints();
  const maxChartVal = Math.max(...chartPoints, 110);
  const svgPathD = chartPoints
    .map((val, idx) => {
      const x = (idx / 11) * 760 + 20;
      const y = 220 - (val / maxChartVal) * 180;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const svgAreaD = `${svgPathD} L 780 230 L 20 230 Z`;

  const toggleCustomerAccordion = (id: string) => {
    setExpandedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

  const handleSendWhatsApp = (cust: typeof customers[0]) => {
    const text = encodeURIComponent(
      `Namaste ${cust.contactPerson}! SG Trading Company (Rahul Garg & Sonu, Mayur Vihar Phase-3) here.\n\n` +
      `Fresh -18°C cold chain stock of McCain 9mm Fries, Britannia Diced Mozzarella & Veeba Mayo is ready for express dispatch today to ${cust.name}.\n\n` +
      `📦 Direct Wholesale Rates & GST Input (07ADQFS8839Q1ZQ) Guaranteed.\n` +
      `📞 Call/WhatsApp: 9667731355 / 9643097002`
    );
    window.open(`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white pb-32 relative overflow-hidden">
      {/* Ambient Neon Background Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 w-[700px] h-[400px] rounded-full bg-sky-500/10 blur-[160px]" />

      {/* Futuristic Glass Command Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-2xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-mono-spec font-black flex items-center gap-2 border border-slate-800 transition-all shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Wholesale Catalog</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-mono-spec font-black uppercase shadow-md">
                  REAL-TIME SIMULATION WAR ROOM 3.0
                </span>
                <span className="text-xs text-emerald-400 font-mono-spec font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>Live Reefer Telemetry: {liveTemp}°C</span>
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-white tracking-tight mt-0.5">
                SG Trading Company • Real-Time Interactive Growth Cockpit
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAutonomousMarketScan}
              disabled={isSyncing}
              className="px-4 py-2 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-mono-spec font-black text-xs flex items-center gap-2 border border-emerald-500/40 transition-all cursor-pointer shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Auto-Scanning Market..." : "Run Autonomous Daily Resync"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-6 md:px-12 pt-8 space-y-12 relative z-10">
        {/* MILESTONE CONFETTI BANNER WHEN SIMULATION REACHES ₹75+ LAKHS/MO */}
        {totalProjectedMonthlyRev >= 75 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 text-slate-950 font-mono-spec flex flex-wrap items-center justify-between gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 shrink-0 font-black" />
              <div>
                <span className="text-xs font-black uppercase tracking-wider block">
                  🎉 STRATEGIC MILESTONE REACHED: EXECUTIVE HYPER-GROWTH TRAJECTORY!
                </span>
                <span className="text-sm font-black">
                  Your active scenario configuration projects ₹{totalProjectedMonthlyRev.toFixed(2)} Lakhs/mo (₹{(totalProjectedMonthlyRev * 12).toFixed(1)} Lakhs/yr) run-rate!
                </span>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black text-xs">
              CAPEX PAYBACK: ~{(totalCapexLakhs / addedRevGain).toFixed(1)} MONTHS
            </span>
          </div>
        )}

        {/* SECTION 1: REAL-TIME INTERACTIVE RANGE SLIDER COCKPIT & LIVE DYNAMIC AREA TREND CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Cols: Real-Time Interactive Range Sliders */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/70 backdrop-blur-xl border-2 border-slate-800/80 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-mono-spec text-amber-400 font-black uppercase">
                  LIVE INTERACTIVE CONTROLS
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  Real-Time Scenario Sliders
                </h2>
              </div>
              <Sliders className="w-6 h-6 text-amber-400" />
            </div>

            <p className="text-xs text-slate-300">
              Drag any slider below to watch the 12-month revenue trajectory, delivery times, and financial gauges recalculate live!
            </p>

            <div className="space-y-6">
              {/* Slider 1: Cold Room Expansion Pct */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono-spec">
                  <span className="text-slate-200 font-bold">1. Cold Room 1 Capacity Expansion</span>
                  <span className="text-amber-400 font-black text-sm">+{coldRoomExpansionPct}% Space</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={coldRoomExpansionPct}
                  onChange={(e) => setColdRoomExpansionPct(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                  <span>Current (-18°C Room 1)</span>
                  <span className="text-emerald-400 font-bold">+₹{coldRoomRevLift.toFixed(1)} Lakhs/mo Lift</span>
                </div>
              </div>

              {/* Slider 2: New Authorized Agency Tie-Ups */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono-spec">
                  <span className="text-slate-200 font-bold">2. New FMCG Agency Tie-Ups</span>
                  <span className="text-emerald-400 font-black text-sm">{newAgenciesCount} Brands Target</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={newAgenciesCount}
                  onChange={(e) => setNewAgenciesCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                  <span>HyFun, Godrej Yummiez, Dabur...</span>
                  <span className="text-emerald-400 font-bold">+₹{agencyRevLift.toFixed(1)} Lakhs/mo Lift</span>
                </div>
              </div>

              {/* Slider 3: Dedicated Reefer Van Fleet */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono-spec">
                  <span className="text-slate-200 font-bold">3. Dedicated Reefer Fleet Size</span>
                  <span className="text-sky-400 font-black text-sm">{reeferVanCount} Cold Vans</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={reeferVanCount}
                  onChange={(e) => setReeferVanCount(Number(e.target.value))}
                  className="w-full accent-sky-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                  <span>Noida Express Speed: <strong className="text-white">{deliveryTimeNoidaMins} mins</strong></span>
                  <span className="text-sky-400 font-bold">+₹{vanRevLift.toFixed(1)} Lakhs/mo Lift</span>
                </div>
              </div>

              {/* Slider 4: Digital B2B Order Adoption */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono-spec">
                  <span className="text-slate-200 font-bold">4. Web Portal B2B Self-Service</span>
                  <span className="text-amber-400 font-black text-sm">{digitalAdoptionPct}% Orders</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={digitalAdoptionPct}
                  onChange={(e) => setDigitalAdoptionPct(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                  <span>Automated WhatsApp/Web Portal</span>
                  <span className="text-amber-400 font-bold">+₹{digitalRevLift.toFixed(1)} Lakhs/mo Lift</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: DYNAMIC LIVE SVG AREA CHART & LIVE COUNTING METERS */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/70 backdrop-blur-xl border-2 border-amber-500/60 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-mono-spec text-amber-400 font-black uppercase">
                  DYNAMIC TRAJECTORY CURVE (MORPHS IN REAL TIME)
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white">
                  12-Month Projected Wholesale Revenue Run-Rate
                </h3>
              </div>

              <div className="text-right font-mono-spec">
                <span className="text-xs text-slate-400 block">TOTAL SIMULATED RUN-RATE</span>
                <span className="text-3xl font-black text-amber-400">
                  ₹{totalProjectedMonthlyRev.toFixed(2)} <span className="text-xs text-slate-400">L/mo</span>
                </span>
              </div>
            </div>

            {/* LIVE DYNAMIC SVG AREA TREND CHART */}
            <div className="py-6 relative">
              <svg viewBox="0 0 800 240" className="w-full h-auto max-h-[220px]">
                <defs>
                  <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                <line x1="20" y1="40" x2="780" y2="40" stroke="rgba(255,255,255,0.06)" />
                <line x1="20" y1="100" x2="780" y2="100" stroke="rgba(255,255,255,0.06)" />
                <line x1="20" y1="160" x2="780" y2="160" stroke="rgba(255,255,255,0.06)" />
                <line x1="20" y1="220" x2="780" y2="220" stroke="rgba(255,255,255,0.12)" />

                {/* Area Fill */}
                <path d={svgAreaD} fill="url(#areaGlow)" className="transition-all duration-300 ease-out" />

                {/* Dynamic Curve Line */}
                <path
                  d={svgPathD}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />

                {/* Monthly Data Points */}
                {chartPoints.map((val, idx) => {
                  const x = (idx / 11) * 760 + 20;
                  const y = 220 - (val / maxChartVal) * 180;
                  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  return (
                    <g key={idx}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#070A12"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        className="transition-all duration-300"
                      />
                      <text
                        x={x}
                        y={240}
                        fill="#94A3B8"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {months[idx]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom KPI Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 font-mono-spec text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Net Incremental Lift:</span>
                <span className="text-emerald-400 font-black text-base">+₹{addedRevGain.toFixed(2)} Lakhs/mo</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Estimated CAPEX Needed:</span>
                <span className="text-sky-400 font-black text-base">₹{totalCapexLakhs.toFixed(1)} Lakhs</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Noida Reefer Express Speed:</span>
                <span className="text-amber-400 font-black text-base">{deliveryTimeNoidaMins} Mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: TESLA/SPACEX-GRADE MULTI-FLEET GPS TELEMETRY & DISPATCH WAR-ROOM */}
        <section className="rounded-3xl bg-slate-950/90 backdrop-blur-2xl border-2 border-amber-500/60 p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.12)] relative overflow-hidden">
          {/* Ambient Cyberpunk Background Radial Glows */}
          <div className="pointer-events-none absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px]" />

          {/* Ambient Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-5 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-mono-spec font-black uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>MULTIDIMENSIONAL HOLOGRAPHIC TELEMETRY GRID • MAYUR VIHAR PHASE-3 HUB</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Live Refrigerated Fleet GPS Dispatch &amp; Cold-Chain Surveillance
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
                Real-time multi-vehicle telemetry originating from Rahul Garg &amp; Sonu’s B-577 Mayur Vihar Phase-3 Cold Room 1 across Delhi NCR institutional destinations.
              </p>
            </div>

            {/* Active Fleet Selection Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-mono-spec text-xs">
              {[
                {
                  id: "van-01",
                  code: "REEFER-01",
                  dest: "Radisson Blu Kaushambi",
                  temp: "-18.4°C",
                  cargo: "35 Cases McCain Fries & Britannia Mozzarella",
                  eta: "12 mins",
                },
                {
                  id: "van-02",
                  code: "REEFER-02",
                  dest: "Noida Sec-62 Burger Singh",
                  temp: "-18.1°C",
                  cargo: "45 Cases McCain Fries & Veeba Mayo",
                  eta: "24 mins",
                },
                {
                  id: "van-03",
                  code: "REEFER-03",
                  dest: "Indirapuram EatClub Cloud Hub",
                  temp: "-18.5°C",
                  cargo: "40 Cases ITC Master Chef & Cheese Balls",
                  eta: "16 mins",
                },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedHub(v.id)}
                  className={`px-4 py-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedHub === v.id
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-black"
                      : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 font-bold"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <div className="text-left">
                    <span className="block text-[10px] uppercase opacity-80">{v.code} • {v.temp}</span>
                    <span className="block text-xs truncate max-w-[140px]">{v.dest}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Fleet Telemetry Map + Live Active Vehicle Inspection Cockpit Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
            {/* Left 8 Cols: FUTURISTIC MULTI-DIMENSIONAL GLASSMORPHIC HOLOGRAPHIC GIS MAP */}
            <div className="lg:col-span-8 rounded-3xl bg-[#060911] border-2 border-slate-800/90 p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
              {/* Holographic Isometric Perspective Container */}
              <div className="relative w-full flex-1 flex items-center justify-center py-4">
                <svg
                  viewBox="0 0 880 320"
                  className="w-full h-auto max-h-[310px] relative z-10"
                  style={{
                    filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.8))",
                  }}
                >
                  <defs>
                    {/* Glowing Laser Vectors Gradients */}
                    <linearGradient id="laserGold" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="laserEmerald" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Cyberpunk Holographic Grid Lines */}
                  <g opacity="0.18">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 22}
                        x2="880"
                        y2={i * 22}
                        stroke="#38BDF8"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                      />
                    ))}
                    {Array.from({ length: 25 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 36}
                        y1="0"
                        x2={i * 36}
                        y2="320"
                        stroke="#38BDF8"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                      />
                    ))}
                  </g>

                  {/* Concentric Cell-Tower GPS Triangulation Rings around Driver Phone Pings */}
                  <circle
                    cx="220"
                    cy="160"
                    r="80"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.18"
                    strokeDasharray="8 6"
                  />
                  <circle
                    cx="220"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1"
                    opacity="0.12"
                  />

                  {/* VECTOR LASER BEAM ROUTE 1: Mayur Vihar (220, 160) -> Kaushambi Radisson (130, 65) */}
                  <path
                    d="M 220 160 L 130 65"
                    stroke={selectedHub === "van-01" ? "#F59E0B" : "rgba(16, 185, 129, 0.45)"}
                    strokeWidth={selectedHub === "van-01" ? "6" : "2.5"}
                    filter="url(#neonGlow)"
                    strokeDasharray="8 4"
                  />

                  {/* VECTOR LASER BEAM ROUTE 2: Mayur Vihar (220, 160) -> Noida Sec-62 Burger Singh (710, 120) */}
                  <path
                    d="M 220 160 L 710 120"
                    stroke={selectedHub === "van-02" ? "#F59E0B" : "rgba(16, 185, 129, 0.45)"}
                    strokeWidth={selectedHub === "van-02" ? "6" : "2.5"}
                    filter="url(#neonGlow)"
                    strokeDasharray="8 4"
                  />

                  {/* VECTOR LASER BEAM ROUTE 3: Mayur Vihar (220, 160) -> Indirapuram EatClub Hub (650, 245) */}
                  <path
                    d="M 220 160 L 650 245"
                    stroke={selectedHub === "van-03" ? "#F59E0B" : "rgba(16, 185, 129, 0.45)"}
                    strokeWidth={selectedHub === "van-03" ? "6" : "2.5"}
                    filter="url(#neonGlow)"
                    strokeDasharray="8 4"
                  />

                  {/* CENTRAL VOLUMETRIC WAREHOUSE PILLAR: B-577 MAYUR VIHAR-3 CENTRAL WAREHOUSE */}
                  <ellipse cx="220" cy="160" rx="42" ry="20" fill="rgba(245, 158, 11, 0.22)" />
                  <ellipse cx="220" cy="160" rx="26" ry="12" fill="rgba(245, 158, 11, 0.4)" />
                  <circle cx="220" cy="160" r="16" fill="#F59E0B" filter="url(#neonGlow)" />
                  <circle cx="220" cy="160" r="6" fill="#060911" />
                  <text
                    x="220"
                    y="212"
                    fill="#F59E0B"
                    fontSize="11"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    🏢 B-577 MAYUR VIHAR-3 CENTRAL COLD ROOM (-18°C)
                  </text>

                  {/* DESTINATION NODE 1: Radisson Blu Kaushambi */}
                  <circle cx="130" cy="65" r="16" fill={selectedHub === "van-01" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                  <text
                    x="130"
                    y="42"
                    fill="#E2E8F0"
                    fontSize="10"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    🏨 RADISSON BLU KAUSHAMBI (12m)
                  </text>

                  {/* DESTINATION NODE 2: Noida Sec-62 Burger Singh */}
                  <circle cx="710" cy="120" r="16" fill={selectedHub === "van-02" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                  <text
                    x="710"
                    y="96"
                    fill="#E2E8F0"
                    fontSize="10"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    🍔 NOIDA SEC-62 BURGER SINGH (24m)
                  </text>

                  {/* DESTINATION NODE 3: Indirapuram EatClub */}
                  <circle cx="650" cy="245" r="16" fill={selectedHub === "van-03" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                  <text
                    x="650"
                    y="275"
                    fill="#E2E8F0"
                    fontSize="10"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ☁️ INDIRAPURAM EATCLUB CLOUD HUB (16m)
                  </text>

                  {/* HOLOGRAPHIC MOVING REEFER VAN 1 (Radisson Route) */}
                  {(() => {
                    const p = (vanProgress % 100) / 100;
                    const vx = 220 + (130 - 220) * p;
                    const vy = 160 + (65 - 160) * p;
                    return (
                      <g transform={`translate(${vx}, ${vy})`}>
                        <circle cx="0" cy="0" r="16" fill={selectedHub === "van-01" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                        <text x="0" y="4" fill="#060911" fontSize="11" textAnchor="middle">🚚</text>
                      </g>
                    );
                  })()}

                  {/* HOLOGRAPHIC MOVING REEFER VAN 2 (Noida Sec-62 Route) */}
                  {(() => {
                    const p = ((vanProgress + 35) % 100) / 100;
                    const vx = 220 + (710 - 220) * p;
                    const vy = 160 + (120 - 160) * p;
                    return (
                      <g transform={`translate(${vx}, ${vy})`}>
                        <circle cx="0" cy="0" r="18" fill={selectedHub === "van-02" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                        <text x="0" y="5" fill="#060911" fontSize="12" textAnchor="middle">🚛</text>
                        <rect
                          x="-32"
                          y="-32"
                          width="64"
                          height="16"
                          rx="4"
                          fill="#060911"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                        />
                        <text
                          x="0"
                          y="-20"
                          fill="#F59E0B"
                          fontSize="9"
                          fontWeight="black"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {liveTemp}°C • {vanProgress}%
                        </text>
                      </g>
                    );
                  })()}

                  {/* HOLOGRAPHIC MOVING REEFER VAN 3 (Indirapuram Route) */}
                  {(() => {
                    const p = ((vanProgress + 70) % 100) / 100;
                    const vx = 220 + (650 - 220) * p;
                    const vy = 160 + (245 - 160) * p;
                    return (
                      <g transform={`translate(${vx}, ${vy})`}>
                        <circle cx="0" cy="0" r="16" fill={selectedHub === "van-03" ? "#F59E0B" : "#10B981"} filter="url(#neonGlow)" />
                        <text x="0" y="4" fill="#060911" fontSize="11" textAnchor="middle">🚐</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Bottom Holographic HUD Glass Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono-spec relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">
                    GPS Telemetry Anchor: <strong className="text-amber-400">28.6015° N, 77.3328° E</strong>
                  </span>
                </div>
                <span className="text-emerald-400 font-black flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3D ISOMETRIC COLD-CHAIN TELEMETRY GRID UNBROKEN (-18°C OK)</span>
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Live Active Vehicle & Phone-Based Driver Tracking Inspection Box */}
            <div className="lg:col-span-4 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border-2 border-amber-500/80 p-5 space-y-4 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono-spec text-amber-400 font-black uppercase flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                      <span>PHONE-BASED DRIVER GPS TELEMETRY</span>
                    </span>
                    <h3 className="text-base font-black text-white mt-0.5">
                      {selectedHub === "van-01"
                        ? "REEFER-01 • Radisson Blu Express"
                        : selectedHub === "van-03"
                        ? "REEFER-03 • Indirapuram Cloud Express"
                        : "REEFER-02 • Noida Sec-62 QSR Route"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-black border border-emerald-500/40">
                    PHONE PING ACTIVE
                  </span>
                </div>

                {/* Driver Phone Number Switcher */}
                <div className="pt-3 space-y-2">
                  <span className="text-[10px] font-mono-spec text-slate-400 uppercase font-bold block">
                    Select Driver Phone to Track Progress:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { phone: "+91 9667731355", name: "Sonu & Ramesh" },
                      { phone: "+91 9643097002", name: "Rahul Garg Desk" },
                      { phone: "+91 9811223344", name: "Vikram Logistics" },
                    ].map((d) => (
                      <button
                        key={d.phone}
                        onClick={() => setSelectedDriverPhone(d.phone)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedDriverPhone === d.phone
                            ? "bg-amber-500/20 border-amber-500 text-amber-400 font-extrabold"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="block text-[9px] uppercase font-mono-spec">{d.name}</span>
                        <span className="block text-xs font-mono-spec">{d.phone}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Driver Phone Live Status Timeline (Mobile Progress Switcher) */}
                <div className="pt-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-spec">
                    <span className="text-slate-400 uppercase font-bold">Driver Phone Status Update:</span>
                    <span className="text-emerald-400 font-bold">Pinged {lastPhonePingSec}s ago</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 font-mono-spec text-[10px]">
                    {[
                      { id: "LOADED", label: "1. 📦 Loaded @ B-577" },
                      { id: "TRANSIT", label: "2. 🚚 Moving (-18°C)" },
                      { id: "DOCK", label: "3. 🛑 Arrived Dock" },
                      { id: "DELIVERED", label: "4. ✅ Signed Delivery" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setDriverMilestone(m.id as any)}
                        className={`py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                          driverMilestone === m.id
                            ? "bg-emerald-500 text-slate-950 font-black border-emerald-400"
                            : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 font-mono-spec text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Phone GPS Signal:</span>
                      <span className="text-sm font-black text-emerald-400">94% Battery • 5G</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Mayur Vihar Cell Hub</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Freezer Sensor:</span>
                      <span className="text-sm font-black text-sky-400">{liveTemp}°C Sync</span>
                      <span className="text-[9px] text-emerald-400 block mt-0.5">Bluetooth Beacon</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">
                      Active Customer Dispatch Manifest:
                    </span>
                    <p className="text-xs text-white font-bold leading-relaxed">
                      {selectedHub === "van-01"
                        ? "35 Cases (McCain Fries + Britannia Mozzarella)"
                        : selectedHub === "van-03"
                        ? "40 Cases (ITC Master Chef + Potato Cheese Balls)"
                        : "45 Cases (McCain Fries + Veeba Eggless Mayo)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Namaste ${selectedDriverPhone}! SG Trading Company Central Command (B-577 Mayur Vihar-3) here.\n\n` +
                      `Please confirm your live phone GPS status & cold room temp reading for ${selectedHub.toUpperCase()} shipment.\n` +
                      `GST Invoice: 07ADQFS8839Q1ZQ`
                    );
                    window.open(`https://wa.me/${selectedDriverPhone.replace(/[^0-9]/g, "")}?text=${text}`, "_blank");
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ping Driver Phone ({selectedDriverPhone}) via WhatsApp</span>
                </button>

                <button
                  onClick={() => alert(`Official GPS Temperature & Driver Phone Location Log Certificate downloaded for ${selectedDriverPhone}.`)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Phone GPS Audit Log</span>
                </button>
              </div>
            </div>
          </div>

          {/* VISUAL ENHANCEMENT: B-577 MAYUR VIHAR-3 COLD ROOM 1 PALLET STORAGE RACK SURVEILLANCE */}
          <div className="p-5 rounded-2xl bg-[#080C14] border border-slate-800/90 space-y-4 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono-spec text-amber-400 font-black uppercase tracking-wider block">
                  PALLET INVENTORY SURVEILLANCE • B-577 MAYUR VIHAR PHASE-3 COLD ROOM 1 (-18°C)
                </span>
                <h4 className="text-base font-black text-white">
                  Real-Time Authorized SKU Pallet Rack Utilization
                </h4>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-black border border-emerald-500/40">
                TOTAL STOCK: 1,420 MASTER CASES READY FOR EXPRESS DISPATCH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-spec text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-extrabold">McCain Pallet Rack A</span>
                  <span className="text-emerald-400 font-black">88% FULL</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-400 w-[88%]" />
                </div>
                <span className="text-[10px] text-slate-400 block">450 Cases • 9mm Fries &amp; Cheese Balls</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-extrabold">Britannia Dairy Rack B</span>
                  <span className="text-amber-400 font-black">74% FULL</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-amber-400 w-[74%]" />
                </div>
                <span className="text-[10px] text-slate-400 block">320 Cases • Diced Mozzarella &amp; Slices</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-extrabold">Veeba Commercial Rack C</span>
                  <span className="text-emerald-400 font-black">92% FULL</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-400 w-[92%]" />
                </div>
                <span className="text-[10px] text-slate-400 block">380 Cases • Eggless Mayo &amp; Pizza Sauces</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-extrabold">ITC Master Chef Rack D</span>
                  <span className="text-sky-400 font-black">65% FULL</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-sky-400 w-[65%]" />
                </div>
                <span className="text-[10px] text-slate-400 block">270 Cases • Retort Gravies &amp; Nuggets</span>
              </div>
            </div>
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendWhatsApp(cust)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/40 font-mono-spec text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Quote</span>
                      </button>

                      <button
                        onClick={() => toggleCustomerAccordion(cust.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-mono-spec text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Acquisition Plan" : "Show Acquisition Plan"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
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
