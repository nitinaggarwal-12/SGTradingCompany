"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
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
  ArrowLeft,
  Snowflake,
} from "lucide-react";
import Link from "next/link";

export default function CartAndCheckoutPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    deductOrderStock,
    clearCart,
    showToast,
    createCustomerOrder,
  } = useApp();

  const [gstType, setGstType] = useState<"intrastate" | "interstate">(
    "intrastate"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "neft"
  >("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [upiId, setUpiId] = useState("");

  const subtotalExclGst = cart.reduce(
    (acc, item) => acc + item.product.priceExclGst * item.quantity,
    0
  );

  const gstAmount = Math.round((subtotalExclGst * 12) / 100);
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;
  const deliveryFreight = cart.length > 0 ? 350 : 0;
  const totalInclGst = subtotalExclGst + gstAmount + deliveryFreight;

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
      const generatedTxn = `SG-PTM-2026-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setTransactionId(generatedTxn);

      // Create live Order in Order-to-Cash (O2C) Pipeline & notify Rahul & Sonu
      createCustomerOrder({
        customerName: "Commercial HORECA / Retail Customer",
        customerGstin: "07ADQFS8839Q1ZQ",
        customerPhone: "9667731355",
        deliveryCity: "Delhi NCR",
        poNumber: `PO-SG-2026-${Math.floor(100 + Math.random() * 900)}`,
        items: [...cart],
        subtotalExclGst,
        gstAmount,
        totalAmount: totalInclGst,
        paymentMethod: paymentMethod === "upi" ? "paytm_upi" : paymentMethod === "card" ? "credit_card" : "neft_rtgs",
      });

      showToast(
        "PO Generated & Payment Verified! Rahul Garg & Sonu Notified in Order-to-Cash Desk."
      );
      clearCart();
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <StickyHeader />

      <main className="flex-1 py-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          {/* Top Breadcrumb Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono-spec font-bold uppercase mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping / Catalog
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                SG Trading Co. — Wholesale Cart & Payment Gateway
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono-spec">
                Official Distributor Checkout • GSTIN: 07ADQFS8839Q1ZQ • Rahul Garg & Sonu (Mayur Vihar Phase-3)
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono-spec text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> VERIFIED MERCHANT CHECKOUT
              </span>
            </div>
          </div>

          {paymentSuccess ? (
            /* Official Digital GST Tax Receipt View */
            <div className="industrial-card max-w-3xl mx-auto rounded-2xl p-8 border border-slate-700 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono-spec uppercase tracking-wider text-emerald-400 font-bold">
                  PAYMENT VERIFIED VIA PAYTM / UPI
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  Commercial Order Confirmed!
                </h2>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you for ordering from <strong className="text-amber-400">Rahul Garg & Sonu (SG Trading Company)</strong>. Your running warehouse stock has been updated, and cold-chain dispatch is scheduled from Mayur Vihar Phase-3.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left font-mono-spec text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">MERCHANT NAME:</span>
                  <span className="text-white font-bold">SG TRADING COMPANY (Rahul & Sonu)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">DISTRIBUTOR GSTIN:</span>
                  <span className="text-amber-400 font-bold">07ADQFS8839Q1ZQ</span>
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
                <div className="flex justify-between text-base font-extrabold pt-3 border-t border-slate-800">
                  <span className="text-slate-300">TOTAL AMOUNT PAID:</span>
                  <span className="text-amber-400">
                    ₹{totalInclGst.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official GST Tax Receipt</span>
                </button>
                <Link
                  href="/stock-manager"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Inspect Updated Warehouse Stock →
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="industrial-card rounded-2xl p-16 text-center space-y-4 max-w-xl mx-auto">
              <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Your Wholesale Cart is Empty
              </h3>
              <p className="text-xs text-slate-400">
                Browse our 12 authorized HORECA & General Trade brands to add packs or master cases.
              </p>
              <Link
                href="/#catalog"
                className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Explore Product Catalog →
              </Link>
            </div>
          ) : (
            /* Widescreen Two-Column Checkout Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items & GST Calculations (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base">
                      Added Products ({cart.length} SKUs)
                    </h3>
                    <span className="text-xs text-amber-400 font-mono-spec">
                      Direct Distributor Pricing
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-4 items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-mono-spec text-amber-400 font-bold block">
                            {item.product.brand}
                          </span>
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono-spec mt-1">
                            {item.product.packSize} • {item.product.storageCondition}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2.5 py-1 text-slate-400 hover:text-white"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 py-1 text-xs font-mono-spec font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2.5 py-1 text-slate-400 hover:text-white"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-bold text-white font-mono-spec block">
                                ₹{(item.product.priceExclGst * item.quantity).toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono-spec">
                                Excl. GST
                              </span>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GST Compliance & Calculation Summary Card */}
                <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono-spec text-slate-400 block uppercase">
                      GST Compliance Billing Option:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setGstType("intrastate")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border cursor-pointer ${
                          gstType === "intrastate"
                            ? "bg-amber-500/15 border-amber-500 text-amber-400"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        CGST + SGST (Delhi NCR)
                      </button>
                      <button
                        onClick={() => setGstType("interstate")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border cursor-pointer ${
                          gstType === "interstate"
                            ? "bg-amber-500/15 border-amber-500 text-amber-400"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        IGST (Inter-State)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono-spec text-xs border-t border-slate-800 pt-4">
                    <div className="flex justify-between text-slate-300">
                      <span>Products Subtotal (Excl. GST)</span>
                      <span>₹{subtotalExclGst.toLocaleString("en-IN")}</span>
                    </div>

                    {gstType === "intrastate" ? (
                      <>
                        <div className="flex justify-between text-slate-400">
                          <span>CGST (6%)</span>
                          <span>₹{cgstAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>SGST (6%)</span>
                          <span>₹{sgstAmount.toLocaleString("en-IN")}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-slate-400">
                        <span>IGST (12%)</span>
                        <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>-18°C Refrigerated Delivery & Logistics</span>
                      <span>₹{deliveryFreight}</span>
                    </div>

                    <div className="flex justify-between text-lg font-extrabold text-white pt-3 border-t border-slate-800">
                      <span>TOTAL ORDER PAYABLE</span>
                      <span className="text-amber-400">
                        ₹{totalInclGst.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Full-Fledged Payment Gateway (5 Cols) */}
              <div className="lg:col-span-5">
                <form
                  onSubmit={handleSimulatePayment}
                  className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base">
                      Select Payment Method
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono-spec font-bold">
                      Paytm / UPI / Card
                    </span>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "upi", label: "Paytm / UPI QR", icon: QrCode },
                      { id: "card", label: "Card", icon: CreditCard },
                      { id: "netbanking", label: "NetBanking", icon: Building2 },
                      { id: "neft", label: "RTGS / NEFT", icon: ShieldCheck },
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
                          className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
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

                  {/* Paytm UPI Display */}
                  {paymentMethod === "upi" && (
                    <div className="rounded-2xl overflow-hidden border border-sky-500/40 bg-white text-slate-900 p-6 space-y-4">
                      <div className="text-center space-y-1">
                        <div className="inline-block px-3 py-1 rounded bg-sky-500 text-white font-extrabold text-xs tracking-wider uppercase">
                          Paytm से UPI
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                          SG TRADING COMPANY
                        </h3>
                        <p className="text-base font-extrabold font-mono text-slate-800">
                          9667731355
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="w-44 h-44 rounded-xl bg-white border-2 border-sky-500 p-2 shadow-md flex flex-col items-center justify-center">
                          <div className="w-full h-full border border-slate-300 rounded p-1.5 flex flex-col justify-between">
                            <div className="flex justify-between">
                              <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                                <div className="w-4 h-4 bg-slate-900" />
                              </div>
                              <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                                <div className="w-4 h-4 bg-slate-900" />
                              </div>
                            </div>
                            <div className="text-center font-mono-spec text-[9px] font-black text-sky-600 uppercase">
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

                        <div className="text-center space-y-2">
                          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                            EXACT MERCHANT UPI ID:
                          </span>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-mono font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
                              paytmqr69pf0i@ptys
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUPI}
                              className="px-3 py-1 rounded-lg bg-sky-600 text-white text-xs font-bold"
                            >
                              {copiedUpi ? "Copied!" : "Copy UPI"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Verifying Paytm UPI Payment & Deducting Stock...</span>
                    ) : (
                      <>
                        <span>
                          Confirm Payment of ₹{totalInclGst.toLocaleString("en-IN")} & Complete Order
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <DistributionConciergeChatbot />
    </div>
  );
}
