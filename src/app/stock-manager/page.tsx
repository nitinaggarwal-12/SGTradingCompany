"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  Boxes,
  Snowflake,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Search,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function StockManagerPage() {
  const { products, restockProduct } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");

  const totalCasesInWarehouse = products.reduce(
    (acc, p) => acc + (p.stockQuantity || 0),
    0
  );

  const lowStockCount = products.filter(
    (p) => (p.stockQuantity || 0) <= (p.lowStockThreshold || 15)
  ).length;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone =
      selectedZone === "All Zones" || p.warehouseZone.includes(selectedZone);
    return matchesSearch && matchesZone;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <main className="flex-1 py-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          {/* Top Page Breadcrumb & Title */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono-spec font-bold uppercase mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to SG Trading Co. Portal
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Mayur Vihar Phase-3 Warehouse Stock Manager
                </h1>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-mono-spec font-bold border border-amber-500/30">
                  RAHUL GARG & SONU DASHBOARD
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Live running inventory tracking across -18°C Cold Rooms, Chilling Bays, and Ambient Dry Bays in Delhi NCR.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono-spec text-xs">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>B-577, Shiv Mandir Road, Mayur Vihar Ph-3, Delhi</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GSTIN: 07ADQFS8839Q1ZQ</span>
              </div>
            </div>
          </div>

          {/* Full-Widescreen Warehouse KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-spec">
            <div className="industrial-card p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>TOTAL RUNNING STOCK</span>
                <Boxes className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-400 mt-2">
                {totalCasesInWarehouse.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-slate-400">
                  Cases / Packs
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 mt-2 block">
                ● Real-time sync with order checkout
              </span>
            </div>

            <div className="industrial-card p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>ACTIVE AUTHORIZED SKUS</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {products.length}{" "}
                <span className="text-xs font-normal text-slate-400">
                  Brand SKUs
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                12 Authorized Brands (HORECA + GT)
              </span>
            </div>

            <div className="industrial-card p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>LOW STOCK ALERTS</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {lowStockCount}{" "}
                <span className="text-xs font-normal text-slate-400">
                  SKUs Near Threshold
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                Automatic reorder triggers enabled
              </span>
            </div>

            <div className="industrial-card p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>COLD-CHAIN FLEET</span>
                <Truck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xl font-bold text-cyan-400 mt-2">
                -18°C Dedicated Vans
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                Same-day Delhi NCR dispatch
              </span>
            </div>
          </div>

          {/* Search & Storage Zone Filter Strip */}
          <div className="industrial-card p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search running stock by Brand or Product Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["All Zones", "Cold Room", "Chilled Bay", "Ambient"].map(
                (zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-spec transition-all cursor-pointer ${
                      selectedZone === zone
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {zone}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Spacious Widescreen Inventory Table */}
          <div className="industrial-card rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono-spec font-bold text-amber-400 uppercase">
                SHOWING {filteredProducts.length} AUTHORIZED BRAND PRODUCTS
              </span>
              <span className="text-xs font-mono-spec text-slate-400">
                URL Route: <strong className="text-white">http://localhost:3000/stock-manager</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono-spec">
                <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase">
                  <tr>
                    <th className="p-4">Brand & Product SKU</th>
                    <th className="p-4">Institutional Pack & Segment</th>
                    <th className="p-4">Warehouse Storage Zone</th>
                    <th className="p-4 text-center">Running Stock Level</th>
                    <th className="p-4 text-center">Stock Status</th>
                    <th className="p-4 text-right">Quick Restock Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((product) => {
                    const stock = product.stockQuantity || 0;
                    const threshold = product.lowStockThreshold || 15;
                    const isLow = stock <= threshold;
                    const isOut = stock === 0;

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-900/60 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <span className="text-amber-400 font-bold text-xs block">
                                {product.brand}
                              </span>
                              <span className="text-white font-bold text-sm">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                SKU: {product.sku}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="text-slate-200 block font-semibold">
                            {product.packSize}
                          </span>
                          <span className="text-[11px] text-sky-400">
                            {product.segment}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                            <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                            {product.warehouseZone}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <span className="text-2xl font-black text-white">
                            {stock}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Cases / Packs
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          {isOut ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 font-bold">
                              <AlertTriangle className="w-4 h-4" /> Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-bold">
                              <ShieldAlert className="w-4 h-4" /> Low Stock ({stock})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
                              <CheckCircle2 className="w-4 h-4" /> Healthy Stock
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => restockProduct(product.id, 10)}
                              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition-all text-xs cursor-pointer"
                              title="Add +10 Cases to Warehouse"
                            >
                              +10 Cases
                            </button>
                            <button
                              onClick={() => restockProduct(product.id, 50)}
                              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold transition-all text-xs cursor-pointer"
                              title="Add +50 Cases to Warehouse"
                            >
                              +50 Cases
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DistributionConciergeChatbot />
    </div>
  );
}
