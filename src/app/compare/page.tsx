"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  Scale,
  Trash2,
  ShoppingCart,
  FileText,
  Snowflake,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCart, addToRFQ } =
    useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <main className="flex-1 py-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          {/* Top Breadcrumb Header */}
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
                  Authorized Brand Technical & Margin Comparison Matrix
                </h1>
                <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-xs font-mono-spec font-bold border border-sky-500/30">
                  SIDE-BY-SIDE ANALYTICS
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 font-mono-spec">
                Compare pack sizes, cold-chain temperatures, unit rates, and B2B wholesale case margins.
              </p>
            </div>

            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-rose-400 cursor-pointer"
              >
                Clear Comparison ({compareList.length})
              </button>
            )}
          </div>

          {compareList.length === 0 ? (
            <div className="industrial-card rounded-2xl p-16 text-center space-y-4 max-w-xl mx-auto">
              <Scale className="w-16 h-16 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                No Products Selected for Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Click "Compare" on any product card in the brand catalog to compare side-by-side.
              </p>
              <Link
                href="/#catalog"
                className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Browse Brand Catalog →
              </Link>
            </div>
          ) : (
            <div className="industrial-card rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono-spec">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800">
                    <th className="p-4 w-48 text-slate-400 uppercase">
                      BRAND SPECIFICATION
                    </th>
                    {compareList.map((product) => (
                      <th
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center min-w-[260px]"
                      >
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-0 right-0 p-1 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 rounded-xl object-cover border border-slate-700 mx-auto mb-3"
                          />
                          <span className="text-amber-400 font-bold block">
                            {product.brand}
                          </span>
                          <span className="text-white font-bold text-sm block line-clamp-2 mt-1">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-sky-400 block mt-1">
                            {product.segment}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      Institutional Pack Size
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center text-slate-200"
                      >
                        {product.packSize}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      Storage & Cold-Chain
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center text-cyan-400 font-bold"
                      >
                        {product.storageCondition}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      Shelf Life
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center text-slate-300"
                      >
                        {product.shelfLife}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      Unit Rate (Excl. GST)
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center text-lg font-black text-white"
                      >
                        ₹{product.priceExclGst}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      B2B Wholesale Case Rate
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center text-lg font-black text-amber-400"
                      >
                        ₹{product.b2bWholesalePrice} / Unit
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-300">
                      Quick Order Actions
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 border-l border-slate-800 text-center"
                      >
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={() => addToRFQ(product, 1)}
                            className="w-full py-2 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Add to B2B RFQ</span>
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <DistributionConciergeChatbot />
    </div>
  );
}
