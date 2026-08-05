"use client";

import React from "react";
import { Product } from "@/types/equipment";
import { useApp } from "@/context/AppContext";
import {
  ShoppingCart,
  FileText,
  Scale,
  Eye,
  Snowflake,
  Boxes,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "table";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
}) => {
  const {
    addToCart,
    addToRFQ,
    compareList,
    toggleCompare,
    setQuickViewProduct,
  } = useApp();

  const isCompared = compareList.some((p) => p.id === product.id);
  const gstAmount = Math.round((product.priceExclGst * product.gstRate) / 100);
  const totalPriceInclGst = product.priceExclGst + gstAmount;

  const stock = product.stockQuantity ?? 100;
  const threshold = product.lowStockThreshold ?? 15;
  const isLowStock = stock <= threshold && stock > 0;
  const isOutOfStock = stock === 0;

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  if (viewMode === "table") {
    return (
      <div className="industrial-card rounded-xl p-4 border border-slate-800 hover:border-amber-500/50 flex flex-wrap items-center justify-between gap-4 transition-all">
        <div className="flex items-center gap-4 min-w-[280px]">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 cursor-pointer">
            {galleryImages.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={product.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.image;
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
                  idx === currentImgIndex ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-spec text-amber-400 font-bold">
                {product.brand}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {product.segment}
              </span>
              {isOutOfStock ? (
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono-spec font-bold">
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono-spec font-bold">
                  Low Stock ({stock} Cases)
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono-spec font-bold">
                  Stock: {stock} Cases
                </span>
              )}
            </div>
            <h4
              onClick={() => setQuickViewProduct(product)}
              className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
            >
              {product.name}
            </h4>
            <p className="text-xs text-slate-400 font-mono-spec mt-0.5">
              {product.packSize} • {product.storageCondition}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono-spec block">
              Unit Rate (Excl. GST)
            </span>
            <span className="text-base font-extrabold text-white font-mono-spec">
              ₹{product.priceExclGst}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono-spec block">
              ₹{totalPriceInclGst} Incl. {product.gstRate}% GST
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(product)}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isCompared
                  ? "bg-sky-500/20 border-sky-400 text-sky-300"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? "Compared" : "Compare"}</span>
            </button>

            <button
              onClick={() => addToRFQ(product)}
              className="px-3.5 py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 text-amber-400 font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>B2B RFQ</span>
            </button>

            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Card with Slow 1800ms Smooth Multi-Image Auto-Rotation
  return (
    <div className="industrial-card rounded-2xl overflow-hidden border border-slate-800/90 flex flex-col justify-between group">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          {/* SLOW 1800ms MULTI-IMAGE CROSS-FADE GALLERY */}
          {galleryImages.map((imgUrl, idx) => {
            const isActive = idx === currentImgIndex;
            return (
              <img
                key={idx}
                src={imgUrl}
                alt={`${product.name} View ${idx + 1}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.image;
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out ${
                  isActive
                    ? "opacity-100 scale-105 z-10"
                    : "opacity-0 scale-100 z-0 pointer-events-none"
                }`}
              />
            );
          })}

          {/* Bottom subtle gradient strictly for text legibility */}
          <div className="commercial-showcase-photo-gradient absolute bottom-0 left-0 right-0 h-14 z-20 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />

          {/* Top Corner Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-30">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/95 backdrop-blur-md text-[10px] font-mono-spec font-extrabold text-amber-400 border border-slate-700">
              {product.brand}
            </span>
            <span
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                product.segment === "HORECA Institutional"
                  ? "bg-sky-500/90 text-slate-950"
                  : "bg-emerald-500/90 text-slate-950"
              }`}
            >
              {product.segment}
            </span>
          </div>

          {/* Quick View Button */}
          <button
            onClick={() => setQuickViewProduct(product)}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 flex items-center justify-center transition-colors backdrop-blur-sm z-30"
            title="Inspect Product & Case Specs"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Multi-Image Gallery Indicator Dots */}
          <div className="absolute bottom-9 right-3 z-30 flex items-center gap-1.5">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImgIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentImgIndex
                    ? "w-4 bg-amber-400"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Show photo ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom Overlay Storage Strip */}
          <div className="commercial-showcase-photo-overlay absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono-spec !text-white z-30">
            <span className="flex items-center gap-1">
              <Snowflake className="w-3 h-3 text-cyan-400" />
              {product.storageCondition}
            </span>
            <span>{product.shelfLife}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono-spec text-slate-400">
            <span>{product.category}</span>
            <span className="text-amber-400 font-bold">{product.caseMoq}</span>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-base font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          {/* Live Warehouse Running Stock Strip */}
          <div className="flex items-center justify-between bg-slate-950/90 px-3 py-2 rounded-lg border border-slate-800 text-[11px] font-mono-spec">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Boxes className="w-3.5 h-3.5 text-amber-400" />
              <span>Warehouse Stock:</span>
            </span>
            {isOutOfStock ? (
              <span className="text-rose-400 font-bold">0 Cases (Out)</span>
            ) : isLowStock ? (
              <span className="text-amber-400 font-bold">
                🟡 Low Stock ({stock} Cases)
              </span>
            ) : (
              <span className="text-emerald-400 font-bold">
                🟢 {stock} Cases Ready
              </span>
            )}
          </div>

          {/* Pack & Logistics Specifications Table */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono-spec">
            <div>
              <span className="text-slate-500 block uppercase text-[9px]">
                Institutional Pack Size
              </span>
              <span className="text-slate-200 font-semibold truncate block">
                {product.packSize}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[9px]">
                Storage & Cold Chain
              </span>
              <span className="text-cyan-400 font-semibold truncate block">
                {product.storageCondition}
              </span>
            </div>
          </div>

          {/* Price & GST Breakup */}
          <div className="pt-2 border-t border-slate-800/80 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono-spec block">
                Unit / Pack Rate (Excl. GST)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-white font-mono-spec">
                  ₹{product.priceExclGst}
                </span>
                <span className="text-xs text-amber-400 font-mono-spec font-semibold">
                  +{product.gstRate}% GST
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-spec">
                Total Incl. GST: ₹{totalPriceInclGst}
              </span>
            </div>

            {/* B2B Wholesale Tier Tag */}
            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono-spec border border-amber-500/20 block">
                B2B Bulk Rate:
              </span>
              <span className="text-xs font-bold text-amber-300 font-mono-spec">
                ₹{product.b2bWholesalePrice} / Unit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
          </button>

          <button
            onClick={() => addToRFQ(product)}
            className="py-2.5 px-3 rounded-xl bg-slate-900 border border-amber-500/50 hover:bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>B2B Case RFQ</span>
          </button>
        </div>

        <button
          onClick={() => toggleCompare(product)}
          className={`w-full py-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isCompared
              ? "bg-sky-500/20 border-sky-400 text-sky-300"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>
            {isCompared
              ? "Selected in Brand Spec Compare"
              : "Compare Pack Specs & Margin"}
          </span>
        </button>
      </div>
    </div>
  );
};
