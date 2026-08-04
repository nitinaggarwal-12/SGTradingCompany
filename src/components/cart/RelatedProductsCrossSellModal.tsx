"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_CATALOG } from "@/data/products";
type Product = (typeof PRODUCTS_CATALOG)[0];
import { Plus, Check, ArrowRight, ShoppingCart, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface RelatedProductsCrossSellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCart: () => void;
}

export const RelatedProductsCrossSellModal: React.FC<
  RelatedProductsCrossSellModalProps
> = ({ isOpen, onClose, onProceedToCart }) => {
  const { cart, addToCart } = useApp();
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const router = useRouter();

  if (!isOpen) return null;

  // Find related products not already in cart
  const cartProductIds = new Set(cart.map((item) => item.product.id));
  const recommendedProducts = PRODUCTS_CATALOG.filter(
    (p) => !cartProductIds.has(p.id)
  ).slice(0, 3);

  const handleAddRelated = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => [...prev, product.id]);
  };

  const handleSkipOrProceed = () => {
    onClose();
    onProceedToCart();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="industrial-card w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="p-5 bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-spec font-black text-amber-400 uppercase tracking-wider">
                  HORECA KITCHEN CROSS-SELL
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-spec font-bold">
                  DIRECT WAREHOUSE PRICE
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                Complete Your Commercial Kitchen Order
              </h3>
            </div>
          </div>

          <button
            onClick={handleSkipOrProceed}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Skip to Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle banner */}
        <div className="px-6 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <p className="text-slate-300 font-medium">
            Frequently ordered together by Delhi NCR Kitchens &amp; Banquet Halls. Add or skip below:
          </p>
          <span className="text-[11px] font-mono-spec text-amber-400 font-bold shrink-0">
            One-Click Bulk Add
          </span>
        </div>

        {/* Recommended Products List */}
        <div className="p-6 space-y-4 max-h-[55vh] overflow-y-auto">
          {recommendedProducts.map((product) => {
            const isAdded = addedIds.includes(product.id);
            return (
              <div
                key={product.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isAdded
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-slate-950/90 border-slate-800 hover:border-amber-500/50"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono-spec text-amber-400 font-bold uppercase block">
                      {product.brand} • {product.category.split("-")[1] || product.category}
                    </span>
                    <h4 className="text-sm font-extrabold text-white truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono-spec mt-0.5">
                      {product.packSize} • {product.storageCondition}
                    </p>
                    <p className="text-sm font-black text-amber-400 font-mono-spec mt-1">
                      ₹{product.priceExclGst.toLocaleString("en-IN")}{" "}
                      <span className="text-[10px] text-slate-400 font-normal">
                        Excl. GST
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  {isAdded ? (
                    <button
                      disabled
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Added to Order</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddRelated(product)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/15 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add to Wholesale Order</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Footer: ADD / SKIP options */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono-spec">
            <span>Choose to add high-margin kitchen essentials or proceed directly</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSkipOrProceed}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer text-center"
            >
              Skip &amp; Proceed to Cart
            </button>

            <button
              onClick={handleSkipOrProceed}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Go to Wholesale Cart ({cart.length} SKUs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
