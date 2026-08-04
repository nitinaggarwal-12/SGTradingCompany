"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Snowflake,
  ShieldCheck,
  Flame,
  Truck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  brandTag: string;
  image: string;
  metricLabel: string;
  metricValue: string;
  accentColor: string;
}

const SHOWCASE_SLIDES: SlideItem[] = [
  {
    id: "mccain",
    title: "McCain Food Service 9mm Regular French Fries",
    subtitle:
      "Golden fry yield, 26-minute hold-time crisp retention, and uniform institutional cut consistency for QSR & Hotel Kitchens.",
    badge: "#1 HORECA FROZEN BRAND",
    brandTag: "McCain Food Service • Mayur Vihar Cold Room",
    image: "/showcase/mccain-fries-showcase.jpg",
    metricLabel: "CRISP HOLD TIME",
    metricValue: "26 mins @ -18°C",
    accentColor: "amber",
  },
  {
    id: "britannia",
    title: "Britannia Commercial Mozzarella & Blended Cheese",
    subtitle:
      "Engineered for 280°C woodfired ovens, offering 42cm+ pizza stretch with zero blistering and optimal melt elasticity.",
    badge: "PIZZERIA & BANQUET CHOICE",
    brandTag: "Britannia Commercial • 2.5 Kg Shredded Case",
    image: "/showcase/britannia-cheese-stretch.jpg",
    metricLabel: "STRETCH & MELT GAUGE",
    metricValue: "42cm+ Stretch @ 280°C",
    accentColor: "emerald",
  },
  {
    id: "cold-chain",
    title: "-18°C Unbroken Cold-Chain Reefer Fleet",
    subtitle:
      "Direct temperature-monitored refrigerated dispatch from our B-577 Shiv Mandir Road Warehouse in Mayur Vihar Phase-3 to your kitchen dock.",
    badge: "DELHI NCR EXPRESS DISPATCH",
    brandTag: "SG Trading Co. Logistics • Rahul Garg & Sonu",
    image: "/showcase/cold-chain-fleet-van.jpg",
    metricLabel: "CORE FLEET TELEMETRY",
    metricValue: "-18.4°C Active Reefer",
    accentColor: "sky",
  },
];

export const CommercialShowcaseCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = SHOWCASE_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  return (
    <section
      className="py-12 bg-slate-900/60 dark:bg-slate-950/80 border-y border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono-spec font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCIAL QUALITY VISUAL SHOWCASE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Authorized Quality That Drives HORECA Profitability
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              High-resolution field performance across frozen potatoes, commercial cheese stretch, and Mayur Vihar Phase-3 cold-chain logistics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Main Visual Showcase Carousel Card */}
        <div className="relative industrial-card rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-950 aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9]">
          {/* Active Image with cross-fade */}
          {SHOWCASE_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Dark Vignette & Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-mono-spec text-xs font-black uppercase tracking-wider shadow-lg">
                      {slide.badge}
                    </span>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-mono-spec font-bold text-white">
                      <Snowflake className="w-4 h-4 text-sky-400" />
                      <span>{slide.metricLabel}: </span>
                      <span className="text-amber-400 font-extrabold">
                        {slide.metricValue}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text & Actions */}
                  <div className="max-w-3xl space-y-3">
                    <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase tracking-wider block">
                      {slide.brandTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 sm:line-clamp-none max-w-2xl">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Link
                        href="/#catalog"
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg"
                      >
                        <span>Order Wholesale Cases</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/cart"
                        className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs transition-all"
                      >
                        Check Live Pricing &amp; GST →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-20 flex items-center gap-2">
            {SHOWCASE_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-amber-400"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
