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
  Mail,
  MessageCircle,
  Smartphone,
  Send,
  RefreshCw,
  Truck,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface PaidOrderReceipt {
  transactionId: string;
  poNumber: string;
  subtotalExclGst: number;
  gstAmount: number;
  deliveryFreight: number;
  totalInclGst: number;
  customerPaymentMethod: string;
  cardNetworkClearing: string;
  merchantSettlementAccount: string;
  itemsCount: number;
}

export default function CartAndCheckoutPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    deductOrderStock,
    clearCart,
    showToast,
    createCustomerOrder,
    savedPaymentMethods,
  } = useApp();

  const [gstType, setGstType] = useState<"intrastate" | "interstate">(
    "intrastate"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "neft"
  >("upi");
  const [cardBrand, setCardBrand] = useState<
    "VISA" | "MASTERCARD" | "AMEX" | "RUPAY"
  >("VISA");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Preserve exact paid order amount so receipt NEVER shows ₹0 after clearCart!
  const [paidReceipt, setPaidReceipt] = useState<PaidOrderReceipt | null>(null);

  // Dispatch notification modals/states
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [customerEmailInput, setCustomerEmailInput] = useState("");
  const [customerPhoneInput, setCustomerPhoneInput] = useState("9667731355");

  // Credit Card Form states
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8821");
  const [cardExpiry, setCardExpiry] = useState("09/28");
  const [cardCvv, setCardCvv] = useState("842");
  const [cardHolder, setCardHolder] = useState("Rahul Procurement Officer");
  const [selectedBank, setSelectedBank] = useState("HDFC Corporate NetBanking");

  const subtotalExclGst = cart.reduce(
    (acc, item) => acc + item.product.priceExclGst * item.quantity,
    0
  );

  const gstAmount = Math.round((subtotalExclGst * 5) / 100);
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;
  const deliveryFreight = cart.length > 0 ? 350 : 0;
  const totalInclGst = subtotalExclGst + gstAmount + deliveryFreight;

  // Delivery Date & Cold-Chain Time Window Selection
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("Tomorrow Morning (Aug 5)");
  const [selectedTimeWindow, setSelectedTimeWindow] = useState("☀️ 10:30 AM – 01:30 PM (Pre-Lunch QSR Window)");

  const DELIVERY_DATES = [
    { label: "Today Express (Dispatch by 2:00 PM)", badge: "Same Day" },
    { label: "Tomorrow Morning (Aug 5)", badge: "Recommended" },
    { label: "Wednesday (Aug 6)", badge: "Scheduled" },
    { label: "Thursday (Aug 7)", badge: "Scheduled" },
  ];

  const TIME_WINDOWS = [
    { label: "🌅 07:00 AM – 09:30 AM (Early Kitchen Prep)", desc: "Best for Banquets & Breakfast" },
    { label: "☀️ 10:30 AM – 01:30 PM (Pre-Lunch QSR Window)", desc: "Best for Burger & Fry Chains" },
    { label: "🌆 04:30 PM – 07:30 PM (Evening Dinner Peak)", desc: "Best for Cloud Kitchens" },
    { label: "🚚 09:00 PM – 11:30 PM (Late Hotel Dock)", desc: "Best for Night Receiving" },
  ];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("paytmqr69pf0i@ptys");
    setCopiedUpi(true);
    showToast("Merchant UPI ID 'paytmqr69pf0i@ptys' copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const snapshotSubtotal = subtotalExclGst;
    const snapshotGst = gstAmount;
    const snapshotFreight = deliveryFreight;
    const snapshotTotal = totalInclGst;
    const snapshotCount = cart.length;

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedTxn = `SG-PTM-2026-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const customerMethodLabel =
        paymentMethod === "upi"
          ? "Paytm / UPI App QR"
          : paymentMethod === "card"
          ? `${cardBrand} Commercial Card (${cardHolder})`
          : paymentMethod === "netbanking"
          ? `NetBanking (${selectedBank})`
          : "RTGS / NEFT Wire";

      const cardClearingRef =
        paymentMethod === "card"
          ? `${cardBrand} Network Clearing ➔ Gateway Settle-to-UPI`
          : "Direct NPCI UPI Instant Settlement";

      const newReceipt: PaidOrderReceipt = {
        transactionId: generatedTxn,
        poNumber: `PO-SG-2026-${Math.floor(100 + Math.random() * 900)}`,
        subtotalExclGst: snapshotSubtotal,
        gstAmount: snapshotGst,
        deliveryFreight: snapshotFreight,
        totalInclGst: snapshotTotal,
        customerPaymentMethod: customerMethodLabel,
        cardNetworkClearing: cardClearingRef,
        merchantSettlementAccount:
          "SG TRADING COMPANY Paytm UPI (paytmqr69pf0i@ptys • 9667731355)",
        itemsCount: snapshotCount,
      };

      setPaidReceipt(newReceipt);

      createCustomerOrder({
        customerName: "Commercial HORECA / Retail Customer",
        customerGstin: "07ADQFS8839Q1ZQ",
        customerPhone: "9667731355",
        deliveryCity: "Delhi NCR",
        poNumber: newReceipt.poNumber,
        items: [...cart],
        subtotalExclGst: snapshotSubtotal,
        gstAmount: snapshotGst,
        totalAmount: snapshotTotal,
        paymentMethod:
          paymentMethod === "upi"
            ? "paytm_upi"
            : paymentMethod === "card"
            ? "credit_card"
            : "neft_rtgs",
      });

      showToast(
        `Payment Processed via ${cardBrand} Card! Interbank Clearing Completed & Settled to SG Trading Co. Paytm UPI!`
      );
      clearCart();
    }, 1600);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const emailTo = customerEmailInput || "sgtradingcompany@rediffmail.com";
    setDispatchStatus(`Invoice & Tax Receipt sent via Email to ${emailTo}`);
    showToast(`Official Tax Invoice emailed to ${emailTo}!`);
    setTimeout(() => setDispatchStatus(null), 4000);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `*SG TRADING COMPANY - OFFICIAL GST TAX INVOICE*\nDistributor: Rahul Garg & Sonu (Mayur Vihar Phase-3)\nGSTIN: 07ADQFS8839Q1ZQ\nPO Number: ${paidReceipt?.poNumber}\nTransaction ID: ${paidReceipt?.transactionId}\n*Total Amount Paid: ₹${paidReceipt?.totalInclGst?.toLocaleString(
        "en-IN"
      )}*\nCustomer Paid Via: ${paidReceipt?.customerPaymentMethod}\nCard Network Clearing: ${paidReceipt?.cardNetworkClearing}\nMerchant Settlement: SG Trading Co. Paytm UPI (paytmqr69pf0i@ptys)\nGST Input Credit: ₹${paidReceipt?.gstAmount?.toLocaleString("en-IN")}`
    );
    window.open(`https://wa.me/919667731355?text=${text}`, "_blank");
    setDispatchStatus("WhatsApp Tax Receipt link generated!");
    showToast("Opening WhatsApp Web with itemized official GST receipt...");
  };

  const handleSendSMS = () => {
    setDispatchStatus(
      `SMS Text Message Invoice sent to +91 ${customerPhoneInput}`
    );
    showToast(`SMS Tax Invoice sent to +91 ${customerPhoneInput}!`);
    setTimeout(() => setDispatchStatus(null), 4000);
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
                Customer Payment Choice (Visa / Mastercard / Amex / UPI) • Automatically Settled to SG Trading Co. Paytm UPI (`paytmqr69pf0i@ptys`)
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono-spec text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> VERIFIED MERCHANT CHECKOUT
              </span>
            </div>
          </div>

          {paymentSuccess && paidReceipt ? (
            /* Official Digital GST Tax Receipt View */
            <div className="industrial-card max-w-3xl mx-auto rounded-2xl p-8 border border-slate-700 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono-spec uppercase tracking-wider text-emerald-400 font-bold">
                  CARD NETWORK CLEARED & SETTLED TO SG TRADING CO. PAYTM UPI
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
                  <span className="text-slate-400">CUSTOMER PAID VIA:</span>
                  <span className="text-sky-400 font-bold">
                    {paidReceipt.customerPaymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">CARD NETWORK CLEARING:</span>
                  <span className="text-amber-400 font-bold">
                    {paidReceipt.cardNetworkClearing}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">MERCHANT SETTLEMENT ACCOUNT:</span>
                  <span className="text-emerald-400 font-bold">
                    Paytm UPI (paytmqr69pf0i@ptys • 9667731355)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PO & TRANSACTION ID:</span>
                  <span className="text-amber-400 font-bold">
                    {paidReceipt.poNumber} • {paidReceipt.transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">GST INPUT CREDIT (12%):</span>
                  <span className="text-emerald-400 font-bold">
                    ₹{paidReceipt.gstAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold pt-3 border-t border-slate-800">
                  <span className="text-slate-300">TOTAL AMOUNT PAID:</span>
                  <span className="text-amber-400 text-xl">
                    ₹{paidReceipt.totalInclGst.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Status feedback banner for Email/WhatsApp/SMS */}
              {dispatchStatus && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono-spec text-xs font-bold">
                  ✓ {dispatchStatus}
                </div>
              )}

              {/* Multi-Channel Invoice Dispatch Controls (Email, WhatsApp, SMS/Text, Print) */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono-spec text-slate-400 uppercase">
                  DISPATCH OFFICIAL GST TAX INVOICE & RECEIPT VIA:
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Send via Email</span>
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleSendSMS}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-sky-400" />
                    <span>Send via SMS / Text</span>
                  </button>

                  <button
                    onClick={handlePrintReceipt}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official PDF Receipt</span>
                  </button>
                </div>

                {/* Email / SMS Contact Input row */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <input
                    type="email"
                    placeholder="Enter Email (default: sgtradingcompany@rediffmail.com)"
                    value={customerEmailInput}
                    onChange={(e) => setCustomerEmailInput(e.target.value)}
                    className="px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white w-64 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / SMS Phone (+91 9667731355)"
                    value={customerPhoneInput}
                    onChange={(e) => setCustomerPhoneInput(e.target.value)}
                    className="px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white w-52 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/stock-manager"
                  className="inline-block px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
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
                          <span>CGST (2.5%)</span>
                          <span>₹{cgstAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>SGST (2.5%)</span>
                          <span>₹{sgstAmount.toLocaleString("en-IN")}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-slate-400">
                        <span>IGST (5%)</span>
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

                {/* COLD-CHAIN DELIVERY DATE & TIME WINDOW SELECTOR (MOVED BELOW CART) */}
                <div className="industrial-card rounded-2xl p-6 border-2 border-amber-500/50 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>Select Cold-Chain Delivery Schedule</span>
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono-spec mt-0.5">
                        -18°C Insulated Van Dispatch • Mayur Vihar Phase-3 Warehouse
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono-spec text-[10px] font-bold">
                      SLOT GUARANTEED
                    </span>
                  </div>

                  {/* 1. Choose Available Delivery Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono-spec font-bold text-amber-400 uppercase block">
                      1. Choose Preferred Delivery Date:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DELIVERY_DATES.map((dt) => (
                        <button
                          type="button"
                          key={dt.label}
                          onClick={() => {
                            setSelectedDeliveryDate(dt.label);
                            showToast(`Delivery Date set to: ${dt.label}`);
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer h-20 flex flex-col justify-between ${
                            selectedDeliveryDate === dt.label
                              ? "bg-amber-500/20 border-amber-500 text-white font-bold shadow-md"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-xs font-bold leading-tight block">{dt.label}</span>
                          <span className="text-[10px] self-start px-2 py-0.5 rounded bg-slate-800/90 text-amber-400 font-mono-spec font-extrabold">
                            {dt.badge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Choose Commercial Cold-Chain Time Window */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono-spec font-bold text-amber-400 uppercase flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>2. Choose Commercial Delivery Time Window:</span>
                    </label>
                    <div className="space-y-2">
                      {TIME_WINDOWS.map((win) => (
                        <button
                          type="button"
                          key={win.label}
                          onClick={() => {
                            setSelectedTimeWindow(win.label);
                            showToast(`Delivery Time Window set to: ${win.label}`);
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            selectedTimeWindow === win.label
                              ? "bg-amber-500/20 border-amber-500 text-white font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold">{win.label}</p>
                            <p className="text-[10px] text-slate-400 font-mono-spec">
                              {win.desc}
                            </p>
                          </div>
                          {selectedTimeWindow === win.label && (
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Full-Fledged Customer Payment Gateway (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. OFFICIAL SG TRADING COMPANY PAYTM UPI QR STANDEE AT TOP OF CART PAGE */}
                <div className="rounded-2xl border-2 border-sky-500 bg-white text-slate-900 p-5 space-y-4 shadow-2xl flex flex-col items-center">
                  <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-[11px] font-mono font-black text-sky-700 uppercase tracking-wider">
                      INSTANT SCAN &amp; PAY • PAYTM UPI QR
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-extrabold">
                      ● ACTIVE MERCHANT
                    </span>
                  </div>

                  {/* PROMINENT PAY BUTTON MOVED ABOVE QR CODE */}
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base md:text-lg flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>Pay ₹{totalInclGst.toLocaleString("en-IN")} via Paytm UPI</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <img
                    src="/sg-trading-company-paytm-qr.png"
                    alt="SG Trading Company Paytm UPI Merchant QR Code Standee"
                    className="w-full max-w-[320px] rounded-xl shadow-lg border border-slate-200"
                  />

                  <div className="w-full text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm sm:text-base font-mono font-black text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-lg border border-sky-200">
                        paytmqr69pf0i@ptys
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        {copiedUpi ? "Copied!" : "Copy UPI ID"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 font-mono font-bold">
                      Scan with Paytm, GPay, PhonePe or BHIM to pay Rahul Garg (9667731355)
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSimulatePayment}
                  className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Customer Payment Options
                      </h3>
                      <p className="text-[11px] text-emerald-400 font-mono-spec mt-0.5">
                        Visa / Mastercard / Amex / UPI ➔ Settled to SG Trading Co. Paytm UPI (`paytmqr69pf0i@ptys`)
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono-spec font-bold">
                      Cards / UPI / Banking
                    </span>
                  </div>

                  {/* SAVED CUSTOMER PAYMENT METHODS WALLET (SHOWS ONLY WHEN CUSTOMER SELECTS CREDIT CARDS) */}
                  {paymentMethod === "card" && savedPaymentMethods && savedPaymentMethods.length > 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase">
                          SAVED COMMERCIAL PAYMENT METHODS WALLET ({savedPaymentMethods.length})
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono-spec">
                          One-Click Fast Pay
                        </span>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {savedPaymentMethods.map((pm) => (
                          <div
                            key={pm.id}
                            onClick={() => {
                              if (pm.type === "card") {
                                setPaymentMethod("card");
                                setCardBrand(pm.cardBrand || "VISA");
                                setCardNumber(pm.maskedNumber || "");
                                setCardHolder(pm.cardHolder || "");
                              } else {
                                setPaymentMethod("upi");
                              }
                              showToast(`Selected saved method: ${pm.nickname}`);
                            }}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 flex items-center justify-between cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              {pm.type === "card" ? (
                                <CreditCard className="w-4 h-4 text-amber-400" />
                              ) : (
                                <QrCode className="w-4 h-4 text-sky-400" />
                              )}
                              <div>
                                <p className="text-xs font-bold text-white">
                                  {pm.nickname}
                                </p>
                                <p className="text-[10px] font-mono-spec text-slate-400">
                                  {pm.type === "card"
                                    ? `${pm.cardBrand} ${pm.maskedNumber}`
                                    : `UPI ID: ${pm.upiId}`}
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-mono-spec font-bold">
                              Select
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "upi", label: "Paytm / UPI QR", icon: QrCode },
                      { id: "card", label: "Visa / MC / Amex", icon: CreditCard },
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
                          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                            paymentMethod === m.id
                              ? "bg-amber-500/15 border-amber-500 text-amber-400 font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px] font-semibold">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* CUSTOMER PAYMENT METHOD 1: PAYTM / UPI QR (Active at top of page) */}
                  {paymentMethod === "upi" && (
                    <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4 text-center">
                      <p className="text-xs font-mono font-bold text-sky-400">
                        ✓ Paytm UPI QR Standee &amp; Instant Pay button are active at the top of this checkout column.
                      </p>
                    </div>
                  )}

                  {/* CUSTOMER PAYMENT METHOD 2: VISA / MASTERCARD / AMEX CLEARING & SETTLEMENT */}
                  {paymentMethod === "card" && (
                    <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-5 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase">
                          CREDIT / DEBIT CARD CLEARING NETWORK
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono-spec">
                          Auto-Settle to SG Trading Co. Paytm UPI
                        </span>
                      </div>

                      {/* Card Brand Network Selector */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono-spec text-slate-400 uppercase">
                          Select Card Clearing Network:
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {(["VISA", "MASTERCARD", "AMEX", "RUPAY"] as const).map(
                            (brand) => (
                              <button
                                key={brand}
                                type="button"
                                onClick={() => setCardBrand(brand)}
                                className={`py-1.5 px-2 rounded-lg text-xs font-mono-spec font-bold border cursor-pointer ${
                                  cardBrand === brand
                                    ? "bg-amber-500/20 border-amber-500 text-amber-400"
                                    : "bg-slate-900 border-slate-800 text-slate-400"
                                }`}
                              >
                                {brand}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Visual Card Clearing & Settlement Explanation Banner */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono-spec text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>CARD CLEARING & PAYTM UPI SETTLEMENT TRACE:</span>
                        </div>
                        <p>
                          1. Customer pays via <strong>{cardBrand} Commercial Card</strong>.
                          <br />
                          2. Gateway performs {cardBrand} Network Clearing.
                          <br />
                          3. Net settlement deposited directly to <strong>SG Trading Company Paytm UPI (`paytmqr69pf0i@ptys`)</strong>.
                        </p>
                      </div>

                      <div className="space-y-3 font-mono-spec text-xs">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">
                            16-Digit {cardBrand} Credit / Debit Card Number *
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">
                              Expiry (MM/YY) *
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">
                              CVV / CVC *
                            </label>
                            <input
                              type="text"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CUSTOMER PAYMENT METHOD 3: NETBANKING */}
                  {paymentMethod === "netbanking" && (
                    <div className="rounded-2xl border border-sky-500/40 bg-slate-950 p-5 space-y-4">
                      <span className="text-xs font-mono-spec text-sky-400 font-bold uppercase block">
                        SELECT CORPORATE NETBANKING GATEWAY
                      </span>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      >
                        <option value="HDFC Bank Corporate">HDFC Bank Corporate NetBanking</option>
                        <option value="ICICI Bank Commercial">ICICI Bank Commercial Banking</option>
                        <option value="State Bank of India (SBI)">State Bank of India (SBI Enterprise)</option>
                        <option value="Axis Bank Business">Axis Bank Corporate Banking</option>
                      </select>
                      <p className="text-[11px] text-slate-400 font-mono-spec">
                        Payment will be collected via NetBanking & settled directly to SG Trading Company's Paytm UPI Account (`paytmqr69pf0i@ptys`).
                      </p>
                    </div>
                  )}

                  {/* CUSTOMER PAYMENT METHOD 4: RTGS / NEFT */}
                  {paymentMethod === "neft" && (
                    <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-5 space-y-3 font-mono-spec text-xs">
                      <span className="text-xs text-emerald-400 font-bold uppercase block">
                        RTGS / NEFT DIRECT BANK WIRE DETAILS
                      </span>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">BENEFICIARY:</span>
                          <span className="text-white font-bold">SG TRADING COMPANY</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">BANK & BRANCH:</span>
                          <span className="text-white">ICICI Bank, Mayur Vihar Phase-3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">UPI MERCH ID:</span>
                          <span className="text-amber-400 font-bold">paytmqr69pf0i@ptys</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod !== "upi" && (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span>Processing Payment &amp; Settling to SG Trading Co. Paytm UPI...</span>
                      ) : (
                        <>
                          <span>
                            Pay ₹{totalInclGst.toLocaleString("en-IN")} via {paymentMethod === "card" ? `${cardBrand} Card` : "NetBanking"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
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
