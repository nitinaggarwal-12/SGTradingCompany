"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  Boxes,
  Plus,
  Snowflake,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Search,
} from "lucide-react";

export const WarehouseInventoryModal: React.FC = () => {
  const {
    products,
    restockProduct,
    isInventoryModalOpen,
    setIsInventoryModalOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");

  if (!isInventoryModalOpen) return null;

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
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="industrial-card w-full max-w-6xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">
                  SG Trading Co. — Running Warehouse Inventory Manager
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono-spec font-bold">
                  RAHUL GARG & SONU DASHBOARD
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-spec">
                Mayur Vihar Phase-3 Central Warehouse • Real-Time Running Stock Verification
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsInventoryModalOpen(false)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warehouse KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-950/80 border-b border-slate-800 font-mono-spec">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">
              Total Running Warehouse Stock
            </span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              {totalCasesInWarehouse.toLocaleString("en-IN")}{" "}
              <span className="text-xs font-normal text-slate-400">
                Cases/Packs
              </span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">
              Active Authorized SKUs
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {products.length}{" "}
              <span className="text-xs font-normal text-slate-400">
                Brand SKUs
              </span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">
              Low Stock Alerts
            </span>
            <span
              className={`text-2xl font-black mt-1 block ${
                lowStockCount > 0 ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {lowStockCount}{" "}
              <span className="text-xs font-normal text-slate-400">
                SKUs Near Threshold
              </span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">
              Warehouse Facility
            </span>
            <span className="text-sm font-bold text-sky-400 mt-1.5 block">
              Mayur Vihar Ph-3, Delhi
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search running stock by Brand or Product Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {["All Zones", "Cold Room", "Chilled Bay", "Ambient"].map(
              (zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono-spec transition-all ${
                    selectedZone === zone
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {zone}
                </button>
              )
            )}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto max-h-[480px]">
          <table className="w-full text-left border-collapse text-xs font-mono-spec">
            <thead className="sticky top-0 bg-slate-900 z-10 border-b border-slate-800 text-slate-400 uppercase">
              <tr>
                <th className="p-3.5">Brand & Product SKU</th>
                <th className="p-3.5">Warehouse Storage Zone</th>
                <th className="p-3.5 text-center">Running Stock Level</th>
                <th className="p-3.5 text-center">Stock Status</th>
                <th className="p-3.5 text-right">Quick Restock Actions</th>
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
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <span className="text-amber-400 font-bold block">
                            {product.brand}
                          </span>
                          <span className="text-white font-semibold line-clamp-1">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {product.packSize} • MOQ: {product.caseMoq}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                        <Snowflake className="w-3 h-3 text-cyan-400" />
                        {product.warehouseZone}
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      <span className="text-lg font-extrabold text-white">
                        {stock}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Cases/Packs
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      {isOut ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold">
                          <ShieldAlert className="w-3.5 h-3.5" /> Low Stock ({stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Healthy Stock
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => restockProduct(product.id, 10)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition-all text-xs"
                          title="Add +10 Cases to Warehouse"
                        >
                          +10 Cases
                        </button>
                        <button
                          onClick={() => restockProduct(product.id, 50)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold transition-all text-xs"
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

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono-spec">
          <span className="text-slate-400">
            * Stock counts automatically deduct in real-time when orders are confirmed.
          </span>
          <button
            onClick={() => setIsInventoryModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
          >
            Close Inventory Manager
          </button>
        </div>
      </div>
    </div>
  );
};
