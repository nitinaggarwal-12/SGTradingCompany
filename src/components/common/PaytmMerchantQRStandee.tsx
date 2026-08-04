"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode, ShieldCheck, Phone } from "lucide-react";

interface PaytmMerchantQRStandeeProps {
  compact?: boolean;
}

export const PaytmMerchantQRStandee: React.FC<PaytmMerchantQRStandeeProps> = ({
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("paytmqr69pf0i@ptys");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-sky-500 bg-white text-slate-900 shadow-xl flex flex-col items-center p-4 space-y-4">
      {/* Official Paytm Blue Merchant Header */}
      <div className="w-full text-center pb-2 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-white font-extrabold text-[11px] uppercase tracking-wider mb-1">
          <QrCode className="w-3.5 h-3.5" />
          <span>Paytm से UPI • OFFICIAL MERCHANT QR</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
          SG TRADING COMPANY
        </h3>
        <p className="text-sm font-mono font-extrabold text-slate-700">
          Phone: 9667731355 (Rahul Garg)
        </p>
      </div>

      {/* Official Authentic Uploaded Paytm UPI Merchant Standee QR Image */}
      <div className="relative w-full max-w-[310px] rounded-xl overflow-hidden border-2 border-slate-200 shadow-md bg-white">
        <img
          src="/sg-trading-company-paytm-qr.png"
          alt="SG Trading Company Paytm UPI Merchant QR Standee (paytmqr69pf0i@ptys)"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Exact UPI ID & One-Click Copy Bar */}
      <div className="w-full text-center space-y-2.5 pt-1">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm sm:text-base font-mono font-black text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
            paytmqr69pf0i@ptys
          </span>
          <button
            type="button"
            onClick={handleCopyUPI}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy UPI ID</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono font-bold text-slate-600">
          <span className="flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            Paytm Postpaid / UPI / GPay / PhonePe
          </span>
          <span>• GSTIN: 07ADQFS8839Q1ZQ</span>
        </div>
      </div>
    </div>
  );
};
