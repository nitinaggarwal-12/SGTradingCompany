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

  // Card Form state & Saved Cards
  const { savedPaymentMethods, currentUser, addSavedPaymentMethod } = useApp();
  const [selectedSavedCardId, setSelectedSavedCardId] = useState<string | null>(
    savedPaymentMethods.length > 0 ? savedPaymentMethods[0].id : null
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [saveCardForFuture, setSaveCardForFuture] = useState(true);
  const [cvvError, setCvvError] = useState(false);

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

    // STRICT PCI-DSS MANDATORY CVV SECURITY CHECK FOR TRANSACTIONS
    if (paymentMethod === "card") {
      if (!cardCvv || cardCvv.trim().length < 3) {
        setCvvError(true);
        showToast("⛔ SECURITY ERROR: Mandatory 3-Digit CVV required to execute transaction!");
        return;
      }
      setCvvError(false);

      // Save new card if checked (Only REDACTED Card Mask is saved; CVV is NEVER stored)
      if (!selectedSavedCardId && saveCardForFuture && cardNumber.length >= 12) {
        const last4 = cardNumber.slice(-4);
        addSavedPaymentMethod({
          type: "card",
          nickname: `Commercial Card •••• ${last4}`,
          maskedNumber: `•••• •••• •••• ${last4}`,
          cardBrand: "VISA",
          cardHolder: cardHolder || "Authorized Kitchen Buyer",
          expiry: cardExpiry || "12/28",
        });
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedTxn = `SG-PTM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTxn);
      deductOrderStock(cart);
      showToast("Payment Verified via Paytm UPI / Commercial Card! Stock automatically deducted from Warehouse.");
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
                  SG TRADING COMPANY — Paytm &amp; UPI Gateway
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-spec font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> VERIFIED PCI-DSS ENCRYPTED
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
                PAYMENT RECEIVED &amp; AUTHORIZED
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Commercial Order Confirmed!
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for ordering from <strong className="text-amber-400">Rahul Garg &amp; Sonu (SG Trading Company)</strong>. Your running warehouse stock has been updated, and cold-chain dispatch is scheduled.
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
                <span className="text-emerald-400 font-bold">13324008000192</span>
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
                Done &amp; Continue Browsing
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
                  PCI-DSS Zero-Knowledge Masking Active
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "upi", label: "Paytm / UPI QR", icon: QrCode },
                { id: "card", label: "Commercial Card", icon: CreditCard },
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
              <div className="rounded-2xl overflow-hidden border-2 border-sky-500 bg-white text-slate-900 p-5 space-y-4 flex flex-col items-center">
                <img
                  src="/sg-trading-company-paytm-qr.png"
                  alt="SG Trading Company Paytm UPI Merchant QR Standee"
                  className="w-full max-w-[320px] rounded-xl shadow-lg border border-slate-200"
                />

                <div className="w-full text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-mono font-black text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-lg border border-sky-200">
                      paytmqr69pf0i@ptys
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
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

                  <p className="text-xs text-slate-600 font-mono font-bold">
                    Scan with Paytm, GPay, PhonePe or BHIM to pay <strong className="text-slate-900">₹{amount.toLocaleString("en-IN")}</strong> to Rahul Garg (9667731355).
                  </p>

                  <div className="max-w-sm mx-auto text-left">
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
            )}

            {paymentMethod === "card" && (
              <div className="industrial-card rounded-xl p-5 border border-slate-800 space-y-4">
                {/* SAVED COMMERCIAL CARDS SECTION (REDACTED MASK ONLY) */}
                {savedPaymentMethods.length > 0 && (
                  <div className="space-y-2 pb-3 border-b border-slate-800">
                    <label className="text-[10px] font-mono-spec text-amber-400 block uppercase font-bold">
                      🔒 SAVED COMMERCIAL CARDS (REDACTED PCI-DSS MASK):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {savedPaymentMethods.map((card) => {
                        const isSelected = selectedSavedCardId === card.id;
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => {
                              setSelectedSavedCardId(card.id);
                              setCvvError(false);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-amber-500/15 border-amber-500 text-white"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono-spec text-xs font-black text-amber-400">
                                {card.maskedNumber || "•••• •••• •••• 8901"}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono-spec">
                                Exp: {card.expiry || "12/28"}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-200 truncate mt-1">
                              {card.cardHolder || "Authorized Kitchen Buyer"}
                            </p>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setSelectedSavedCardId(null)}
                        className={`p-3 rounded-xl border text-center font-mono-spec text-xs font-bold transition-all cursor-pointer ${
                          selectedSavedCardId === null
                            ? "bg-amber-500/15 border-amber-500 text-amber-400"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        + Use New Commercial Card
                      </button>
                    </div>
                  </div>
                )}

                {/* IF NEW CARD IS SELECTED */}
                {selectedSavedCardId === null && (
                  <div className="space-y-3">
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
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Rahul Garg / Kitchen Director"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MANDATORY CVV INPUT (REQUIRED FOR BOTH SAVED & NEW CARDS - NEVER STORED) */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border-2 border-amber-500/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono-spec font-black text-amber-400 uppercase">
                      ENTER MANDATORY 3-DIGIT CVV SECURITY CODE *
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono-spec font-bold">
                      NEVER STORED IN DB / REDACTED
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => {
                        setCardCvv(e.target.value);
                        setCvvError(false);
                      }}
                      className="w-32 px-4 py-2 bg-slate-950 border border-amber-500 rounded-xl text-center text-base font-mono-spec font-black text-amber-400 tracking-widest focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-300 leading-tight">
                      For PCI-DSS compliance, CVV code is required for every transaction and is erased immediately after authorization.
                    </p>
                  </div>

                  {cvvError && (
                    <p className="text-xs text-rose-400 font-mono-spec font-bold">
                      ⛔ Security Alert: Please enter your valid 3-digit CVV code to execute this payment.
                    </p>
                  )}
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
                    <strong>ACCOUNT NUMBER (REDACTED):</strong> •••• •••• 8942 <span className="text-slate-500">(Full account visible on official proforma invoice)</span>
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
                <span>Verifying Authorization &amp; Issuing Official GST Receipt...</span>
              ) : (
                <>
                  <span>
                    Confirm Payment of ₹{amount.toLocaleString("en-IN")} &amp; Complete Order
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
