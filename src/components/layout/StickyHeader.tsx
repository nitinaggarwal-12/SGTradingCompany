"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Search,
  ShoppingCart,
  Boxes,
  FileText,
  ChevronDown,
  Sparkles,
  Flame,
  Snowflake,
  ShieldCheck,
  Award,
  Sun,
  Moon,
  CheckCircle2,
  X,
  Building2,
  Store,
  CheckSquare,
  Menu,
  UserCheck,
  PhoneCall,
  Scale,
  RotateCcw,
  BarChart3,
  Gift,
  User,
} from "lucide-react";
import Link from "next/link";
import { PRODUCTS_CATALOG } from "@/data/products";

interface StickyHeaderProps {
  onSelectCategory?: (category: string) => void;
  onScrollToCatalog?: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const {
    cart,
    rfqItems,
    compareList,
    setQuickViewProduct,
    products,
    theme,
    toggleTheme,
    currentUser,
    logoutCustomer,
    setIsGuestCheckout,
    setActiveCategoryFilter,
    isCanvasMode,
    setIsCanvasMode,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState(false);

  const handleClearCacheAndReload = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      showToast("🔄 Cleared browser cache & reloading fresh!");
      setTimeout(() => {
        window.location.href =
          window.location.origin +
          window.location.pathname +
          "?refresh=" +
          Date.now();
      }, 300);
    }
  };

  const handleAdminCanvasToggle = () => {
    if (isCanvasMode) {
      setIsCanvasMode(false);
      showToast("Visual Canvas Edit Mode Deactivated.");
    } else {
      setShowAdminPinModal(true);
      setAdminPinInput("");
      setAdminPinError(false);
    }
  };

  const handleVerifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput === "2026" || adminPinInput === "9667731355") {
      setShowAdminPinModal(false);
      setIsCanvasMode(true);
      showToast("🎨 Visual Canvas Edit Mode Activated from Top-Right Corner!");
    } else {
      setAdminPinError(true);
    }
  };

  const handleCategoryClick = (catTitle: string) => {
    setActiveCategoryFilter(catTitle);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        window.location.href = "/#catalog";
      } else {
        const el = document.getElementById("catalog");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalRFQItems = rfqItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalStockCount = products.reduce(
    (acc, p) => acc + (p.stockQuantity || 0),
    0
  );

  const searchResults = searchQuery.trim()
    ? PRODUCTS_CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const CATEGORIES = [
    {
      name: "HORECA - Frozen Foods & Fries",
      icon: Snowflake,
      desc: "McCain, ITC Master Chef, Iscon Balaji & Chatha",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Frozen Foods & Fries").length,
    },
    {
      name: "HORECA - Commercial Cheese & Dairy",
      icon: ShieldCheck,
      desc: "Britannia Cheese, Go Diced & Milkana",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Commercial Cheese & Dairy").length,
    },
    {
      name: "HORECA - Sauces, Mayo & Dressings",
      icon: Award,
      desc: "Veeba Food Services Mayo & Makhani Base",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Sauces, Mayo & Dressings").length,
    },
    {
      name: "GT - Beverages & Hydration",
      icon: Sparkles,
      desc: "Ocean Fruit Water & Sleepy Owl Coffee",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "GT - Beverages & Hydration").length,
    },
    {
      name: "GT - Packaged Foods & Gourmet Snacks",
      icon: Award,
      desc: "Anoop Chana Sattu & Loyka Almond Brittle",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "GT - Packaged Foods & Gourmet Snacks").length,
    },
  ];

  const [activeMenu, setActiveMenu] = useState<
    "mega" | "deals" | "operations" | "account" | null
  >(null);

  return (
    <header
      className="sticky top-0 w-full bg-slate-950 border-b border-slate-800/80 z-50"
      onMouseLeave={() => {
        setActiveMenu(null);
        setIsSearchFocused(false);
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Consolidated Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center font-black text-slate-950 text-xl shadow-md shadow-amber-500/20 shrink-0">
                SG
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    SG TRADING COMPANY
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-extrabold border border-amber-500/30 hidden sm:inline-block">
                    AUTH. DISTRIBUTOR
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[240px] sm:max-w-none">
                  Mayur Vihar Phase-3, Delhi •{" "}
                  <span className="text-amber-400">9667731355</span>
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-300">
            {/* GROUP 1: Sleek Compact All Brands Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("mega")}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === "mega" ? null : "mega")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-white font-extrabold transition-all cursor-pointer"
              >
                <span>All 12 Brands</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
                    activeMenu === "mega" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* COMPACT SINGLE VERTICAL DROPDOWN MENU */}
              {activeMenu === "mega" && (
                <div
                  onMouseEnter={() => setActiveMenu("mega")}
                  className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border-2 border-amber-500 text-white rounded-2xl shadow-2xl p-3 space-y-2 z-[999] animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono-spec text-amber-400 uppercase font-bold">
                    <span>Authorized Distribution Directory</span>
                    <button
                      onClick={() => setActiveMenu(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleCategoryClick("All Categories")}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-500/20 border border-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
                      <div>
                        <p className="font-extrabold text-xs text-amber-400 group-hover:text-slate-950">
                          ALL 12 AUTHORIZED BRANDS
                        </p>
                        <p className="text-[10px] text-slate-300 group-hover:text-slate-900 font-medium">
                          Show entire 16 SKU wholesale portfolio
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
                      16 SKUs
                    </span>
                  </button>

                  <div className="border-t border-slate-800 pt-1 space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => handleCategoryClick(cat.name)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 flex items-center justify-between group transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-white group-hover:text-amber-400 truncate">
                                {cat.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {cat.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono-spec font-bold text-amber-400 shrink-0 ml-2">
                            {cat.count} SKUs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* GROUP 2: LOGICAL GROUPING — DEALS, CASHBACK & REWARDS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("deals")}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === "deals" ? null : "deals")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-extrabold border border-amber-500/40 transition-all cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Deals &amp; Rewards</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeMenu === "deals" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "deals" && (
                <div
                  onMouseEnter={() => setActiveMenu("deals")}
                  className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border-2 border-amber-500 text-white rounded-2xl shadow-2xl p-3 space-y-1.5 z-[999] animate-in fade-in slide-in-from-top-2 font-mono-spec text-xs"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] text-amber-400 uppercase font-black">
                    Wholesale Savings &amp; VIP Chef Incentives
                  </div>

                  <Link
                    href="/offers?tab=offers"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Current Offers &amp; Bank Cashback</p>
                      <p className="text-[10px] text-slate-400 font-sans">HDFC, ICICI, Axis &amp; Paytm UPI Credit</p>
                    </div>
                  </Link>

                  <Link
                    href="/offers?tab=loyalty"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Gift className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">SG Chef Loyalty &amp; VIP Points</p>
                      <p className="text-[10px] text-slate-400 font-sans">Earn Points, Free Master Cases &amp; Gifts</p>
                    </div>
                  </Link>

                  <Link
                    href="/coming-soon"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Coming Soon Launch Radar (12 SKUs)</p>
                      <p className="text-[10px] text-slate-400 font-sans">Chatha Chicken, Britannia &amp; Veeba</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* GROUP 3: LOGICAL GROUPING — OPERATIONS & INTELLIGENCE SUITE DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("operations")}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "operations" ? null : "operations")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white font-extrabold transition-all cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Operations &amp; Intelligence</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
                    activeMenu === "operations" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "operations" && (
                <div
                  onMouseEnter={() => setActiveMenu("operations")}
                  className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border-2 border-amber-500 text-white rounded-2xl shadow-2xl p-3 space-y-1.5 z-[999] animate-in fade-in slide-in-from-top-2 font-mono-spec text-xs"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] text-amber-400 uppercase font-black">
                    Wholesale B2B Operations &amp; Intelligence
                  </div>

                  <Link
                    href="/market-intelligence"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Market Intelligence &amp; SWOT</p>
                      <p className="text-[10px] text-slate-400 font-sans">Brand Moat &amp; Cold-Chain Strategy</p>
                    </div>
                  </Link>

                  <Link
                    href="/stock-manager"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Boxes className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Mayur Vihar Stock ({totalStockCount})</p>
                      <p className="text-[10px] text-slate-400 font-sans">Live Cold Room 1 Inventory Level</p>
                    </div>
                  </Link>

                  <Link
                    href="/order-to-cash"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <FileText className="w-4 h-4 text-sky-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Orders &amp; Order-to-Cash (O2C)</p>
                      <p className="text-[10px] text-slate-400 font-sans">GST Tax Invoice &amp; Dispatch Status</p>
                    </div>
                  </Link>

                  <Link
                    href="/rfq-workspace"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Scale className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">Institutional RFQ Quotation</p>
                      <p className="text-[10px] text-slate-400 font-sans">Custom Annual Hotel Contracts</p>
                    </div>
                  </Link>

                  <Link
                    href="/#about"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-white hover:text-amber-400 transition-all"
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="font-extrabold text-xs text-white">About SG Trading Hub</p>
                      <p className="text-[10px] text-slate-400 font-sans">Mayur Vihar Phase-3 Credentials</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* GROUP 4: Corporate Identity & Account with Hover Dropdown */}
            <Link
              href="/#about"
              className="hover:text-amber-400 font-bold transition-colors px-1"
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("account")}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "account" ? null : "account")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-white font-extrabold transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[120px]">
                  {currentUser ? currentUser.companyName : "Account & SSO"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
                    activeMenu === "account" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "account" && (
                <div
                  onMouseEnter={() => setActiveMenu("account")}
                  className="absolute top-full right-0 mt-2 w-72 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl p-2.5 space-y-2 z-[999] animate-in fade-in slide-in-from-top-2 font-sans text-xs"
                >
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] text-amber-400 font-bold">
                    <span>
                      {currentUser
                        ? "Active Account"
                        : "Guest Shopping Mode"}
                    </span>
                    <Link
                      href="/account"
                      onClick={() => setActiveMenu(null)}
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      Account Portal →
                    </Link>
                  </div>

                  {currentUser ? (
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div>
                        <p className="font-bold text-white text-xs truncate">
                          {currentUser.companyName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          GSTIN: <strong className="text-amber-400">{currentUser.gstin}</strong>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-800">
                        <Link
                          href="/account"
                          onClick={() => setActiveMenu(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] text-center"
                        >
                          My Account
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logoutCustomer();
                            showToast("👋 Signed out!");
                            setActiveMenu(null);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white font-bold text-[11px] cursor-pointer text-center"
                        >
                          🚪 Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-400">
                          🛍️ Guest Shopping Active
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            logoutCustomer();
                            showToast("🚪 Session reset");
                            setActiveMenu(null);
                          }}
                          className="text-[10px] text-rose-400 hover:underline font-bold"
                        >
                          Sign Out
                        </button>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs text-amber-400 transition-all"
                      >
                        <span>🔑 Sign In with WhatsApp / Google</span>
                        <span>→</span>
                      </Link>
                    </div>
                  )}

                  {/* PORTAL & ADMIN CONTROLS */}
                  <div className="pt-1.5 border-t border-slate-800 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleAdminCanvasToggle();
                        setActiveMenu(null);
                      }}
                      className={`w-full p-2 rounded-xl border flex items-center justify-between font-bold text-xs cursor-pointer transition-all ${
                        isCanvasMode
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : "bg-slate-950 hover:bg-slate-800 text-amber-400 border-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        {isCanvasMode ? "Admin Edit: ON" : "Admin Visual Edit"}
                      </span>
                      <span className="text-[10px] uppercase opacity-75">CMS</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        setActiveMenu(null);
                      }}
                      className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between font-bold text-xs text-white cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {theme === "dark" ? (
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Moon className="w-3.5 h-3.5 text-sky-400" />
                        )}
                        Theme Mode
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {theme === "dark" ? "Dark" : "Light"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleClearCacheAndReload()}
                      className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between font-bold text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                        Reload &amp; Clear Cache
                      </span>
                      <span className="text-[10px] text-sky-400 font-normal">Fresh</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Consolidated Search, Wholesale Cart/Compare & Account Dropdown */}
          <div className="flex items-center gap-2">
            {/* Instant Search Bar (Responsive Width) */}
            <div className="relative">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 sm:w-56 lg:w-64 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* Instant Search Dropdown Results & Dynamic Recommended Searches */}
              {isSearchFocused && (
                <div
                  className="fixed top-14 left-4 right-4 sm:absolute sm:top-full sm:left-0 sm:right-auto mt-2 w-auto sm:w-96 max-w-[94vw] bg-slate-900 border-2 border-amber-500 text-white rounded-2xl shadow-2xl p-3.5 z-[999] font-mono-spec text-xs space-y-3"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {/* DYNAMIC RECOMMENDED SEARCH CHIPS (FILTERED AS USER TYPES) */}
                  {(() => {
                    const allRecs = [
                      { label: "McCain 9mm French Fries", brand: "McCain Food Service", tag: "TOP SELLER" },
                      { label: "Britannia Commercial Mozzarella", brand: "Britannia Cheese", tag: "42cm STRETCH" },
                      { label: "Veeba White Garlic Mayo", brand: "Veeba Food Services", tag: "5 KG BUCKET" },
                      { label: "Iscon Balaji 9mm Commercial Fries", brand: "Iscon Balaji Foods", tag: "HIGH MARGIN" },
                      { label: "ITC Master Chef Makhani Gravy", brand: "ITC Master Chef", tag: "BANQUET PACK" },
                      { label: "Sleepy Owl Cold Brew Coffee", brand: "Sleepy Owl Coffee", tag: "GT HYDRATION" },
                      { label: "Anoop Chana Sattu Export Pack", brand: "Anoop Sattu", tag: "PROTEIN GT" },
                      { label: "Ocean Fruit Water Active", brand: "Ocean Water", tag: "BEVERAGE" },
                    ];

                    const matchingRecs = searchQuery.trim()
                      ? allRecs.filter(
                          (r) =>
                            r.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.brand.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                      : allRecs;

                    return matchingRecs.length > 0 ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                          <span className="text-[10px] text-amber-400 font-black uppercase flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5" />
                            {searchQuery.trim()
                              ? "Matching Recommended Searches"
                              : "Recommended HORECA Commercial Searches"}
                          </span>
                          <span className="text-[9px] text-slate-400">1-CLICK SEARCH</span>
                        </div>

                        <div className="space-y-1">
                          {matchingRecs.slice(0, 4).map((rec, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setSearchQuery(rec.label);
                                const el = document.getElementById("catalog");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="w-full text-left p-2 rounded-xl bg-slate-950/80 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between transition-all cursor-pointer group"
                            >
                              <div className="min-w-0">
                                <p className="font-bold text-xs text-white group-hover:text-amber-400 truncate">
                                  🔍 {rec.label}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate font-sans">
                                  {rec.brand}
                                </p>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-[9px] font-black text-amber-400 shrink-0 ml-2">
                                {rec.tag}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {/* MATCHING DISTRIBUTION SKUS AS USER TYPES */}
                  {searchQuery.trim() !== "" && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-[10px] text-amber-400 px-1 block uppercase font-black">
                        Matching Distribution SKUs ({searchResults.length})
                      </span>
                      {searchResults.length > 0 ? (
                        searchResults.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setQuickViewProduct(prod);
                              setIsSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-2 rounded-xl hover:bg-slate-800 flex items-center gap-3 cursor-pointer transition-colors"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] text-amber-400 block font-bold">
                                {prod.brand}
                              </span>
                              <h5 className="text-xs font-bold text-white truncate">
                                {prod.name}
                              </h5>
                              <span className="text-[10px] text-slate-300">
                                ₹{prod.priceExclGst} / Pack
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-xs font-bold text-slate-400">
                            No exact SKU match for "{searchQuery}". Click a recommended query above.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logical Wholesale Actions Group: Cart & Compare */}
            <div className="flex items-center gap-1.5">
              {/* Compare Specs Button */}
              <Link
                href="/#compare"
                className="hidden sm:flex p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all cursor-pointer relative"
                title="Compare Distribution Specs"
              >
                <Scale className="w-4 h-4" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </Link>

              {/* Wholesale Cart Link */}
              <Link
                href="/cart"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-white transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold font-mono-spec">
                  ({totalCartItems})
                </span>
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE BUTTON (Visible on < xl screens) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
              title="Open Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* TOP-RIGHT ADMIN CANVAS PIN AUTHENTICATION MODAL */}
        {showAdminPinModal && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="industrial-card w-full max-w-sm rounded-2xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-extrabold text-white">
                    Rahul Garg &amp; Sonu — Admin Canvas Auth
                  </h3>
                </div>
                <button
                  onClick={() => setShowAdminPinModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300">
                Enter Admin Security PIN to activate In-Place Visual Canvas Edit Mode for SG Trading Company portal.
              </p>

              <form onSubmit={handleVerifyAdminPin} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                    ENTER ADMIN SECURITY PIN (Default: 2026)
                  </label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="••••"
                    value={adminPinInput}
                    onChange={(e) => {
                      setAdminPinInput(e.target.value);
                      setAdminPinError(false);
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono-spec font-bold text-center text-amber-400 tracking-widest focus:outline-none focus:border-amber-500"
                  />
                  {adminPinError && (
                    <p className="text-[11px] text-rose-400 font-mono-spec mt-1">
                      Incorrect PIN. Try 2026 or Rahul Garg phone number.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock Top-Right Visual Canvas Mode</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TOUCH-FRIENDLY RESPONSIVE MOBILE NAVIGATION DRAWER */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-800 space-y-2 font-mono-spec text-xs animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 flex items-center gap-2 text-white font-bold"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="truncate">
                  {currentUser ? currentUser.companyName : "Sign In / Account"}
                </span>
              </Link>

              <Link
                href="/stock-manager"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 flex items-center gap-2 text-amber-400 font-bold"
              >
                <Boxes className="w-4 h-4" />
                <span>Warehouse Stock ({totalStockCount})</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2">
              <Link
                href="/order-to-cash"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 font-extrabold flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Order-to-Cash (O2C)</span>
              </Link>

              <Link
                href="/rfq-workspace"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-sky-400 font-bold flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>Wholesale RFQ Quote</span>
              </Link>
            </div>

            {/* Mobile All 12 Brands Selector */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] text-amber-400 uppercase font-extrabold block">
                Authorized FMCG Distribution Directory:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleCategoryClick("All Categories")}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px]"
                >
                  All 12 Brands (16 SKUs)
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-amber-400 text-[11px] font-bold"
                  >
                    {cat.name.split("-")[0]} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
              <span>Mayur Vihar Phase-3, Delhi NCR</span>
              <a
                href="tel:+919667731355"
                className="text-amber-400 font-bold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> Wholesale Helpline: 9667731355 / 9643097002
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
