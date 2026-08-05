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
} from "lucide-react";
import MARKET_CONFIG_DATA from "@/data/market-intelligence-config.json";

// Types for Strategic Scenarios
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
  const [competitorBenchmarks, setCompetitorBenchmarks] = useState(MARKET_CONFIG_DATA.competitorBenchmarks);
  const [customers, setCustomers] = useState(MARKET_CONFIG_DATA.customers);
  const [selectedCustomerRiskFilter, setSelectedCustomerRiskFilter] = useState<string>("all");
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [isAdminEditorOpen, setIsAdminEditorOpen] = useState(false);
  const [newAgencyName, setNewAgencyName] = useState("");
  const [newAgencyReason, setNewAgencyReason] = useState("");

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

  const selectAllCustomers = () => {
    if (selectedCustomerIds.length === customers.length) {
      setSelectedCustomerIds([]);
    } else {
      setSelectedCustomerIds(customers.map((c) => c.id));
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

  const handleSendEmailQuote = (cust: typeof customers[0]) => {
    const subject = encodeURIComponent(`SG Trading Company • Wholesale Cold-Chain & FMCG Supply Quote for ${cust.name}`);
    const body = encodeURIComponent(
      `Dear ${cust.contactPerson},\n\n` +
      `Greetings from SG Trading Company, Authorized HORECA & General Trade FMCG Distributor based at B-577 Shiv Mandir Road, Mayur Vihar Phase-3, Delhi - 110096.\n\n` +
      `We specialize in direct institutional supply for:\n` +
      `• McCain Food Service 9mm French Fries & Potato Cheese Balls\n` +
      `• Britannia & Go Diced Commercial Mozzarella Cheese Blend\n` +
      `• Veeba Commercial Eggless Mayonnaise & Pizza Sauces\n` +
      `• ITC Master Chef Chicken Nuggets & Retort Makhani Gravy Base\n\n` +
      `All dispatches are temperature-verified (-18°C Deep Frozen / 2°C Chilled) with full GST Credit Invoice (GSTIN: 07ADQFS8839Q1ZQ).\n\n` +
      `Best regards,\nRahul Garg & Sonu\nSG Trading Company\nPhone: 9667731355 / 9643097002`
    );
    window.location.href = `mailto:sgtradingcompany@rediffmail.com?subject=${subject}&body=${body}`;
  };

  const handleBroadcastSelectedCampaign = () => {
    if (selectedCustomerIds.length === 0) {
      alert("Please select at least one customer account to send bulk marketing campaign.");
      return;
    }
    alert(
      `🚀 Bulk Marketing Campaign Activated for ${selectedCustomerIds.length} customer accounts!\n\n` +
      `• Official SG Wholesale Rate Alert dispatched via WhatsApp & Email.\n` +
      `• Priority -18°C Cold Chain Express Delivery Window reserved from Mayur Vihar Phase-3 Warehouse.`
    );
  };

  const handleAddNewAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgencyName.trim()) return;
    setRecommendedAgencies([
      ...recommendedAgencies,
      {
        brand: newAgencyName,
        reason: newAgencyReason || "Identified high-growth institutional agency tie-up.",
        status: "NEW OPPORTUNITY",
        statusColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
      },
    ]);
    setNewAgencyName("");
    setNewAgencyReason("");
  };

  const filteredCustomers = customers.filter((c) => {
    if (selectedCustomerRiskFilter === "safe") return c.paymentRiskPct <= 6;
    if (selectedCustomerRiskFilter === "moderate") return c.paymentRiskPct > 6 && c.paymentRiskPct <= 12;
    if (selectedCustomerRiskFilter === "caution") return c.paymentRiskPct > 12;
    return true;
  });

  // Dynamic What-If Calculations
  const activeScenarios = scenarios.filter((s) => s.active);
  const baseMonthlyRev = MARKET_CONFIG_DATA.baseMonthlyRevenueLakhs;
  const addedRevGain = activeScenarios.reduce((acc, s) => acc + s.projectedRevenueGainLakhs, 0);
  const totalProjectedMonthlyRev = baseMonthlyRev + addedRevGain;
  const totalInvestment = activeScenarios.reduce((acc, s) => acc + s.investmentRequiredLakhs, 0);
  const avgMarginLift = activeScenarios.length > 0
    ? (activeScenarios.reduce((acc, s) => acc + s.projectedMarginImpactPct, 0) / activeScenarios.length).toFixed(1)
    : "0.0";
  const annualRevGain = (addedRevGain * 12).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Top Navigation & Executive Header Bar */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono-spec font-bold flex items-center gap-2 border border-slate-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Wholesale Catalog</span>
            </Link>
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono-spec font-black uppercase border border-amber-500/40">
                  EXECUTIVE STRATEGIC INTELLIGENCE SUITE
                </span>
                <span className="text-xs text-slate-400 font-mono-spec">
                  {MARKET_CONFIG_DATA.lastUpdated}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                SG Trading Company Market Research &amp; Strategic Growth Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminEditorOpen(!isAdminEditorOpen)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-mono-spec font-bold text-xs flex items-center gap-2 border border-amber-500/40 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isAdminEditorOpen ? "Close Live Editor" : "Live Add Agency & Trends"}</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 font-mono-spec text-xs">
              <span className="text-slate-400">Current Monthly Base:</span>
              <span className="text-amber-400 font-extrabold text-sm">₹{baseMonthlyRev.toFixed(2)} Lakhs</span>
            </div>
          </div>
        </div>
      </header>

      {/* LIVE ADMIN EDITOR DRAWER */}
      {isAdminEditorOpen && (
        <div className="bg-slate-900 border-b border-amber-500/60 py-5 px-6 md:px-12 animate-in fade-in slide-in-from-top-4">
          <div className="max-w-8xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-mono-spec font-black text-xs text-amber-400 uppercase tracking-wider">
                  ADMIN LIVE MARKET INTELLIGENCE MANAGER (ADD NEW AGENCIES &amp; OPPORTUNITIES)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono-spec">
                Changes apply immediately to live strategic projections
              </span>
            </div>

            <form onSubmit={handleAddNewAgency} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4">
                <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                  New FMCG Agency / Brand Name to Target
                </label>
                <input
                  type="text"
                  placeholder="e.g. Creambell Dairy / Amul Commercial"
                  value={newAgencyName}
                  onChange={(e) => setNewAgencyName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                  Strategic Business Rationale / Opportunity Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g. Capture 35% hotel ice cream & dairy catering volume in East Delhi"
                  value={newAgencyReason}
                  onChange={(e) => setNewAgencyReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Agency</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Executive Intelligence Container */}
      <main className="max-w-8xl mx-auto px-6 md:px-12 pt-8 space-y-12">
        {/* Executive KPI Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>PROJECTED MONTHLY REVENUE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{((addedRevGain / baseMonthlyRev) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-3xl font-black text-white font-mono-spec">
              ₹{totalProjectedMonthlyRev.toFixed(2)} <span className="text-lg font-normal text-slate-400">Lakhs/mo</span>
            </div>
            <p className="text-xs text-slate-400">
              Incremental Gain: <strong className="text-amber-400">+₹{addedRevGain.toFixed(2)} Lakhs/mo</strong> from active strategic scenarios.
            </p>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>ANNUAL REVENUE OPPORTUNITY</span>
              <span className="text-sky-400 font-bold">FY2026-27</span>
            </div>
            <div className="text-3xl font-black text-sky-400 font-mono-spec">
              +₹{annualRevGain} <span className="text-lg font-normal text-slate-400">Lakhs/yr</span>
            </div>
            <p className="text-xs text-slate-400">
              Total projected expansion upside upon deploying selected strategic moves.
            </p>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>GROSS MARGIN ENHANCEMENT</span>
              <span className="text-amber-400 font-bold">BLENDED LIFT</span>
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono-spec">
              +{avgMarginLift}% <span className="text-lg font-normal text-slate-400">Margin</span>
            </div>
            <p className="text-xs text-slate-400">
              Driven by high-margin direct agency tie-ups &amp; digital ordering efficiency.
            </p>
          </div>

          <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400">
              <span>TOTAL SCENARIO INVESTMENT</span>
              <span className="text-emerald-400 font-bold">CAPEX / OPEX</span>
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono-spec">
              ₹{totalInvestment.toFixed(1)} <span className="text-lg font-normal text-slate-400">Lakhs</span>
            </div>
            <p className="text-xs text-slate-400">
              Estimated payback period: <strong className="text-white">~3.8 Months</strong> average ROI cycle.
            </p>
          </div>
        </div>

        {/* NEW SECTION 05: B2B CUSTOMER CRM, CREDIT RISK METER (% RISK) & MULTI-CHANNEL MARKETING OUTREACH SUITE */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>SECTION 05 • B2B CUSTOMER CRM, CREDIT RISK METER &amp; MARKETING OUTREACH SUITE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Target Customer Profiles, Credit Risk Evaluation &amp; Instant Marketing Outreach
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Each account displays payment default risk %, long-term run stability evaluation, and 1-Click WhatsApp / Email / SMS promotional links.
              </p>
            </div>

            {/* Filter & Campaign Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
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
                <button
                  onClick={() => setSelectedCustomerRiskFilter("moderate")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCustomerRiskFilter === "moderate"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Moderate (7-12%)
                </button>
              </div>

              <button
                onClick={selectAllCustomers}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-spec font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                {selectedCustomerIds.length === customers.length ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                    <span>Deselect All</span>
                  </>
                ) : (
                  <>
                    <Square className="w-4 h-4 text-slate-400" />
                    <span>Select All for Campaign</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBroadcastSelectedCampaign}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Launch Bulk Outreach ({selectedCustomerIds.length} Selected)</span>
              </button>
            </div>
          </div>

          {/* Customer CRM Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomerIds.includes(cust.id);
              return (
                <div
                  key={cust.id}
                  className={`industrial-card rounded-2xl overflow-hidden border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Top Header & Risk Gauge Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => toggleSelectCustomer(cust.id)}
                          className="mt-0.5 text-slate-400 hover:text-amber-400 cursor-pointer"
                          title="Select for bulk marketing"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-amber-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                        <div>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec font-bold uppercase block w-fit mb-1">
                            {cust.segment}
                          </span>
                          <h3 className="text-base font-extrabold text-white leading-snug">
                            {cust.name}
                          </h3>
                        </div>
                      </div>

                      {/* Payment Risk % Meter Gauge */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono-spec text-slate-400 block uppercase">
                          Payment Default Risk
                        </span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-mono-spec font-black mt-0.5 shadow-sm">
                          <span>{cust.paymentRiskPct}% RISK</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono-spec">
                        <span className="text-slate-400">Long-Term Run &amp; Payment Risk Meter:</span>
                        <span className="font-bold text-white">{cust.riskLevel}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            cust.paymentRiskPct <= 6
                              ? "bg-emerald-500"
                              : cust.paymentRiskPct <= 12
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(cust.paymentRiskPct * 4, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Decision Maker & Proximity */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-300 font-semibold">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Decision Maker: <strong>{cust.contactPerson}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{cust.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 font-mono-spec text-[11px]">
                        <span className="text-slate-400">Monthly Run-Rate:</span>
                        <span className="text-amber-400 font-extrabold">{cust.monthlyCaseVolume}</span>
                      </div>
                    </div>

                    {/* Why He Is a Good Customer & Long-Term Run Evaluation */}
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] font-mono-spec font-bold text-amber-400 uppercase tracking-wider block">
                          ⭐ Why He Is a Good Customer:
                        </span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed mt-0.5">
                          {cust.whyGoodCustomer}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono-spec font-bold text-slate-400 uppercase tracking-wider block">
                          📋 Long-Term Run &amp; Credit Evaluation:
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                          {cust.longTermEvaluation}
                        </p>
                      </div>
                    </div>

                    {/* Primary Products Ordered */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono-spec text-slate-400 uppercase block">
                        Primary Wholesale Products:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cust.primaryProducts.map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono-spec text-slate-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* One-Click Multi-Channel Marketing Outreach Suite */}
                  <div className="p-4 bg-slate-950/90 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSendWhatsApp(cust)}
                      className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/40 font-mono-spec text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Rates</span>
                    </button>

                    <button
                      onClick={() => handleSendEmailQuote(cust)}
                      className="px-3 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-500 hover:text-slate-950 text-sky-400 border border-sky-500/40 font-mono-spec text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email GST Quote</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 1: REAL-TIME MARKET VELOCITY & RECOMMENDED NEW AGENCY TIE-UPS */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>SECTION 01 • DELHI NCR MARKET VELOCITY &amp; AGENCY ACQUISITION PIPELINE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Rising Product Demand Trends &amp; Recommended New Agency Tie-Ups
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono-spec">
              Based on Mayur Vihar, Noida &amp; South Delhi Cloud Kitchen Field Survey
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: High-Velocity Product Demand Drivers */}
            <div className="lg:col-span-7 industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Fastest-Growing HORECA &amp; GT Product Categories (YoY Demand Shift)</span>
              </h3>

              <div className="space-y-4">
                {marketTrends.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-white">{item.category}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono-spec font-black border border-emerald-500/40">
                        {item.growth}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{item.driver}</p>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
                      <div className={`h-full ${item.color}`} style={{ width: item.barWidth }} />
                    </div>
                    <span className="text-[11px] font-mono-spec text-slate-400 block pt-1">{item.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Recommended New FMCG Agency Tie-Ups to Acquire */}
            <div className="lg:col-span-5 industrial-card p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Top Recommended New FMCG Agencies to Acquire ({recommendedAgencies.length})</span>
              </h3>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {recommendedAgencies.map((agency, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-white">{agency.brand}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-spec font-black border ${agency.statusColor}`}>
                        {agency.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{agency.reason}</p>
                    <button
                      onClick={() => alert(`Initiating distribution partnership workflow for ${agency.brand}`)}
                      className="w-full py-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono-spec font-bold transition-all text-center cursor-pointer"
                    >
                      + Initiate Agency Partnership Inquiry
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPREHENSIVE SWOT ANALYSIS & FINAL STRATEGIC RECOMMENDATION */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>SECTION 02 • STRATEGIC SWOT ANALYSIS &amp; EXECUTIVE RECOMMENDATION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                SG Trading Company Internal &amp; Market SWOT Matrix
              </h2>
            </div>
          </div>

          {/* 2x2 Dark Glassmorphic SWOT Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    S
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Core Strengths</h3>
                    <span className="text-xs text-emerald-400 font-mono-spec">Competitive Advantage</span>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Authorized Distribution for 12 Tier-1 FMCG Brands</strong> (McCain, ITC Master Chef, Veeba, Britannia Cheese, Iscon Balaji, Go Diced, Chatha Foods).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Dedicated Mayur Vihar Phase-3 Warehouse (B-577 Shiv Mandir Rd)</strong> with active -18°C Deep Frozen &amp; 2°C-4°C Chilled Storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Same-Day Express Dispatch Speed</strong> to East Delhi, Mayur Vihar, and Noida QSR outlets compared to 24-48h metro distributors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Flexible Master Case MOQ (1 Case)</strong> allowing boutique cafes &amp; cloud kitchens to order without locking huge working capital.</span>
                </li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border-2 border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                    W
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Operational Weaknesses</h3>
                    <span className="text-xs text-amber-400 font-mono-spec">Internal Bottlenecks</span>
                  </div>
                </div>
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Geographic Delivery Density Concentrated in East Delhi/Noida</strong>; South &amp; West Delhi cloud kitchens face higher freight friction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Peak Festive Storage Capacity Constraints</strong> in Cold Room 1 during October-December wedding/banquet demand surges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>High Reliance on Manual Telephone/WhatsApp Order Entry</strong> creating occasional clerical load during 9AM-11AM morning peak.</span>
                </li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border-2 border-sky-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
                    O
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Market Opportunities</h3>
                    <span className="text-xs text-sky-400 font-mono-spec">Expansion Vectors</span>
                  </div>
                </div>
                <TrendingUp className="w-6 h-6 text-sky-400" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Acquire HyFun Foods &amp; Godrej Yummiez Agency Tie-Ups</strong> to capture additional 20%+ share of QSR hashbrown &amp; non-veg starter spend.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Launch Web Self-Service Order &amp; Instant RFQ Portal</strong> to double institutional customer retention and automate re-orders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Target Rapid-Growth South Delhi &amp; Gurgaon Cloud Kitchen Hubs</strong> with dedicated refrigerated van routes twice weekly.</span>
                </li>
              </ul>
            </div>

            {/* Threats */}
            <div className="industrial-card p-6 rounded-2xl bg-slate-900/90 border-2 border-red-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-black">
                    T
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">External Threats</h3>
                    <span className="text-xs text-red-400 font-mono-spec">Market Risk Factors</span>
                  </div>
                </div>
                <HelpCircle className="w-6 h-6 text-red-400" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Unorganized Ghazipur &amp; Mandi Cash Traders</strong> cutting margins by selling non-cold-chain or near-expiry frozen stock below MRP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Commercial Electricity Tariff Inflation</strong> increasing monthly cold-room operating overhead for -18°C deep freeze units.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Raw Potato / Dairy Price Volatility</strong> affecting seasonal wholesale crate rates.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FINAL STRATEGIC EXECUTIVE RECOMMENDATION BANNER */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border-2 border-amber-500 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-mono-spec font-black uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FINAL CHIEF STRATEGY RECOMMENDATION FOR RAHUL GARG &amp; SONU</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white">
                Prioritize (1) HyFun Foods Agency Tie-Up + (2) Cold Room Capacity (+60%) for 42% Net Revenue Lift
              </h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-4xl">
                Combining a new agency tie-up with HyFun Foods and expanding Mayur Vihar Cold Room 1 yields the highest ROI (~3.5 months payback) while protecting SG Trading Company’s dominant East Delhi/Noida institutional food service moat.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("whatif-simulator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-lg"
            >
              <span>Run Live What-If Scenario Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* SECTION 3: REGIONAL COMPETITOR BENCHMARKING MATRIX */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>SECTION 03 • DELHI NCR COMPETITOR BENCHMARKING MATRIX</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Where SG Trading Company Excels vs. Regional Competitors
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-xs font-mono-spec uppercase text-slate-400">
                  <th className="p-4">Benchmark Dimension</th>
                  <th className="p-4 text-amber-400 bg-amber-500/10 font-black border-x border-amber-500/30">
                    🏆 SG Trading Company (Mayur Vihar-3)
                  </th>
                  <th className="p-4 text-slate-300">Metro Cash &amp; Carry / Reliance B2B</th>
                  <th className="p-4 text-slate-300">Unorganized Mandi / Ghazipur Wholesalers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {competitorBenchmarks.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-bold text-white">{row.dimension}</td>
                    <td className="p-4 bg-amber-500/5 font-extrabold text-emerald-400 border-x border-amber-500/30">
                      {row.sgTrading}
                    </td>
                    <td className="p-4 text-slate-300">{row.metroReliance}</td>
                    <td className="p-4 text-slate-300">{row.mandiWholesalers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE WHAT-IF SCENARIO MANAGER & ROI SIMULATOR */}
        <section id="whatif-simulator" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>SECTION 04 • INTERACTIVE WHAT-IF SCENARIO MANAGER &amp; ADOPTION PROJECTION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Simulate Strategic Growth Scenarios Live
              </h2>
            </div>
            <span className="text-xs text-amber-400 font-mono-spec font-bold">
              Toggle scenarios below to watch real-time financial projections update live
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Interactive Scenario Toggle List */}
            <div className="lg:col-span-7 space-y-4">
              {scenarios.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => toggleScenario(sc.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    sc.active
                      ? "bg-slate-900/95 border-amber-500 shadow-xl shadow-amber-500/10"
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

                  <div className="grid grid-cols-3 gap-3 pt-3 mt-3 border-t border-slate-800/80 text-[11px] font-mono-spec">
                    <div>
                      <span className="text-slate-400 block">Investment Req:</span>
                      <span className="text-white font-bold">₹{sc.investmentRequiredLakhs.toFixed(1)} Lakhs</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Margin Lift:</span>
                      <span className="text-amber-400 font-bold">+{sc.projectedMarginImpactPct}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Payback Horizon:</span>
                      <span className="text-sky-400 font-bold">{sc.paybackMonths} Months</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 5 Cols: Live Real-Time Financial Adoption Projection Output */}
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
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              {/* Live Metric Display Cards */}
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

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => alert(`Strategic Growth Plan exported with ${activeScenarios.length} active scenarios selected.`)}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Lock Strategic Growth Plan &amp; Generate Board Brief</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
