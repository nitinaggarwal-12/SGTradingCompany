"use client";

import React from "react";
import {
  ShieldCheck,
  Truck,
  Wrench,
  FileText,
  Award,
  Clock,
} from "lucide-react";

export const TrustIndustrialSection: React.FC = () => {
  const PILLARS = [
    {
      icon: ShieldCheck,
      title: "100% SS 304 Food-Grade Guarantee",
      desc: "Every cooking range, preparation worktable, upright chiller and sink unit is fabricated using certified non-magnetic SS 304 food-contact stainless steel.",
      badge: "NON-MAGNETIC CERTIFIED",
    },
    {
      icon: FileText,
      title: "100% GST Tax Invoice Compliant",
      desc: "Instant automated GST invoice calculation (CGST + SGST or IGST 18%) with buyer GSTIN validation for corporate input tax credit.",
      badge: "B2B TAX CREDIT READY",
    },
    {
      icon: Truck,
      title: "Pan-India Heavy Logistics & Tailgate Rigging",
      desc: "Dedicated heavy-equipment transport fleet with hydraulic tailgate unloading and on-site positioning for hotel and restaurant kitchens.",
      badge: "PAN-INDIA FREIGHT",
    },
    {
      icon: Wrench,
      title: "24/7 Priority Commercial AMC & Emergency Service",
      desc: "Direct access to SG Trading Co. sales engineering & field technicians for preventive annual maintenance and emergency breakdown coverage.",
      badge: "AMC TECH COVERAGE",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono-spec font-bold text-amber-400 uppercase tracking-wider">
            WHY INDIA'S TOP CHEFS & HOTELS CHOOSE SG TRADING COMPANY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Industrial Engineering Rigor & Commercial Reliability
          </h2>
          <p className="text-sm text-slate-400">
            Backed by decades of industrial HORECA trading, equipment fabrication, and turnkey commercial kitchen deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono-spec font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
