"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  Scale,
  Trash2,
  ShoppingCart,
  FileText,
} from "lucide-react";

export const CompareSpecsModal: React.FC = () => {
  const {
    compareList,
    isCompareModalOpen,
    setIsCompareModalOpen,
    removeFromCompare,
    clearCompare,
    addToCart,
    addToRFQ,
  } = useApp();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="industrial-card w-full max-w-7xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Brand & Institutional Pack Comparison Matrix
              </h3>
              <p className="text-xs text-slate-400 font-mono-spec">
                Comparing {compareList.length} of 4 maximum distribution SKUs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-400 hover:text-rose-300 font-mono-spec flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {compareList.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <Scale className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-base text-slate-300 font-semibold">
              No products selected for comparison yet.
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Check the <strong className="text-amber-400">"Compare Pack Specs & Margin"</strong> button on any product card in the catalog to build your side-by-side brand matrix.
            </p>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 w-48 text-xs font-mono-spec font-bold text-slate-400 uppercase border-b border-slate-800">
                    PRODUCT PARAMETER
                  </th>
                  {compareList.map((product) => (
                    <th
                      key={product.id}
                      className="p-4 min-w-[260px] border-b border-slate-800 align-top"
                    >
                      <div className="relative group space-y-2">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors"
                          title="Remove from compare"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 rounded-lg object-cover border border-slate-700"
                        />
                        <span className="text-[11px] font-mono-spec text-amber-400 font-bold block">
                          {product.brand}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-2">
                          {product.name}
                        </h4>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 text-xs font-mono-spec">
                {/* Segment & Category */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    Segment & Category
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-slate-200">
                      {p.segment} • <span className="text-amber-400">{p.category}</span>
                    </td>
                  ))}
                </tr>

                {/* Institutional Pack Size */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    Institutional Pack Size
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-emerald-400 font-bold">
                      {p.packSize}
                    </td>
                  ))}
                </tr>

                {/* Master Case MOQ */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Master Case MOQ</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-amber-300 font-bold">
                      {p.caseMoq}
                    </td>
                  ))}
                </tr>

                {/* Storage Condition */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    Storage & Cold Chain
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-cyan-400 font-semibold">
                      {p.storageCondition}
                    </td>
                  ))}
                </tr>

                {/* Shelf Life */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Shelf Life</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-slate-200">
                      {p.shelfLife}
                    </td>
                  ))}
                </tr>

                {/* Unit Rate Excl. GST */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    Unit / Pack Rate (Excl. GST)
                  </td>
                  {compareList.map((p) => (
                    <td
                      key={p.id}
                      className="p-3 text-lg font-extrabold text-white"
                    >
                      ₹{p.priceExclGst}
                    </td>
                  ))}
                </tr>

                {/* B2B Wholesale Case Rate */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    B2B Wholesale Case Rate
                  </td>
                  {compareList.map((p) => (
                    <td
                      key={p.id}
                      className="p-3 text-sm font-bold text-amber-400"
                    >
                      ₹{p.b2bWholesalePrice} / Pack
                    </td>
                  ))}
                </tr>

                {/* Action Buttons Row */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">
                    Order / Case RFQ
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">
                      <div className="space-y-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => addToRFQ(p)}
                          className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-amber-500/40 hover:bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Case RFQ</span>
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
    </div>
  );
};
