"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandTicker } from "@/components/home/BrandTicker";
import { EquipmentCatalog } from "@/components/catalog/EquipmentCatalog";
import { TurnkeyShowcaseSection } from "@/components/home/TurnkeyShowcaseSection";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { ContactUsSection } from "@/components/home/ContactUsSection";
import { TrustIndustrialSection } from "@/components/home/TrustIndustrialSection";
import { Footer } from "@/components/layout/Footer";
import { CompareSpecsModal } from "@/components/modals/CompareSpecsModal";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { WarehouseInventoryModal } from "@/components/modals/WarehouseInventoryModal";
import { CartDrawer } from "@/components/drawers/CartDrawer";
import { RFQDrawer } from "@/components/drawers/RFQDrawer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import { MobileCommercialAppView } from "@/components/mobile/MobileCommercialAppView";
import { ColdChain3DVisualizer } from "@/components/home/ColdChain3DVisualizer";
import { CommercialShowcaseCarousel } from "@/components/home/CommercialShowcaseCarousel";
import { B2BGrowthAndSalesSuite } from "@/components/home/B2BGrowthAndSalesSuite";
import {
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Move,
} from "lucide-react";

export default function HomePage() {
  const {
    toastMessage,
    theme,
    isCanvasMode,
    layoutBlocks,
    moveBlockUp,
    moveBlockDown,
    toggleBlockEnabled,
    viewportMode,
  } = useApp();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Component Registry mapping BlockType string to live React Section component
  const renderLayoutBlock = (type: string) => {
    switch (type) {
      case "CommercialShowcaseCarousel":
        return <CommercialShowcaseCarousel />;
      case "BrandTicker":
        return <BrandTicker />;
      case "EquipmentCatalog":
        return (
          <EquipmentCatalog
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
          />
        );
      case "ContactUsSection":
        return <ContactUsSection />;
      default:
        return null;
    }
  };

  const viewportContainerClasses =
    viewportMode === "mobile"
      ? "max-w-[390px] mx-auto border-4 border-amber-500 rounded-[36px] overflow-hidden shadow-2xl my-6 bg-slate-950"
      : viewportMode === "tablet"
      ? "max-w-[834px] mx-auto border-4 border-amber-500 rounded-3xl overflow-hidden shadow-2xl my-6 bg-slate-950"
      : "flex flex-col flex-1";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      } relative pt-12 md:pt-0`}
    >
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce font-mono-spec text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RESPONSIVE WEB PORTAL CONTENT AREA */}
      <div className={`flex flex-col flex-1 ${viewportContainerClasses}`}>
        {/* Main Content Area */}
        <main className="flex-1 space-y-4">
          {/* 1. Commercial Quality Visual Showcase Carousel */}
          <CommercialShowcaseCarousel />

          {/* 2. Authorized Distributor Brand Infinite Marquee (Instant Direct Factory Trust) */}
          <BrandTicker />

          {/* 3. 16 SKU AUTHORIZED PRODUCT CATALOG GRID */}
          <div id="catalog">
            <EquipmentCatalog
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
            />
          </div>

          {/* 4. INSTITUTIONAL B2B GROWTH, SALES, CREDIT & VOLUME TIER SUITE */}
          <B2BGrowthAndSalesSuite />

          {/* 5. Dynamic 3D Industrial Cold-Chain Telemetry & Culinary Quality Simulator */}
          <ColdChain3DVisualizer />

          {/* 6. Mayur Vihar Phase-3 Warehouse Authority & Instant RFQ Concierge */}
          <HeroSection onExploreCatalog={scrollToCatalog} />

          {/* COMPONENT REGISTRY: SPATIAL DRAG-AND-DROP JSON LAYOUT TREE RENDERER */}
          {layoutBlocks
            .filter(
              (block) =>
                block.type !== "CommercialShowcaseCarousel" &&
                block.type !== "BrandTicker" &&
                block.type !== "EquipmentCatalog"
            )
            .map((block) => (
            <div
              key={block.id}
              className={`relative transition-all ${
                isCanvasMode
                  ? "border-2 border-dashed border-amber-500/50 hover:border-amber-400 p-1.5 rounded-2xl bg-amber-500/5"
                  : ""
              }`}
            >
              {/* Spatial Layout Reordering Toolbar when Canvas Edit Mode is Active */}
              {isCanvasMode && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-950/95 border border-amber-500/80 mb-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Move className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono-spec font-black text-amber-400 uppercase">
                      BLOCK: {block.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono-spec px-2 py-0.5 rounded font-bold ${
                        block.enabled
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {block.enabled ? "ACTIVE SECTION" : "HIDDEN"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveBlockUp(block.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 font-mono-spec text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Move Section Up Spatially"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Move Up</span>
                    </button>

                    <button
                      onClick={() => moveBlockDown(block.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 font-mono-spec text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Move Section Down Spatially"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                      <span>Move Down</span>
                    </button>

                    <button
                      onClick={() => toggleBlockEnabled(block.id)}
                      className={`px-2.5 py-1 rounded-lg font-mono-spec text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        block.enabled
                          ? "bg-rose-600/30 text-rose-300 hover:bg-rose-600"
                          : "bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600"
                      }`}
                    >
                      {block.enabled ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Render the block if enabled or if in Canvas Edit Mode */}
              {(block.enabled || isCanvasMode) && renderLayoutBlock(block.type)}
            </div>
          ))}

          {/* Turnkey Case Supply Blueprints Showcase */}
          <TurnkeyShowcaseSection />

          {/* Executive About Us Section */}
          <AboutUsSection />

          {/* Core Industrial Guarantees & Cold Chain Pillars */}
          <TrustIndustrialSection />
        </main>

        {/* Corporate Footer */}
        <Footer />
      </div>

      {/* Modals & Slide-Over Drawers */}
      <CompareSpecsModal />
      <QuickViewModal />
      <WarehouseInventoryModal />
      <CartDrawer />
      <RFQDrawer />

      {/* Empathetic Humane Distribution Concierge Chatbot */}
      <DistributionConciergeChatbot />
    </div>
  );
}
