"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Flame,
  Zap,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-14 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Corporate Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-amber-500/20">
                SG
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block leading-tight">
                  SG TRADING COMPANY
                </span>
                <span className="text-[11px] font-mono-spec text-amber-400">
                  COMMERCIAL KITCHEN & HORECA SYSTEMS
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              India's trusted industrial trading enterprise and online marketplace for heavy-duty commercial cooking equipment, hotel refrigerators, bakery rotary ovens, SS304 fabrication, and turnkey commercial kitchen projects.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono-spec pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Plot 42, Okhla Industrial Area Phase-III, New Delhi - 110020</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>B2B Sales Helpline: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>rfq@sgtradingco.in | GSTIN: 07AABCS1429B1Z1</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Commercial Equipment
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Heavy 4 & 6 Burner Gas Ranges
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Commercial Twin Electric Fryers
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Upright 1000L SS304 Reach-In Chillers
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Commercial Ice Cube Machines
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  40Kg Industrial Spiral Dough Mixers
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  16-Tray Rotary Rack Bakery Ovens
                </a>
              </li>
            </ul>
          </div>

          {/* Turnkey Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Turnkey Kitchen Layouts
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#turnkey" className="hover:text-amber-400 transition-colors">
                  Cloud Kitchen Layout Blueprint
                </a>
              </li>
              <li>
                <a href="#turnkey" className="hover:text-amber-400 transition-colors">
                  5-Star & Boutique Hotel Kitchens
                </a>
              </li>
              <li>
                <a href="#turnkey" className="hover:text-amber-400 transition-colors">
                  Fine Dining & Specialty Kitchens
                </a>
              </li>
              <li>
                <a href="#turnkey" className="hover:text-amber-400 transition-colors">
                  Industrial Bakery Manufacturing Floor
                </a>
              </li>
              <li>
                <a href="#turnkey" className="hover:text-amber-400 transition-colors">
                  QSR & Fast Food Chain Outlets
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              B2B Corporate & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% SS 304 Food-Grade Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>GST Tax Invoice (18% Input Credit)</span>
              </li>
              <li>Pan-India Heavy Crane & Tailgate Freight</li>
              <li>Annual Maintenance Contracts (AMC)</li>
              <li>FSSAI & HACCP Sanitation Guidance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p>© 2026 SG TRADING COMPANY. All rights reserved. Commercial Kitchen & HORECA Systems.</p>
          <div className="flex items-center gap-6 font-mono-spec text-slate-400">
            <span>GSTIN: 07ADQFS8839Q1ZQ</span>
            <span>FSSAI LIC. NO: [ADD YOUR FSSAI NO.]</span>
            <span>ISO 9001:2015 CERTIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
