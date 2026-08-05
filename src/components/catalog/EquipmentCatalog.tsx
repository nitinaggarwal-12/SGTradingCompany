"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
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
  CheckSquare,
  Square,
} from "lucide-react";

interface EquipmentCatalogProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ALL_BRANDS_LIST = [
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

const ALL_CATEGORIES_LIST = [
  "HORECA - Frozen Foods & Fries",
  "HORECA - Commercial Cheese & Dairy",
  "HORECA - Sauces, Mayo & Dressings",
  "GT - Beverages & Hydration",
  "GT - Packaged Foods & Gourmet Snacks",
];

export const EquipmentCatalog: React.FC<EquipmentCatalogProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const {
    products,
    isCanvasMode,
    openProductInspector,
    deleteProductFromCatalog,
  } = useApp();

  const [segment, setSegment] = useState<string>("All");
  // Multi-select brands array (defaults to all 12 brands selected)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(ALL_BRANDS_LIST);
  const [storageCondition, setStorageCondition] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const isAllBrandsSelected = selectedBrands.length === ALL_BRANDS_LIST.length;

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandName)) {
        // Uncheck this brand (if at least 1 remains, or allow empty)
        const next = prev.filter((b) => b !== brandName);
        return next;
      } else {
        // Check this brand
        return [...prev, brandName];
      }
    });
  };

  const toggleAllBrands = () => {
    if (isAllBrandsSelected) {
      // If all are selected, uncheck all (or reset)
      setSelectedBrands([]);
    } else {
      setSelectedBrands(ALL_BRANDS_LIST);
    }
  };

  const SEGMENTS = ["All", "HORECA Institutional", "General Trade (GT)"];

  const STORAGE_CONDITIONS = [
    "All Storage Conditions",
    "Frozen (-18°C Cold Chain)",
    "Chilled (2°C to 4°C)",
    "Ambient Dry Storage",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        selectedCategory !== "All Categories" &&
        p.category !== selectedCategory
      ) {
        return false;
      }
      if (segment !== "All" && p.segment !== segment) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      if (
        storageCondition !== "All Storage Conditions" &&
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
    selectedBrands,
    storageCondition,
    maxPrice,
    onlyInStock,
    sortBy,
  ]);

  const handleResetFilters = () => {
    onCategoryChange("All Categories");
    setSegment("All");
    setSelectedBrands(ALL_BRANDS_LIST);
    setStorageCondition("All Storage Conditions");
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
              Direct wholesale distribution for Hotels, Restaurants, QSRs &amp; Retailers by SG Trading Company (Mayur Vihar Phase-3, Delhi)
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

        {/* Quick Interactive Checkbox Bar */}
        <div className="flex flex-wrap items-center gap-2 py-4 border-b border-slate-800/80">
          <span className="text-xs font-mono-spec font-bold text-slate-400 mr-2">
            CHECKBOX FILTER CONTROL:
          </span>
          <button
            onClick={toggleAllBrands}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isAllBrandsSelected
                ? "bg-amber-500 text-slate-950 border-amber-500 font-extrabold"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500"
            }`}
          >
            {isAllBrandsSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span>
              {isAllBrandsSelected
                ? "☑️ ALL 12 BRANDS CHECKED (Click to Toggle)"
                : "⬜ SELECT ALL 12 BRANDS"}
            </span>
          </button>

          <button
            onClick={() => onCategoryChange("All Categories")}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "All Categories"
                ? "bg-amber-500/20 text-amber-400 border-amber-500"
                : "bg-slate-900 text-slate-400 border-slate-800"
            }`}
          >
            {selectedCategory === "All Categories" ? (
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Square className="w-3.5 h-3.5" />
            )}
            <span>ALL CATEGORIES</span>
          </button>

          <button
            onClick={handleResetFilters}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-300 flex items-center gap-1 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset All Filters</span>
          </button>
        </div>

        {/* Catalog Main Layout: Sidebar Filters + Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left Sidebar Filter Matrix (3 Columns) */}
          <div className="lg:col-span-3">
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

              {/* Product Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Product Category Filter
                </label>
                <div className="space-y-1">
                  {[
                    "All Categories",
                    ...ALL_CATEGORIES_LIST,
                  ].map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="truncate">{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Select Authorized Brands with ☑️ ALL Toggle */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Authorized Brands ({selectedBrands.length}/12)
                  </label>
                  <button
                    type="button"
                    onClick={toggleAllBrands}
                    className="text-[11px] font-mono-spec text-amber-400 hover:underline font-bold"
                  >
                    {isAllBrandsSelected ? "Uncheck All" : "Check All"}
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  {/* Master ALL BRANDS Checkbox */}
                  <button
                    type="button"
                    onClick={toggleAllBrands}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isAllBrandsSelected
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {isAllBrandsSelected ? (
                      <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span>☑️ ALL 12 AUTHORIZED BRANDS</span>
                  </button>

                  {ALL_BRANDS_LIST.map((b) => {
                    const isChecked = selectedBrands.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBrand(b)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isChecked
                            ? "text-white font-bold bg-slate-900/80"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className="truncate">{b}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Segment Selector (HORECA vs GT) */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Distribution Segment
                </label>
                <div className="space-y-1">
                  {SEGMENTS.map((seg) => {
                    const isSelected = segment === seg;
                    return (
                      <button
                        key={seg}
                        onClick={() => setSegment(seg)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected ? (
                            <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span>
                            {seg === "All" ? "☑️ ALL SEGMENTS" : seg}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage & Cold Chain Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Storage & Cold Chain
                </label>
                <div className="space-y-1">
                  {STORAGE_CONDITIONS.map((sc) => {
                    const isSelected = storageCondition === sc;
                    return (
                      <button
                        key={sc}
                        onClick={() => setStorageCondition(sc)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono-spec transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="truncate">{sc}</span>
                      </button>
                    );
                  })}
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
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <span>Show Only In-Stock Warehouse Cases</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Catalog Grid or Specification Matrix (9 Columns) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter Status Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 border border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono-spec font-bold uppercase text-amber-400">
                  Active Filters:
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono-spec font-bold border border-amber-500/40">
                  Category: {selectedCategory}
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono-spec font-bold border border-amber-500/40">
                  Brands: {selectedBrands.length}/12 Selected
                </span>
                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono-spec font-bold border border-cyan-500/40">
                  Storage: {storageCondition}
                </span>
              </div>

              <div className="text-xs font-mono-spec font-extrabold text-white">
                Showing <span className="text-amber-400 text-sm">{filteredProducts.length}</span> of{" "}
                {products.length} Authorized SKUs
              </div>
            </div>

            {/* Product Display: Grid Mode vs Table Matrix Mode */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group/canvas">
                    {isCanvasMode && (
                      <div className="absolute top-2 left-2 right-2 z-50 flex items-center justify-between gap-1.5 p-1.5 rounded-xl bg-slate-950/95 border-2 border-amber-500 shadow-2xl">
                        <button
                          onClick={() => openProductInspector(product)}
                          className="flex-1 py-1 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-spec font-black text-[10px] uppercase cursor-pointer"
                        >
                          ✎ Edit SKU / Price
                        </button>
                        <button
                          onClick={() => deleteProductFromCatalog(product.id)}
                          className="py-1 px-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono-spec font-bold text-[10px] uppercase cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))}

                {/* Symmetrical Grid Filler Card to eliminate empty whitespace in incomplete rows */}
                <div className="industrial-card rounded-2xl p-6 border-2 border-dashed border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 flex flex-col justify-between hover:border-amber-500 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono-spec text-[10px] font-black uppercase">
                        CUSTOM HORECA SUPPLY
                      </span>
                      <span className="text-xs text-emerald-400 font-mono-spec font-bold">
                        ● MAYUR VIHAR WAREHOUSE
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white leading-tight">
                      Need a Special Commercial Brand or Custom Master Case Size?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      SG Trading Company provides custom frozen food, institutional cheese blends, and GT packaging contracts across Mayur Vihar &amp; Delhi NCR.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 font-mono-spec text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Wholesale Desk:</span>
                        <span className="text-amber-400 font-bold">9667731355</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Cold Room Desk:</span>
                        <span className="text-amber-400 font-bold">9643097002</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-col gap-2">
                    <a
                      href="https://wa.me/919667731355?text=Hello%20Rahul%20Garg,%20I%20need%20a%20custom%20wholesale%20FMCG%20case%20quote."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs text-center transition-all cursor-pointer"
                    >
                      Request Custom Institutional Rate →
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="industrial-card rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono-spec">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase">
                      <th className="p-3.5">SKU & Brand</th>
                      <th className="p-3.5">Product Name</th>
                      <th className="p-3.5">Pack Size</th>
                      <th className="p-3.5">Cold Chain</th>
                      <th className="p-3.5 text-right">Unit Rate</th>
                      <th className="p-3.5 text-right">Wholesale Rate</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-900/60">
                        <td className="p-3.5 font-bold text-amber-400">
                          {product.sku}
                          <span className="block text-[10px] text-slate-400">
                            {product.brand}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {product.name}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {product.packSize}
                        </td>
                        <td className="p-3.5 text-cyan-400 font-bold">
                          {product.storageCondition}
                        </td>
                        <td className="p-3.5 text-right text-white font-bold">
                          ₹{product.priceExclGst}
                        </td>
                        <td className="p-3.5 text-right text-amber-400 font-bold">
                          ₹{product.b2bWholesalePrice}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                            {product.stockQuantity} Cases
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
