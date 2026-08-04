"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  ShoppingCart,
  FileText,
  Scale,
  Snowflake,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    addToRFQ,
    toggleCompare,
    compareList,
  } = useApp();

  if (!quickViewProduct) return null;

  const isCompared = compareList.some((p) => p.id === quickViewProduct.id);
  const gstAmount = Math.round(
    (quickViewProduct.priceExclGst * quickViewProduct.gstRate) / 100
  );
  const totalPriceInclGst = quickViewProduct.priceExclGst + gstAmount;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="industrial-card w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/15 text-amber-400 font-mono-spec text-xs font-bold border border-amber-500/30">
              BRAND: {quickViewProduct.brand}
            </span>
            <span className="text-xs text-slate-400 font-mono-spec">
              {quickViewProduct.category}
            </span>
          </div>

          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8">
          {/* Left Visual & Specifications Strip (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-square">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs">
                {quickViewProduct.segment}
              </span>
            </div>

            {/* Quick Tech Specs Strip */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono-spec">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Storage Temp
                </span>
                <span className="text-cyan-400 font-bold">
                  {quickViewProduct.storageCondition}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Shelf Life
                </span>
                <span className="text-sky-400 font-bold">
                  {quickViewProduct.shelfLife}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Pack Size
                </span>
                <span className="text-white font-bold">
                  {quickViewProduct.packSize}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">
                  Case MOQ
                </span>
                <span className="text-amber-400 font-bold">
                  {quickViewProduct.caseMoq}
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Full Details (7 Cols) */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono-spec">
                Authorized Brand: <strong className="text-amber-400">{quickViewProduct.brand}</strong> • Segment: {quickViewProduct.segment}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-mono-spec block">
                  Unit Pack Rate (Excl. GST)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white font-mono-spec">
                    ₹{quickViewProduct.priceExclGst}
                  </span>
                  <span className="text-xs text-amber-400 font-mono-spec font-bold">
                    + {quickViewProduct.gstRate}% GST (₹{gstAmount})
                  </span>
                </div>
                <span className="text-xs text-emerald-400 font-mono-spec font-semibold block mt-0.5">
                  Total Tax Invoice Price: ₹{totalPriceInclGst}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono-spec block">
                  B2B Wholesale Case Rate
                </span>
                <span className="text-base font-bold text-amber-400 font-mono-spec">
                  ₹{quickViewProduct.b2bWholesalePrice} / Unit
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Min. Order: {quickViewProduct.caseMoq}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Key Product Highlights:
              </h4>
              <div className="space-y-1.5">
                {quickViewProduct.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add Pack to Cart</span>
                </button>

                <button
                  onClick={() => {
                    addToRFQ(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 border border-amber-500/50 hover:bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request B2B Case RFQ</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleCompare(quickViewProduct)}
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isCompared ? "text-sky-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>
                    {isCompared
                      ? "In Brand Comparison"
                      : "Add to Brand Comparison"}
                  </span>
                </button>

                <a
                  href="tel:+919667731355"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-mono-spec flex items-center gap-1 font-bold"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Rahul Garg / Sonu: 9667731355 / 9643097002
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
