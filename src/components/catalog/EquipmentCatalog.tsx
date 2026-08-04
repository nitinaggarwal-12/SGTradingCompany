"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS_CATALOG } from "@/data/products";
import { ProductCard } from "./ProductCard";
import {
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  Snowflake,
  CheckCircle2,
  Building2,
  Store,
} from "lucide-react";

interface EquipmentCatalogProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const EquipmentCatalog: React.FC<EquipmentCatalogProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [segment, setSegment] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [storageCondition, setStorageCondition] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const CATEGORY_LIST = [
    "All Categories",
    "HORECA - Frozen Foods & Fries",
    "HORECA - Commercial Cheese & Dairy",
    "HORECA - Sauces, Mayo & Dressings",
    "GT - Beverages & Hydration",
    "GT - Packaged Foods & Gourmet Snacks",
  ];

  const SEGMENTS = ["All", "HORECA Institutional", "General Trade (GT)"];

  const BRANDS = [
    "All",
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

  const STORAGE_CONDITIONS = [
    "All",
    "Frozen (-18°C Cold Chain)",
    "Chilled (2°C to 4°C)",
    "Ambient Dry Storage",
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => {
      if (
        selectedCategory !== "All Categories" &&
        p.category !== selectedCategory
      ) {
        return false;
      }
      if (segment !== "All" && p.segment !== segment) {
        return false;
      }
      if (brand !== "All" && p.brand !== brand) {
        return false;
      }
      if (
        storageCondition !== "All" &&
        p.storageCondition !== storageCondition
      ) {
        return false;
      }
      if (p.priceExclGst > maxPrice) {
        return false;
      }
      if (onlyInStock && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceExclGst - b.priceExclGst;
      if (sortBy === "price-desc") return b.priceExclGst - a.priceExclGst;
      return 0;
    });
  }, [
    selectedCategory,
    segment,
    brand,
    storageCondition,
    maxPrice,
    onlyInStock,
    sortBy,
  ]);

  const handleResetFilters = () => {
    onCategoryChange("All Categories");
    setSegment("All");
    setBrand("All");
    setStorageCondition("All");
    setMaxPrice(500);
    setOnlyInStock(false);
    setSortBy("featured");
  };

  return (
    <section
      id="catalog"
      className="w-full py-14 md:py-20 bg-slate-950 border-b border-slate-800"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Title Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-spec font-bold uppercase tracking-wider text-amber-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>SG TRADING COMPANY — AUTHORIZED FMCG DISTRIBUTION DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              HORECA & General Trade (GT) Wholesale Catalog
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Direct wholesale distribution for Hotels, Restaurants, QSRs & Retailers by Rahul Garg & Sonu (Mayur Vihar Phase-3, Delhi)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Product Cards</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "table"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Spec Matrix</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Sort: Featured Distribution SKUs</option>
              <option value="price-asc">Unit Rate: Low to High</option>
              <option value="price-desc">Unit Rate: High to Low</option>
            </select>
          </div>
        </div>

        {/* Catalog Main Layout: Sidebar Filters + Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left Sidebar Filter Matrix (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="industrial-card rounded-2xl p-5 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <Filter className="w-4 h-4 text-amber-400" />
                  <span>Distribution Filter Matrix</span>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono-spec"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Segment Selector (HORECA vs GT) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Distribution Segment
                </label>
                <div className="space-y-1">
                  {SEGMENTS.map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSegment(seg)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        segment === seg
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {seg === "HORECA Institutional" ? (
                          <Building2 className="w-3.5 h-3.5 text-sky-400" />
                        ) : seg === "General Trade (GT)" ? (
                          <Store className="w-3.5 h-3.5 text-emerald-400" />
                        ) : null}
                        <span>{seg}</span>
                      </span>
                      {segment === seg && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Authorized Brands (12)
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage & Cold Chain Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Storage & Cold Chain
                </label>
                <div className="space-y-1">
                  {STORAGE_CONDITIONS.map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setStorageCondition(sc)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono-spec transition-all ${
                        storageCondition === sc
                          ? "bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Unit Price Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider">
                    Max Pack Rate (Excl. GST)
                  </span>
                  <span className="font-mono-spec font-bold text-amber-400">
                    ₹{maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={500}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Stock Status Checkbox */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Show Only Immediate Ready-to-Ship Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Product Grid (9 Columns) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono-spec text-amber-400 font-bold">
                  {filteredProducts.length} AUTHORIZED FMCG SKUs DISPLAYED
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">
                  Ready for HORECA Institutional & General Trade Case Delivery
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="industrial-card rounded-2xl p-12 text-center space-y-4">
                <p className="text-base text-slate-300 font-semibold">
                  No distribution SKUs match your current filter combination.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="table"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
