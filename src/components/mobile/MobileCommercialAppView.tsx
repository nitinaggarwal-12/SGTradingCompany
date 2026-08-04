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
  Truck,
  Clock,
  ChevronRight,
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
    orders,
    advanceOrderStage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"catalog" | "stock" | "o2c" | "account">("catalog");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Delivery Date & Cold-Chain Time Window Selection for mobile app
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("Tomorrow Morning (Aug 5)");
  const [selectedTimeWindow, setSelectedTimeWindow] = useState("☀️ 10:30 AM – 01:30 PM (Pre-Lunch QSR)");

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

  const isLight = theme === "light";

  return (
    <div
      className={`md:hidden min-h-screen flex flex-col transition-colors duration-200 pb-24 ${
        isLight
          ? "bg-[#F8FAFC] text-[#0F172A]"
          : "bg-[#090D16] text-[#F8FAFC]"
      }`}
    >
      {/* MOBILE APP TOP HEADER DOCK */}
      <header
        className={`sticky top-0 z-40 border-b px-4 py-3 ${
          isLight
            ? "bg-white/95 border-slate-200 text-slate-900"
            : "bg-slate-950/95 border-slate-800 text-white"
        } backdrop-blur-md`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
              SG
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight">
                  SG TRADING APP
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono-spec font-extrabold">
                  MOBILE APP
                </span>
              </div>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-mono-spec font-bold">
                Rahul Garg &amp; Sonu • Mayur Vihar Phase-3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-700"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
              title="Toggle Theme"
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-sky-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
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
            className={`w-full pl-8 pr-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-amber-500 ${
              isLight
                ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500"
                : "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
            }`}
          />
        </div>

        {/* HORIZONTAL BRAND APP CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 no-scrollbar">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => {
                setSelectedBrand(b);
                setActiveTab("catalog");
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                selectedBrand === b
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : isLight
                  ? "bg-slate-100 border border-slate-300 text-slate-700"
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
        <div
          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono-spec ${
            isLight
              ? "bg-white border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-800 text-white"
          }`}
        >
          <div>
            <span className="text-amber-600 dark:text-amber-400 font-extrabold block">
              GSTIN: 07ADQFS8839Q1ZQ (5% GST)
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px]">
              -18°C Insulated Van Cold-Chain • Mayur Vihar Phase-3
            </span>
          </div>
          <Link
            href="/account"
            className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 font-extrabold text-[10px]"
          >
            {currentUser ? "My Account" : "Sign In / Guest"}
          </Link>
        </div>

        {/* TAB 1: PRODUCT CATALOG */}
        {activeTab === "catalog" && (
          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const qty = getCartQty(product.id);
              const stock = stockMap[product.id] ?? product.stockQuantity;

              return (
                <div
                  key={product.id}
                  className={`rounded-2xl p-3.5 border flex gap-3 items-center transition-all ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-900 shadow-sm"
                      : "bg-[#0F172A] border-slate-800 text-white"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono-spec font-extrabold text-amber-600 dark:text-amber-400 uppercase truncate">
                        {product.brand}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono-spec text-[9px] font-bold">
                        {stock} Cases
                      </span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug mt-0.5 line-clamp-2">
                      {product.name}
                    </h4>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-spec mt-1">
                      {product.packSize} • {product.storageCondition}
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      <div>
                        <span className="text-sm font-extrabold font-mono-spec block">
                          ₹{product.priceExclGst}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          Excl. 5% GST (B2B: ₹{product.b2bWholesalePrice})
                        </span>
                      </div>

                      {qty > 0 ? (
                        <div className="flex items-center border border-amber-500 rounded-xl overflow-hidden bg-amber-50 dark:bg-slate-900">
                          <button
                            onClick={() =>
                              updateCartQuantity(product.id, qty - 1)
                            }
                            className="px-2.5 py-1.5 text-amber-600 dark:text-amber-400 font-extrabold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-black font-mono-spec">
                            {qty}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(product.id, qty + 1)
                            }
                            className="px-2.5 py-1.5 text-amber-600 dark:text-amber-400 font-extrabold"
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
        )}

        {/* TAB 2: WAREHOUSE STOCK MANAGER */}
        {activeTab === "stock" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs">
              <h4 className="font-extrabold text-amber-700 dark:text-amber-400">
                Mayur Vihar Phase-3 Warehouse Running Stock
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                Rahul Garg &amp; Sonu -18°C Cold Room Live Inventory Status
              </p>
            </div>

            {PRODUCTS_CATALOG.map((p) => {
              const qty = stockMap[p.id] ?? p.stockQuantity;
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isLight
                      ? "bg-white border-slate-200"
                      : "bg-slate-900 border-slate-800"
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">
                      {p.brand}
                    </span>
                    <h5 className="text-xs font-bold">{p.name}</h5>
                    <span className="text-[10px] text-slate-500 font-mono-spec">
                      ₹{p.priceExclGst} / Pack
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono-spec text-xs font-extrabold">
                    {qty} Cases
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ORDER TO CASH (O2C DESK) */}
        {activeTab === "o2c" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs">
              <h4 className="font-extrabold text-amber-700 dark:text-amber-400">
                Order-to-Cash (O2C) Fulfillment Desk
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                Track customer orders &amp; dispatch status in Delhi NCR
              </p>
            </div>

            {orders.map((o) => (
              <div
                key={o.orderId}
                className={`p-3.5 rounded-xl border space-y-2 ${
                  isLight
                    ? "bg-white border-slate-200"
                    : "bg-slate-900 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-spec font-bold text-amber-600 dark:text-amber-400">
                    {o.orderId}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono-spec text-[10px] font-bold">
                    {o.stage.replace(/_/g, " ")}
                  </span>
                </div>
                <h4 className="text-xs font-bold">{o.customerName}</h4>
                <p className="text-[11px] text-slate-500 font-mono-spec">
                  Total Payable: ₹{o.totalAmount.toLocaleString("en-IN")} (incl. 5% GST)
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MOBILE APP FLOATING QUICK ORDER / CART BANNER */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-16 left-3 right-3 z-40 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-3 shadow-2xl flex items-center justify-between text-slate-950">
          <div>
            <span className="text-xs font-black block">
              {totalCartItems} Items Added to Mobile Cart
            </span>
            <span className="text-[11px] font-mono-spec font-bold">
              Subtotal: ₹{totalCartValue.toLocaleString("en-IN")} + 5% GST
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
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t grid grid-cols-5 h-16 text-[10px] font-bold font-mono-spec ${
          isLight
            ? "bg-white/95 border-slate-200 text-slate-600"
            : "bg-slate-950/95 border-slate-800 text-slate-400"
        } backdrop-blur-lg`}
      >
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeTab === "catalog" ? "text-amber-600 dark:text-amber-400 font-black" : ""
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab("stock")}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeTab === "stock" ? "text-amber-600 dark:text-amber-400 font-black" : ""
          }`}
        >
          <Boxes className="w-5 h-5" />
          <span>Stock</span>
        </button>

        <button
          onClick={() => setActiveTab("o2c")}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeTab === "o2c" ? "text-amber-600 dark:text-amber-400 font-black" : ""
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>O2C Desk</span>
        </button>

        <Link
          href="/account"
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <UserCheck className="w-5 h-5" />
          <span>Account</span>
        </Link>

        <Link
          href="/cart"
          className="flex flex-col items-center justify-center gap-0.5 relative"
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
