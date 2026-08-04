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
import { CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const { toastMessage, theme } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      } relative`}
    >
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce font-mono-spec text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE PHONE NATIVE APP VERSION (Visible on Phones < md) */}
      <MobileCommercialAppView />

      {/* DESKTOP WEB PORTAL VERSION (Visible on Desktop / Tablet >= md) */}
      <div className="hidden md:flex flex-col flex-1">
        {/* Edge-to-Edge Sticky Navigation Header */}
        <StickyHeader
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onScrollToCatalog={scrollToCatalog}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Asymmetric Industrial Hero & Interactive Turnkey Supply Bundle Estimator */}
          <HeroSection onExploreCatalog={scrollToCatalog} />

          {/* Animated 3D Brand Ticker showcasing all 12 Authorized Brands */}
          <BrandTicker />

          {/* Multi-Faceted HORECA & General Trade Catalog */}
          <EquipmentCatalog
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
          />

          {/* Turnkey Case Supply Blueprints Showcase */}
          <TurnkeyShowcaseSection />

          {/* Executive About Us Section — Rahul Garg & Sonu, Mayur Vihar Phase-3, Delhi */}
          <AboutUsSection />

          {/* Interactive Contact Us & Direct Distributor Inquiry Desk */}
          <ContactUsSection />

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
