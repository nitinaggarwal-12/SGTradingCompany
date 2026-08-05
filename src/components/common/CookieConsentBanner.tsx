"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldAlert, Check, X, Scale } from "lucide-react";
import { LegalDisclaimerModal } from "@/components/modals/LegalDisclaimerModal";

export const CookieConsentBanner: React.FC = () => {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // default true until client checks
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("sg_trading_cookie_consent_v1");
    if (!consent) {
      setHasConsented(false);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("sg_trading_cookie_consent_v1", "accepted");
    setHasConsented(true);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("sg_trading_cookie_consent_v1", "essential_only");
    setHasConsented(true);
  };

  return (
    <>
      {!hasConsented && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-t-2 border-amber-500/60 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-500">
          <div className="max-w-8xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 max-w-4xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-spec font-black text-amber-400 uppercase tracking-wider">
                    COOKIE CONSENT &amp; B2B LEGAL NOTICE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-spec">
                    SG Trading Company • Delhi NCR
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We use functional session cookies and RFQ telemetry to ensure secure wholesale ordering, cold-chain quote delivery, and GST invoice processing. By continuing, you agree to our{" "}
                  <button
                    onClick={() => setIsDisclaimerOpen(true)}
                    className="text-amber-400 underline font-bold hover:text-amber-300 cursor-pointer"
                  >
                    Wholesale Legal &amp; Liability Disclaimer (Limitation of Litigation)
                  </button>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono-spec text-xs">
              <button
                onClick={() => setIsDisclaimerOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Legal Disclaimer</span>
              </button>

              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition-all cursor-pointer"
              >
                Essential Only
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Accept Cookies &amp; Proceed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Disclaimer Modal */}
      <LegalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </>
  );
};
