"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Home,
  Boxes,
  FileText,
  UserCheck,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  PhoneCall,
  MessageCircle,
  Snowflake,
  ShieldCheck,
  Sparkles,
  Award,
  Lock,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { PRODUCTS_CATALOG } from "@/data/products";
import { Product } from "@/types/equipment";

export const MobileCommercialAppView: React.FC = () => {
  const {
    cart,
    addToCart,
    updateCartQuantity,
    stockMap,
    currentUser,
    theme,
    toggleTheme,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"catalog" | "stock" | "o2c" | "account">("catalog");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const BRANDS = [
    "ALL",
    "McCain Food Service",
    "ITC Master Chef",
    "Veeba Food Services",
    "Britannia Cheese",
    "Iscon Balaji Foods",
    "Go Diced Cheese",
    "Chatha Foods",
    "Milkana Professional",
    "Anoop Sattu",
    "Ocean Water",
    "Sleepy Owl Coffee",
    "Loyka",
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (selectedBrand !== "ALL" && p.brand !== selectedBrand) return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cart.reduce(
    (acc, item) => acc + item.product.priceExclGst * item.quantity,
    0
  );

  const getCartQty = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="md:hidden min-h-screen flex flex-col bg-slate-950 text-white pb-20">
      {/* MOBILE APP TOP HEADER DOCK */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
              SG
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white">
                  SG TRADING APP
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono-spec font-bold">
                  LIVE APP
                </span>
              </div>
              <p className="text-[10px] text-amber-400 font-mono-spec font-bold">
                Rahul Garg &amp; Sonu • Mayur Vihar Phase-3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </button>
            <a
              href="tel:+919667731355"
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* MOBILE APP SEARCH BAR */}
        <div className="mt-2.5 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search McCain fries, Britannia cheese, Veeba mayo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* HORIZONTAL BRAND APP CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 no-scrollbar">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                selectedBrand === b
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-300"
              }`}
            >
              {b === "ALL" ? "All 12 Brands (16 SKUs)" : b}
            </button>
          ))}
        </div>
      </header>

      {/* MOBILE APP MAIN BODY SCROLL AREA */}
      <main className="flex-1 p-3 space-y-4">
        {/* Quick Credentials Alert Strip */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono-spec">
          <div>
            <span className="text-amber-400 font-bold block">
              07ADQFS8839Q1ZQ (GSTIN)
            </span>
            <span className="text-slate-400 text-[10px]">
              -18°C Cold-Chain Guaranteed • Direct Wholesale
            </span>
          </div>
          <Link
            href="/account"
            className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 font-bold text-[10px]"
          >
            {currentUser ? "My Account" : "Sign In / Guest"}
          </Link>
        </div>

        {/* MOBILE APP NATIVE SINGLE-COLUMN PRODUCT CARDS */}
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const qty = getCartQty(product.id);
            const stock = stockMap[product.id] ?? product.stockQuantity;

            return (
              <div
                key={product.id}
                className="industrial-card rounded-2xl p-3.5 border border-slate-800 flex gap-3 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover border border-slate-700 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono-spec font-bold text-amber-400 uppercase truncate">
                      {product.brand}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono-spec text-[9px] font-bold">
                      {stock} Cases
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug mt-0.5 line-clamp-2">
                    {product.name}
                  </h4>

                  <p className="text-[10px] text-slate-400 font-mono-spec mt-1">
                    {product.packSize} • {product.storageCondition}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    <div>
                      <span className="text-sm font-extrabold text-white font-mono-spec block">
                        ₹{product.priceExclGst}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        Excl. GST (B2B: ₹{product.b2bWholesalePrice})
                      </span>
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center border border-amber-500 rounded-xl overflow-hidden bg-slate-900">
                        <button
                          onClick={() =>
                            updateCartQuantity(product.id, qty - 1)
                          }
                          className="px-2.5 py-1.5 text-amber-400"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white font-mono-spec">
                          {qty}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(product.id, qty + 1)
                          }
                          className="px-2.5 py-1.5 text-amber-400"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MOBILE APP FLOATING QUICK ORDER / CART BANNER */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-16 left-3 right-3 z-40 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-3 shadow-2xl flex items-center justify-between text-slate-950">
          <div>
            <span className="text-xs font-black block">
              {totalCartItems} Items Added to Mobile Cart
            </span>
            <span className="text-[11px] font-mono-spec font-bold">
              Subtotal: ₹{totalCartValue.toLocaleString("en-IN")} + GST
            </span>
          </div>

          <Link
            href="/cart"
            className="px-4 py-2 rounded-xl bg-slate-950 text-amber-400 font-extrabold text-xs flex items-center gap-1.5 shadow"
          >
            <span>Checkout →</span>
          </Link>
        </div>
      )}

      {/* NATIVE MOBILE APP BOTTOM NAVIGATION DOCK (THUMB INTERACTION) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 grid grid-cols-5 h-16 text-[10px] font-bold font-mono-spec">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-amber-400 gap-0.5"
        >
          <Home className="w-5 h-5" />
          <span>Catalog</span>
        </Link>

        <Link
          href="/stock-manager"
          className="flex flex-col items-center justify-center text-slate-400 hover:text-white gap-0.5"
        >
          <Boxes className="w-5 h-5" />
          <span>Stock</span>
        </Link>

        <Link
          href="/order-to-cash"
          className="flex flex-col items-center justify-center text-slate-400 hover:text-amber-400 gap-0.5"
        >
          <FileText className="w-5 h-5" />
          <span>O2C Desk</span>
        </Link>

        <Link
          href="/account"
          className="flex flex-col items-center justify-center text-slate-400 hover:text-white gap-0.5"
        >
          <UserCheck className="w-5 h-5" />
          <span>Account</span>
        </Link>

        <Link
          href="/cart"
          className="flex flex-col items-center justify-center text-slate-400 hover:text-amber-400 gap-0.5 relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {totalCartItems > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center absolute top-1.5 right-4">
              {totalCartItems}
            </span>
          )}
        </Link>
      </nav>
    </div>
  );
};
