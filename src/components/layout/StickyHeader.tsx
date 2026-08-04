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
    setActiveCategoryFilter,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategoryClick = (catTitle: string) => {
    setActiveCategoryFilter(catTitle);
    setIsMegaMenuOpen(false);
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

  return (
    <header
      className="sticky top-0 w-full bg-slate-950 border-b border-slate-800/80 z-50"
      onMouseLeave={() => {
        setIsMegaMenuOpen(false);
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
                  Rahul Garg &amp; Sonu • Mayur Vihar Phase-3, Delhi •{" "}
                  <span className="text-amber-400">9667731355</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Executive Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-300">
            {/* Sleek Compact Single Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-white font-extrabold transition-all cursor-pointer"
              >
                <span>All 12 Brands</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* COMPACT SINGLE VERTICAL DROPDOWN MENU */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-950 border-2 border-amber-500/60 rounded-2xl shadow-2xl p-2.5 space-y-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono-spec text-amber-400 uppercase font-bold">
                    <span>Authorized Distribution Directory</span>
                    <button
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleCategoryClick("All Categories")}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-between group cursor-pointer"
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

                  <div className="border-t border-slate-800/80 pt-1 space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => handleCategoryClick(cat.name)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-900 flex items-center justify-between group transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-slate-200 group-hover:text-amber-400 truncate">
                                {cat.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {cat.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono-spec font-bold text-slate-400 shrink-0 ml-2">
                            {cat.count} SKUs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#catalog"
              className="hover:text-amber-400 transition-colors"
            >
              Brand Catalog
            </Link>

            <Link
              href="/stock-manager"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-400 font-bold hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Stock ({totalStockCount})</span>
            </Link>

            <Link
              href="/order-to-cash"
              className="hover:text-amber-400 text-amber-400 font-bold transition-colors flex items-center gap-1"
            >
              <span>📋 Orders &amp; Delivery Status</span>
            </Link>

            <Link
              href="/account"
              className="hover:text-amber-400 font-bold transition-colors"
            >
              {currentUser ? currentUser.companyName : "Sign In / Guest Shopping"}
            </Link>

            <Link
              href="/#about"
              className="hover:text-amber-400 transition-colors"
            >
              About Us
            </Link>

            <Link
              href="/#contact"
              className="hover:text-amber-400 transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right: Search Bar, Actions & Responsive Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light Commercial" : "Dark Executive"} Theme`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600" />
              )}
            </button>

            {/* Instant Search Bar (Responsive Width) */}
            <div className="relative">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-24 sm:w-44 lg:w-52 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* Instant Search Dropdown Results */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                  <span className="text-[10px] font-mono-spec text-slate-400 px-2 py-1 block uppercase">
                    Matching Distribution SKUs
                  </span>
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setQuickViewProduct(prod);
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="p-2 rounded-xl hover:bg-slate-900 flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono-spec text-amber-400 block font-bold">
                          {prod.brand}
                        </span>
                        <h5 className="text-xs font-bold text-white truncate">
                          {prod.name}
                        </h5>
                        <span className="text-[10px] font-mono-spec text-slate-400">
                          ₹{prod.priceExclGst} / Pack
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                <PhoneCall className="w-3 h-3" /> Rahul Garg: 9667731355
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
