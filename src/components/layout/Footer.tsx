"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Snowflake,
  Boxes,
  UserCheck,
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
                <span className="text-[11px] font-mono-spec text-amber-400 font-bold">
                  AUTHORIZED HORECA & GENERAL TRADE FMCG DISTRIBUTOR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Delhi NCR&apos;s premier commercial distributor for Hotels, Restaurants, Banquets, QSRs & Retail Stores. Managed by <strong className="text-amber-400">Rahul Garg & Sonu</strong> with active <strong className="text-cyan-400">-18°C cold-chain storage</strong> in Mayur Vihar Phase-3.
            </p>

            <div className="space-y-2 text-xs text-slate-200 font-mono-spec pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Distributor Helpline: +91 9667731355 / +91 9643097002</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  sgtradingcompany@rediffmail.com • GSTIN: <strong className="text-amber-400">07ADQFS8839Q1ZQ</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Active Portal Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Distributor Operations & Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  Authorized 12-Brand FMCG Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/stock-manager"
                  className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5"
                >
                  <Boxes className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mayur Vihar Warehouse Stock Manager</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/order-to-cash"
                  className="hover:text-amber-400 text-amber-400 font-bold transition-colors"
                >
                  Order-to-Cash (O2C) Enterprise Desk
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Customer Account & Guest Shopping</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* B2B Wholesale & Payment Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              B2B Commercial Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/rfq-workspace"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  B2B Wholesale Proforma Quote Sheet
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  Technical & Margin Spec Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  Wholesale Cart & Payment Gateway
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  Distributor Infrastructure & Fleet
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Authorized Distribution Guarantees
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Snowflake className="w-3.5 h-3.5" />
                <span>-18°C Unbroken Cold-Chain Delivery</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>GST Tax Invoice (100% Input Credit)</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Direct Authorized Distributor Pricing</span>
              </li>
              <li className="text-slate-300 font-mono-spec text-[11px] pt-1">
                Merchant Settlement Account: SG Trading Co. Paytm UPI (`paytmqr69pf0i@ptys`)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p>© 2026 SG TRADING COMPANY (Rahul Garg & Sonu). All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono-spec text-slate-300">
            <span>OFFICIAL GSTIN: <strong className="text-amber-400">07ADQFS8839Q1ZQ</strong></span>
            <span>WAREHOUSE: MAYUR VIHAR PHASE-3, DELHI NCR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
