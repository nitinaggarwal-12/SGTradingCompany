"use client";

import React from "react";
import {
  ShieldCheck,
  Snowflake,
  Truck,
  Building2,
  Award,
  PhoneCall,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const AboutUsSection: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 bg-slate-900/70 border-b border-slate-800"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual & Infrastructure Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="industrial-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono-spec font-bold text-amber-400 uppercase tracking-wider">
                    DISTRIBUTOR CREDENTIALS & INFRASTRUCTURE
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    SG Trading Company — Mayur Vihar Phase-3, Delhi
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono-spec font-bold border border-emerald-500/30">
                  AUTH. DISTRIBUTOR
                </span>
              </div>

              {/* Operators Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono-spec text-slate-400 uppercase block">
                    Authorized Managing Directors
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    Rahul Garg & Sonu
                  </h4>
                  <p className="text-xs text-slate-300">
                    Overseeing institutional HORECA supply & General Trade FMCG wholesale distribution.
                  </p>
                  <div className="pt-2 border-t border-slate-800 font-mono-spec text-xs text-amber-400 font-bold">
                    Ph: 9667731355 / 9643097002
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono-spec text-slate-400 uppercase block">
                    Central Distribution Warehouse
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Mayur Vihar Phase-3, Delhi
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                  </p>
                  <div className="pt-2 border-t border-slate-800 font-mono-spec text-xs text-sky-400">
                    sgtradingcompany@rediffmail.com
                  </div>
                </div>
              </div>

              {/* Three Strategic Infrastructure Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-spec">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Snowflake className="w-4 h-4" />
                    <span>-18°C Cold Chain</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Dedicated refrigerated trucks for McCain & ITC frozen foods
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Truck className="w-4 h-4" />
                    <span>Same-Day Delhi NCR</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Express hotel, cloud kitchen & QSR store replenishment
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Tax Invoice</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Official GST credit billing for institutional partners
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Story (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>ABOUT SG TRADING COMPANY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Bridging India's Top Food Brands with Hotels, Restaurants & Retail Stores.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Founded and led by <strong className="text-white">Rahul Garg & Sonu</strong>, <strong className="text-amber-400">SG Trading Company</strong> is a premier authorized distributor specializing in two core pillars of food distribution across Delhi NCR:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span>1. HORECA Institutional Supplies</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We supply commercial 2.5 Kg french fries, diced pizza cheese, mayonnaise, sausage frankfurters, and ready gravy bases to 5-star hotels, cloud kitchens, pizza chains, and banquet halls from <strong className="text-white">McCain, ITC Master Chef, Veeba, Britannia Cheese, Iscon Balaji, Go Diced, Chatha Foods & Milkana Professional</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>2. General Trade (GT) FMCG Wholesale Distribution</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We distribute high-velocity retail carton packs to Kirana supermarkets, Modern Trade outlets, and retail distributors including <strong className="text-white">Anoop Pure Roasted Chana Sattu, Ocean Fruit Water, Sleepy Owl Arabica Instant Coffee & Loyka Almond Brittle</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Rahul Garg & Sonu for Distribution Terms</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
