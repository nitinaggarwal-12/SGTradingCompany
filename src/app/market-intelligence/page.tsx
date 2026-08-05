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

export default function MarketIntelligenceDashboardPage() {
  const [scenarios, setScenarios] = useState<WhatIfScenario[]>(INITIAL_SCENARIOS);
  const [marketTrends, setMarketTrends] = useState(MARKET_CONFIG_DATA.marketTrends);
  const [recommendedAgencies, setRecommendedAgencies] = useState(MARKET_CONFIG_DATA.recommendedAgencies);
  const [customers, setCustomers] = useState(MARKET_CONFIG_DATA.customers);
  const [expandedCustomerIds, setExpandedCustomerIds] = useState<string[]>(["cust-04"]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [selectedCustomerRiskFilter, setSelectedCustomerRiskFilter] = useState<string>("all");
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [isAdminEditorOpen, setIsAdminEditorOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [newAgencyName, setNewAgencyName] = useState("");
  const [newAgencyReason, setNewAgencyReason] = useState("");

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

  const toggleSelectCustomer = (id: string) => {
    setSelectedCustomerIds((prev) =>
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

  const activeScenarios = scenarios.filter((s) => s.active);
  const baseMonthlyRev = MARKET_CONFIG_DATA.baseMonthlyRevenueLakhs;
  const addedRevGain = activeScenarios.reduce((acc, s) => acc + s.projectedRevenueGainLakhs, 0);
  const totalProjectedMonthlyRev = baseMonthlyRev + addedRevGain;
  const totalInvestment = activeScenarios.reduce((acc, s) => acc + s.investmentRequiredLakhs, 0);
  const avgMarginLift = activeScenarios.length > 0
    ? (activeScenarios.reduce((acc, s) => acc + s.projectedMarginImpactPct, 0) / activeScenarios.length).toFixed(1)
    : "0.0";
  const annualRevGain = (addedRevGain * 12).toFixed(1);

  const filteredCustomers = customers.filter((c) => {
    if (selectedCustomerRiskFilter === "safe") return c.paymentRiskPct <= 6;
    if (selectedCustomerRiskFilter === "moderate") return c.paymentRiskPct > 6 && c.paymentRiskPct <= 12;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Top Sticky Header Bar */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono-spec font-bold flex items-center gap-2 border border-slate-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Wholesale Catalog</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono-spec font-black uppercase border border-amber-500/40">
                  VISUAL STRATEGIC COMMAND CENTER
                </span>
                <span className="text-xs text-emerald-400 font-mono-spec font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live NCR Telemetry Verified
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                SG Trading Company • Market Intelligence &amp; Customer Growth Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunAutonomousMarketScan}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-mono-spec font-bold text-xs flex items-center gap-2 border border-emerald-500/40 transition-all cursor-pointer shadow-lg"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Auto-Scanning..." : "Run Autonomous Daily Resync"}</span>
            </button>

            <button
              onClick={() => setIsAdminEditorOpen(!isAdminEditorOpen)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-mono-spec font-bold text-xs flex items-center gap-2 border border-amber-500/40 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isAdminEditorOpen ? "Close Live Editor" : "+ Add Agency Target"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-6 md:px-12 pt-8 space-y-12">
        {/* EXECUTIVE VISUAL KPI CONSOLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="industrial-card p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/60 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase">
                PROJECTED MONTHLY REVENUE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                +{((addedRevGain / baseMonthlyRev) * 100).toFixed(1)}% UP
              </span>
            </div>
            <div className="text-4xl font-black text-white font-mono-spec tracking-tight">
              ₹{totalProjectedMonthlyRev.toFixed(2)} <span className="text-sm font-normal text-slate-400">L/mo</span>
            </div>
            {/* Visual Progress Trajectory Bar */}
            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${Math.min((totalProjectedMonthlyRev / 100) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono-spec text-slate-400">
              <span>Base: ₹{baseMonthlyRev.toFixed(2)}L</span>
              <span className="text-emerald-400 font-bold">Gain: +₹{addedRevGain.toFixed(2)}L</span>
            </div>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>ANNUAL REVENUE OPPORTUNITY</span>
              <span className="text-sky-400 font-bold">FY2026-27</span>
            </div>
            <div className="text-4xl font-black text-sky-400 font-mono-spec">
              +₹{annualRevGain} <span className="text-sm font-normal text-slate-400">Lakhs/yr</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              📈 Incremental volume from new agencies &amp; cold room expansion.
            </div>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>GROSS MARGIN ENHANCEMENT</span>
              <span className="text-amber-400 font-bold">BLENDED LIFT</span>
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono-spec">
              +{avgMarginLift}% <span className="text-sm font-normal text-slate-400">Margin</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              🧀 High-margin commercial cheese stretch &amp; direct agency rebates.
            </div>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>ACTIVE STRATEGIC SCENARIOS</span>
              <span className="text-emerald-400 font-bold">{activeScenarios.length} / {scenarios.length} ON</span>
            </div>
            <div className="text-4xl font-black text-emerald-400 font-mono-spec">
              ₹{totalInvestment.toFixed(1)} <span className="text-sm font-normal text-slate-400">L CAPEX</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              ⏱️ Average Payback Horizon: <strong className="text-white">3.8 Months</strong>
            </div>
          </div>
        </div>

        {/* VISUAL CHART 1: INTERACTIVE MARKET DEMAND VELOCITY HORIZONTAL BAR CHART */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>VISUAL ANALYTICS • REAL-TIME PRODUCT DEMAND VELOCITY METER</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Fastest-Growing HORECA &amp; GT Categories (Delhi NCR Field Survey)
              </h2>
            </div>

            {/* Interactive Category Filter Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-spec text-slate-400">Filter Segment:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono-spec font-bold text-amber-400 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All High-Demand Categories (4)</option>
                <option value="HORECA Frozen">HORECA Frozen &amp; Retort Gravies</option>
                <option value="Dairy Cheese">Commercial Cheese Stretch</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Animated Horizontal Bar Chart Cards */}
            <div className="lg:col-span-7 space-y-4">
              {marketTrends.map((item, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 transition-all space-y-3 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs font-mono-spec">
                        #{idx + 1}
                      </div>
                      <span className="font-extrabold text-sm text-white group-hover:text-amber-400 transition-colors">
                        {item.category}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-black border border-emerald-500/40">
                      {item.growth}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-10">
                    {item.driver}
                  </p>

                  {/* Visual Progress Bar Gauge */}
                  <div className="pl-10 space-y-1">
                    <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800/80">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000 group-hover:brightness-125`}
                        style={{ width: item.barWidth }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono-spec text-slate-400">
                      <span>{item.impact}</span>
                      <span className="text-amber-400 font-bold">Demand Surge Score: {item.barWidth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Recommended New FMCG Agency Acquisition Cards */}
            <div className="lg:col-span-5 industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Top Recommended New Agencies to Tie Up With</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-bold">
                  {recommendedAgencies.length} Targets
                </span>
              </div>

              <div className="space-y-3">
                {recommendedAgencies.map((agency, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-white">{agency.brand}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-spec font-black border ${agency.statusColor}`}>
                        {agency.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{agency.reason}</p>
                    <button
                      onClick={() => alert(`Initiating distribution partnership workflow for ${agency.brand}`)}
                      className="w-full py-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono-spec font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Initiate Agency Partnership Inquiry</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: COLLAPSIBLE VISUAL CUSTOMER CRM & CREDIT RISK ACCORDIONS */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>VISUAL CUSTOMER CRM • COLLAPSIBLE ACCORDION PROFILES &amp; OUTREACH</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Target Accounts, Payment Risk % &amp; Interactive Dropdown Profiles
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click any customer card accordion dropdown to inspect full operational background, why he is a good customer, and step-by-step acquisition recommendations.
              </p>
            </div>

            {/* Interactive Risk Filter Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono-spec">
                <button
                  onClick={() => setSelectedCustomerRiskFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCustomerRiskFilter === "all"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All Accounts ({customers.length})
                </button>
                <button
                  onClick={() => setSelectedCustomerRiskFilter("safe")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCustomerRiskFilter === "safe"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Ultra-Safe (≤6% Risk)
                </button>
              </div>

              <button
                onClick={() => {
                  if (expandedCustomerIds.length === customers.length) {
                    setExpandedCustomerIds([]);
                  } else {
                    setExpandedCustomerIds(customers.map((c) => c.id));
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-spec font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
                <span>{expandedCustomerIds.length === customers.length ? "Collapse All Details" : "Expand All Dropdowns"}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Customer Cards Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCustomers.map((cust) => {
              const isExpanded = expandedCustomerIds.includes(cust.id);
              const isSelected = selectedCustomerIds.includes(cust.id);
              return (
                <div
                  key={cust.id}
                  className={`industrial-card rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected
                      ? "bg-slate-900 border-amber-400 shadow-xl"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Card Visible Summary Header */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleSelectCustomer(cust.id)}
                          className="mt-1 text-slate-400 hover:text-amber-400 cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-amber-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec font-bold uppercase">
                              {cust.segment}
                            </span>
                            <span className="text-[11px] text-amber-400 font-mono-spec font-bold">
                              • {cust.monthlyCaseVolume}
                            </span>
                          </div>
                          <h3 className="text-base font-extrabold text-white mt-1">
                            {cust.name}
                          </h3>
                        </div>
                      </div>

                      {/* Visual Circular/Horizontal Meters */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right font-mono-spec">
                          <span className="text-[9px] text-slate-400 uppercase block">Payment Risk</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs border border-emerald-500/40">
                            {cust.paymentRiskPct}% RISK
                          </span>
                        </div>
                        <div className="text-right font-mono-spec">
                          <span className="text-[9px] text-slate-400 uppercase block">Acceptance</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-black text-xs border border-amber-500/40">
                            {cust.acceptanceRatePct}% WIN
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Visual Progress Bars for Risk & Acceptance */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                          <span>Credit Safety Gauge:</span>
                          <span className="text-emerald-400 font-bold">{100 - cust.paymentRiskPct}% Safe</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: `${100 - cust.paymentRiskPct}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono-spec text-slate-400">
                          <span>Acquisition Probability:</span>
                          <span className="text-amber-400 font-bold">{cust.acceptanceRatePct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: `${cust.acceptanceRatePct}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Decision Maker & Quick CTAs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
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

                        {/* INTERACTIVE DROPDOWN ACCORDION BUTTON */}
                        <button
                          onClick={() => toggleCustomerAccordion(cust.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-mono-spec text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Background" : "Full Profile & Strategy"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* COLLAPSIBLE INTERACTIVE DROPDOWN DETAILS AREA */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-950 border-t-2 border-slate-800 space-y-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-mono-spec font-bold text-amber-400 uppercase block">
                            ⭐ WHY HE IS A GOOD CUSTOMER:
                          </span>
                          <p className="text-xs text-slate-200 font-medium leading-relaxed">
                            {cust.whyGoodCustomer}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-mono-spec font-bold text-slate-400 uppercase block">
                            📋 LONG-TERM RUN &amp; PAYMENT EVALUATION:
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {cust.longTermEvaluation}
                          </p>
                        </div>
                      </div>

                      {/* Actionable Step-by-Step Acquisition Plan */}
                      {cust.acquisitionRecommendations && (
                        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2">
                          <span className="text-xs font-mono-spec font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Target className="w-4 h-4" />
                            <span>CUSTOMIZED ACQUISITION RECOMMENDATIONS (HOW TO WIN THIS ACCOUNT):</span>
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
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* VISUAL CHART 2: REGIONAL COMPETITOR VISUAL PERFORMANCE SCORECARD */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>VISUAL BENCHMARKS • COMPETITOR SCORECARD METERS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Where SG Trading Company Dominates vs. Regional Competitors
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SG Trading Company Scorecard */}
            <div className="industrial-card p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-mono-spec font-black uppercase">
                    OUR OVERALL SCORE: 98/100
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    🏆 SG Trading Company (Mayur Vihar-3)
                  </h3>
                </div>
                <Flame className="w-6 h-6 text-amber-400" />
              </div>

              <div className="space-y-3 font-mono-spec text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>-18°C Cold Chain Assurance:</span>
                    <span className="text-emerald-400 font-bold">100% Verified</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Delivery Speed (East Delhi/Noida):</span>
                    <span className="text-amber-400 font-bold">2 - 4 Hours</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-11/12" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Low MOQ Flexibility:</span>
                    <span className="text-emerald-400 font-bold">1 Master Case</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Metro Cash & Carry Scorecard */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec font-bold uppercase">
                    COMPETITOR SCORE: 74/100
                  </span>
                  <h3 className="text-lg font-bold text-slate-200 mt-1">
                    Metro Cash &amp; Carry / Reliance B2B
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-mono-spec text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>-18°C Cold Chain Assurance:</span>
                    <span className="text-amber-400 font-bold">70% (Defrost Risk)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-7/10" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Delivery Speed:</span>
                    <span className="text-slate-300 font-bold">24 - 48 Hours</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mandi Wholesalers Scorecard */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec font-bold uppercase">
                    UNORGANIZED SCORE: 45/100
                  </span>
                  <h3 className="text-lg font-bold text-slate-200 mt-1">
                    Ghazipur / Mandi Cash Traders
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-mono-spec text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>-18°C Cold Chain Assurance:</span>
                    <span className="text-red-400 font-bold">30% (High Defrost)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-3/10" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>GST B2B Compliance:</span>
                    <span className="text-red-400 font-bold">Uncertain Kachha Bill</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-2/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE WHAT-IF SCENARIO MANAGER & LIVE SLIDER SIMULATOR */}
        <section id="whatif-simulator" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>INTERACTIVE WHAT-IF SCENARIO MANAGER &amp; LIVE ADOPTION SIMULATOR</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Simulate Strategic Growth Moves Live
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              {scenarios.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => toggleScenario(sc.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    sc.active
                      ? "bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10"
                      : "bg-slate-950/70 border-slate-800 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec uppercase">
                          {sc.category}
                        </span>
                        {sc.active && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-spec font-black">
                            ● SCENARIO ACTIVE IN PROJECTION
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-white">{sc.name}</h4>
                      <p className="text-xs text-slate-300">{sc.description}</p>
                    </div>

                    <div className="text-right font-mono-spec shrink-0">
                      <span className="text-xs text-slate-400 block">Monthly Lift</span>
                      <span className="text-lg font-black text-emerald-400">
                        +₹{sc.projectedRevenueGainLakhs.toFixed(1)} L/mo
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 industrial-card p-6 sm:p-8 rounded-2xl bg-slate-900 border-2 border-amber-500 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono-spec text-amber-400 font-extrabold uppercase block">
                    LIVE PROJECTION CONSOLE
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Combined Adoption Projection Summary
                  </h3>
                </div>
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-mono-spec">Current Monthly Base Revenue:</span>
                  <div className="text-xl font-bold text-slate-300 font-mono-spec">
                    ₹{baseMonthlyRev.toFixed(2)} Lakhs / month
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                  <span className="text-xs text-emerald-400 font-mono-spec font-bold">
                    + Projected Monthly Lift (Active Scenarios):
                  </span>
                  <div className="text-2xl font-black text-emerald-400 font-mono-spec">
                    +₹{addedRevGain.toFixed(2)} Lakhs / month
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500 space-y-1">
                  <span className="text-xs text-amber-400 font-mono-spec font-extrabold uppercase">
                    = Total Projected Monthly Revenue Run-Rate:
                  </span>
                  <div className="text-3xl font-black text-white font-mono-spec">
                    ₹{totalProjectedMonthlyRev.toFixed(2)} Lakhs
                  </div>
                  <span className="text-xs text-slate-400 block pt-1">
                    Annualized Run-Rate: <strong className="text-amber-400">₹{(totalProjectedMonthlyRev * 12).toFixed(1)} Lakhs/yr</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
