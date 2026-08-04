"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_CATALOG } from "@/data/products";
import {
  Search,
  ShoppingCart,
  FileText,
  ChevronDown,
  Snowflake,
  Sparkles,
  Award,
  X,
  Boxes,
  ShieldCheck,
  Sun,
  Moon,
  Scale,
} from "lucide-react";

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
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

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
      desc: "McCain, ITC Master Chef, Iscon Balaji & Chatha Foods (-18°C)",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Frozen Foods & Fries").length,
    },
    {
      name: "HORECA - Commercial Cheese & Dairy",
      icon: ShieldCheck,
      desc: "Britannia Cheese, Go Diced Mozzarella & Milkana Professional",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Commercial Cheese & Dairy").length,
    },
    {
      name: "HORECA - Sauces, Mayo & Dressings",
      icon: Award,
      desc: "Veeba Food Services Mayo & Sauces, ITC Chef Makhani Base",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "HORECA - Sauces, Mayo & Dressings").length,
    },
    {
      name: "GT - Beverages & Hydration",
      icon: Sparkles,
      desc: "Ocean Fruit Water Cartons & Sleepy Owl Arabica Coffee Jars",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "GT - Beverages & Hydration").length,
    },
    {
      name: "GT - Packaged Foods & Gourmet Snacks",
      icon: Award,
      desc: "Anoop Pure Roasted Chana Sattu & Loyka Almond Brittle Boxes",
      count: PRODUCTS_CATALOG.filter((p) => p.category === "GT - Packaged Foods & Gourmet Snacks").length,
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) onSelectCategory(categoryName);
    if (onScrollToCatalog) onScrollToCatalog();
    setIsMegaMenuOpen(false);
  };

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
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-extrabold border border-amber-500/30">
                    AUTH. DISTRIBUTOR
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Rahul Garg & Sonu • Mayur Vihar Phase-3, Delhi •{" "}
                  <span className="text-amber-400">sgtradingcompany@rediffmail.com</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Executive Navigation Links with Hover Expansion */}
          <nav className="flex items-center gap-4 sm:gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
            {/* Mega Menu Hover Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-amber-500 text-amber-400 font-bold hover:text-white transition-all cursor-pointer"
              >
                <span>All 12 Brands</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <a
              href="#catalog"
              className="hover:text-amber-400 transition-colors hidden sm:inline"
            >
              Brand Catalog
            </a>

            <Link
              href="/stock-manager"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-400 font-bold hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Stock ({totalStockCount})</span>
            </Link>

            <Link
              href="/order-to-cash"
              className="hover:text-amber-400 text-amber-400 font-bold transition-colors hidden lg:inline"
            >
              Order to Cash (O2C)
            </Link>

            <Link
              href="/account"
              className="hover:text-amber-400 font-bold transition-colors hidden md:inline"
            >
              {currentUser ? currentUser.companyName : "Sign In / Guest Shopping"}
            </Link>

            <a
              href="#about"
              className="hover:text-amber-400 transition-colors hidden md:inline"
            >
              About Us
            </a>

            <a
              href="#contact"
              className="hover:text-amber-400 transition-colors hidden md:inline"
            >
              Contact Us
            </a>
          </nav>

          {/* Right: Search Bar & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instant Search Bar */}
            <div
              className="relative w-36 sm:w-48 md:w-56"
              onMouseEnter={() => setIsSearchFocused(true)}
            >
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-8 pr-6 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500/80 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div
                  className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 w-72"
                  onMouseEnter={() => setIsSearchFocused(true)}
                  onMouseLeave={() => setIsSearchFocused(false)}
                >
                  <div className="p-2 border-b border-slate-800 text-[10px] font-mono-spec text-slate-400 px-3">
                    AUTHORIZED BRAND SKUS ({searchResults.length})
                  </div>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href="/#catalog"
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-800 text-left transition-colors border-b border-slate-800/50 last:border-0 cursor-pointer block"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono-spec text-amber-400 font-bold block">
                          {product.brand}
                        </span>
                        <p className="text-xs font-semibold text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] font-mono-spec text-slate-400">
                          ₹{product.priceExclGst} / Pack
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dedicated Full-Screen Compare Page URL Link */}
            <Link
              href="/compare"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-sky-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
              title="Compare Brands & Pack Specs"
            >
              <Scale className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareList.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-sky-500 text-slate-950 font-bold text-[10px] font-mono-spec">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Dedicated Full-Screen B2B Wholesale RFQ Page URL Link */}
            <Link
              href="/rfq-workspace"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-xs font-bold text-amber-400 transition-all cursor-pointer"
              title="B2B Wholesale RFQ"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">B2B RFQ</span>
              {totalRFQItems > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] font-mono-spec">
                  {totalRFQItems}
                </span>
              )}
            </Link>

            {/* Dedicated Full-Screen Cart Checkout & Payment Page URL Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span>Cart</span>
              {totalCartItems > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-400 font-bold text-[10px] font-mono-spec">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Theme Switcher Toggle (Dark Mode 🌙 / Light Mode ☀️) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-500 text-amber-400 hover:text-white transition-all cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH RESPONSIVE MEGA-MENU DROPDOWN WITH HOVER EXPANSION */}
      {isMegaMenuOpen && (
        <div
          className="fixed left-0 right-0 top-[60px] w-full bg-slate-950 border-b border-amber-500/40 shadow-2xl p-4 sm:p-6 lg:p-8 z-50 max-h-[85vh] overflow-y-auto"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Authorized HORECA & General Trade Distribution Portfolio
                </h4>
                <p className="text-xs text-slate-400">
                  Rahul Garg & Sonu • Mayur Vihar Phase-3, Delhi NCR •{" "}
                  <span className="text-amber-400">sgtradingcompany@rediffmail.com</span>
                </p>
              </div>
              <button
                onClick={() => setIsMegaMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <span>Close Menu</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 text-left transition-all group cursor-pointer w-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {cat.name}
                        </h5>
                        <span className="text-xs font-mono-spec px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold shrink-0">
                          {cat.count} SKUs
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
