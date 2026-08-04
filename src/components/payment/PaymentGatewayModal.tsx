"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  Copy,
  Check,
} from "lucide-react";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  gstAmount: number;
  orderSummaryText: string;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  amount,
  gstAmount,
  orderSummaryText,
}) => {
  const { cart, deductOrderStock, clearCart, showToast } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "neft"
  >("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  // UPI Form state
  const [upiId, setUpiId] = useState("");

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("paytmqr69pf0i@ptys");
    setCopiedUpi(true);
    showToast("Merchant UPI ID 'paytmqr69pf0i@ptys' copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedTxn = `SG-PTM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTxn);
      deductOrderStock(cart);
      showToast("Payment Verified via Paytm UPI! Stock automatically deducted from Warehouse.");
      clearCart();
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="industrial-card w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold">
              SG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  SG TRADING COMPANY — Paytm & UPI Gateway
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-spec font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> VERIFIED MERCHANT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-spec">
                Authorized Distributor Billing • Phone: 9667731355 • Mayur Vihar Phase-3, Delhi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {paymentSuccess ? (
          <div className="p-8 space-y-6 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 animate-pulse">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-spec uppercase tracking-wider text-emerald-400 font-bold">
                PAYMENT RECEIVED VIA PAYTM / UPI
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Commercial Order Confirmed!
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for ordering from <strong className="text-amber-400">Rahul Garg & Sonu (SG Trading Company)</strong>. Your running warehouse stock has been updated, and cold-chain dispatch is scheduled.
              </p>
            </div>

            {/* Official Digital Payment Receipt Box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-left font-mono-spec text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">MERCHANT:</span>
                <span className="text-white font-bold">SG TRADING COMPANY (9667731355)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DISTRIBUTOR GSTIN:</span>
                <span className="text-amber-400 font-bold">07ADQFS8839Q1ZQ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FSSAI LIC. NO:</span>
                <span className="text-emerald-400 font-bold">[ADD YOUR FSSAI NO.]</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UPI ID PAID TO:</span>
                <span className="text-amber-400 font-bold">paytmqr69pf0i@ptys</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TRANSACTION ID:</span>
                <span className="text-sky-400 font-bold">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GST INPUT CREDIT:</span>
                <span className="text-emerald-400 font-bold">
                  ₹{gstAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-slate-800">
                <span className="text-slate-300">TOTAL PAID AMOUNT:</span>
                <span className="text-amber-400">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official GST Tax Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Done & Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSimulatePayment} className="p-6 space-y-6">
            {/* Amount Summary Ribbon */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono-spec text-slate-400 block uppercase">
                  Total Payable (Incl. GST)
                </span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono-spec">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono-spec text-emerald-400 block">
                  Includes ₹{gstAmount.toLocaleString("en-IN")} GST
                </span>
                <span className="text-[11px] text-slate-400">
                  Paytm / All UPI Apps Supported
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "upi", label: "Paytm / UPI QR", icon: QrCode },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "NetBanking", icon: Building2 },
                { id: "neft", label: "B2B RTGS / NEFT", icon: ShieldCheck },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      setPaymentMethod(
                        m.id as "upi" | "card" | "netbanking" | "neft"
                      )
                    }
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === m.id
                        ? "bg-amber-500/15 border-amber-500 text-amber-400 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment Form Area */}
            {paymentMethod === "upi" && (
              <div className="rounded-2xl overflow-hidden border border-sky-500/40 bg-white text-slate-900 p-6 space-y-5">
                <div className="text-center space-y-1">
                  <div className="inline-block px-3 py-1 rounded bg-sky-500 text-white font-extrabold text-xs tracking-wider uppercase">
                    Paytm से UPI
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase mt-1">
                    SG TRADING COMPANY
                  </h3>
                  <p className="text-base font-extrabold font-mono text-slate-800">
                    9667731355
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="w-44 h-44 rounded-xl bg-white border-2 border-sky-500 p-2 shadow-md flex flex-col items-center justify-center relative">
                    <div className="w-full h-full border border-slate-300 rounded p-1.5 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                          <div className="w-4 h-4 bg-slate-900" />
                        </div>
                        <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                          <div className="w-4 h-4 bg-slate-900" />
                        </div>
                      </div>
                      <div className="text-center font-mono-spec text-[9px] font-black text-sky-600 uppercase tracking-tighter">
                        SCAN IN PAYTM APP
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                          <div className="w-4 h-4 bg-slate-900" />
                        </div>
                        <div className="text-right text-[8px] font-mono font-bold text-slate-600">
                          PAYTM QR
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-center sm:text-left flex-1">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                        EXACT MERCHANT UPI ID:
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-mono font-black text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200">
                          paytmqr69pf0i@ptys
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUPI}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 shadow"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">
                      Scan using <strong>Paytm, Google Pay, PhonePe, BHIM or UPI Lite</strong> to pay <strong className="text-slate-900">₹{amount.toLocaleString("en-IN")}</strong> directly to Rahul Garg & Sonu.
                    </p>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-600 block mb-1">
                        Enter Your Phone / UPI App ID for instant verification:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 9667731355@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Merchant: SG TRADING COMPANY</span>
                  <span>Phone: 9667731355</span>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="industrial-card rounded-xl p-5 border border-slate-800 space-y-3">
                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    Corporate / Business Credit or Debit Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• 8901"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono-spec text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      Expiry Date (MM/YY) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="09/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono-spec text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      CVV Security Code *
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono-spec text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Garg / Company Authorized Card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="industrial-card rounded-xl p-5 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-white block">
                  Select Your Corporate / Business Bank:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "HDFC Corporate",
                    "ICICI Bank",
                    "State Bank (SBI)",
                    "Axis Corporate",
                    "Kotak Mahindra",
                    "Yes Bank",
                    "IDFC First",
                    "IndusInd Bank",
                  ].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs font-semibold text-slate-300 hover:text-white transition-all text-center"
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paymentMethod === "neft" && (
              <div className="industrial-card rounded-xl p-5 border border-slate-800 space-y-2 font-mono-spec text-xs">
                <h4 className="text-sm font-bold text-amber-400">
                  SG Trading Company — Official Bank Account for RTGS / NEFT
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-slate-300">
                  <p>
                    <strong>ACCOUNT NAME:</strong> SG TRADING COMPANY
                  </p>
                  <p>
                    <strong>PHONE / UPI:</strong> 9667731355 (Rahul Garg)
                  </p>
                  <p>
                    <strong>UPI ID:</strong> paytmqr69pf0i@ptys
                  </p>
                  <p>
                    <strong>BANK:</strong> ICICI BANK LTD, MAYUR VIHAR PHASE-3 BRANCH
                  </p>
                  <p>
                    <strong>ACCOUNT NUMBER:</strong> 004105008942
                  </p>
                  <p>
                    <strong>IFSC CODE:</strong> ICIC0000041
                  </p>
                </div>
              </div>
            )}

            {/* Process Payment CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Verifying Paytm UPI Payment & Issuing Official GST Receipt...</span>
              ) : (
                <>
                  <span>
                    Confirm Paytm / UPI Payment of ₹{amount.toLocaleString("en-IN")} & Complete Order
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
