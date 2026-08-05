"use client";

import React from "react";
import { X, ShieldAlert, Scale, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border-2 border-amber-500/80 shadow-2xl p-6 md:p-8 space-y-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-spec font-black text-amber-400 uppercase tracking-wider block">
                STATUTORY B2B WHOLESALE LEGAL NOTICE &amp; LIABILITY LIMITATION
              </span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                SG Trading Company • Terms of Commercial Supply &amp; Litigation Disclaimer
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Content Clauses */}
        <div className="space-y-5 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          {/* Clause 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-amber-400 uppercase font-mono-spec flex items-center gap-2">
              <span>1. Authorized Third-Party Distribution &amp; Trademark Disclaimer</span>
            </h3>
            <p>
              SG Trading Company (Operating from B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096, GSTIN: <strong>07ADQFS8839Q1ZQ</strong>) is an independent authorized distributor and supplier of institutional HORECA and General Trade (GT) FMCG goods. All product brand names, registered trademarks, logos, nutritional labels, allergen disclosures, manufacturing dates, and shelf-life guarantees—including but not limited to <em>McCain Foods, ITC Master Chef, Veeba Food Services, Britannia Industries, Iscon Balaji, Go Diced, Chatha Foods, Milkana, Anoop Sattu, Ocean Water, Sleepy Owl, and Loyka</em>—belong exclusively to their respective manufacturing brand owners. SG Trading Company claims no ownership over factory product formulations or internal manufacturing defects.
            </p>
          </div>

          {/* Clause 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-emerald-400 uppercase font-mono-spec flex items-center gap-2">
              <span>2. Cold-Chain Logistics Transit Guarantee &amp; Post-Delivery Spoilage Limitation</span>
            </h3>
            <p>
              SG Trading Company guarantees temperature-controlled transit (-18°C Deep Frozen for frozen potato/cheese/chicken goods; +2°C to +4°C for chilled dairy goods) from its Mayur Vihar Phase-3 Cold Room 1 up to physical handoff and delivery receipt signed by the purchasing hotel, restaurant, cloud kitchen, or retail representative.
            </p>
            <p className="text-amber-300 font-semibold pt-1">
              <strong>CRITICAL LIABILITY WAIVER:</strong> Once a delivery shipment is physically accepted, temperature-verified at kitchen dock, and signed via delivery challan/invoice, SG Trading Company accepts zero liability, financial claims, food safety litigation, or product return demands for product thaw, freezer burn, spoilage, or bacterial degradation resulting from customer kitchen freezer malfunctions, power outages, improper cold-room handling, or delayed kitchen defrosting post-delivery.
            </p>
          </div>

          {/* Clause 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-sky-400 uppercase font-mono-spec flex items-center gap-2">
              <span>3. Wholesale B2B Pricing, MOQ &amp; GST Input Tax Credit Compliance</span>
            </h3>
            <p>
              All wholesale rates published on this portal or communicated via RFQ quote are subject to manufacturer factory price revisions and prevailing market availability. GST tax invoices bearing official GSTIN <strong>07ADQFS8839Q1ZQ</strong> are issued strictly in compliance with the Central Goods and Services Tax (CGST) Act and Delhi SGST regulations. Buyers are solely responsible for verifying their own GST input tax credit eligibility.
            </p>
          </div>

          {/* Clause 4 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-white uppercase font-mono-spec flex items-center gap-2">
              <span>4. Complete Limitation of Liability &amp; Indemnification</span>
            </h3>
            <p>
              To the maximum extent permitted under Indian law, SG Trading Company, its drivers, and employees shall not be held liable for any indirect, incidental, consequential, special, or exemplary damages, business interruption losses, or third-party consumer litigation arising out of commercial product supply or kitchen usage. By engaging in commercial transactions with SG Trading Company, purchasing entities agree to indemnify and hold harmless SG Trading Company against all third-party claims.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <span className="text-xs font-mono-spec text-slate-400">
            Jurisdiction: Courts of Delhi, India • SG Trading Company (Rahul Garg &amp; Sonu)
          </span>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg"
          >
            I Acknowledge &amp; Agree to Terms
          </button>
        </div>
      </div>
    </div>
  );
};
