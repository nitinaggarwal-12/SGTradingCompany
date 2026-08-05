"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  CustomerOrder,
  OrderLifecycleStage,
  OrderPaymentMethod,
} from "@/types/equipment";
import {
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  QrCode,
  ShieldCheck,
  Printer,
  ArrowLeft,
  Phone,
  Building2,
  AlertCircle,
  Plus,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function OrderToCashPage() {
  const {
    orders,
    createCustomerOrder,
    advanceOrderStage,
    markOrderPaid,
    products,
  } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    orders[0] || null
  );
  const [filterStage, setFilterStage] = useState<string>("ALL");
  const [activePaymentModalOrderId, setActivePaymentModalOrderId] = useState<
    string | null
  >(null);

  const STAGE_LABELS: Record<OrderLifecycleStage, { label: string; step: number }> =
    {
      "1_PO_PLACED": { label: "1. PO Placed", step: 1 },
      "2_DISTRIBUTOR_NOTIFIED": {
        label: "2. Distributor Notified (Rahul & Sonu)",
        step: 2,
      },
      "3_WAREHOUSE_FULFILLED": {
        label: "3. Warehouse Fulfilled (-18°C Van)",
        step: 3,
      },
      "4_TAX_INVOICE_SENT": {
        label: "4. GST Tax Invoice Sent",
        step: 4,
      },
      "5_PAYMENT_RECEIVED": {
        label: "5. Payment Verified (UPI/Card/PayPal)",
        step: 5,
      },
      "6_RECONCILED_CLOSED": {
        label: "6. Reconciled & Closed",
        step: 6,
      },
    };

  const filteredOrders = orders.filter((o) =>
    filterStage === "ALL" ? true : o.stage === filterStage
  );

  const handleSimulateNewPO = () => {
    const newPO = createCustomerOrder({
      customerName: "Taj Palace Hotel & Conventions",
      customerGstin: "07AAACT2941C1Z3",
      customerPhone: "+91 98110 55890",
      deliveryCity: "Chanakyapuri, New Delhi",
      poNumber: `PO-TAJ-2026-${Math.floor(100 + Math.random() * 900)}`,
      items: [
        { product: products[0], quantity: 20 },
        { product: products[6], quantity: 15 },
      ],
      subtotalExclGst: 10900,
      gstAmount: 1308,
      totalAmount: 12208,
    });
    setSelectedOrder(newPO);
  };

  const getStepNumber = (stage: OrderLifecycleStage) =>
    STAGE_LABELS[stage]?.step || 1;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <main className="flex-1 py-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          {/* Top Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono-spec font-bold uppercase mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to SG Trading Co. Portal
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Order-to-Cash (O2C) Enterprise Lifecycle Engine
                </h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono-spec font-bold border border-emerald-500/30">
                  REAL-TIME DISTRIBUTOR PIPELINE
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 font-mono-spec">
                Complete PO Generation ➔ Rahul Garg & Sonu Notification ➔ Warehouse Fulfillment ➔ GST Invoice ➔ UPI / Credit Card / PayPal Payment Reconciliation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSimulateNewPO}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Simulate New Customer PO (Taj Palace Hotel)</span>
              </button>
            </div>
          </div>

          {/* Order-to-Cash Visual Pipeline Flow Summary */}
          <div className="industrial-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-spec font-bold text-amber-400 uppercase">
                ENTERPRISE ORDER-TO-CASH (O2C) 6-STAGE WORKFLOW
              </span>
              <span className="text-xs font-mono-spec text-slate-400">
                GSTIN: 07ADQFS8839Q1ZQ • Phone: 9667731355 / 9643097002
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  step: 1,
                  title: "1. Customer PO Placed",
                  desc: "PO generated via Cart / RFQ",
                },
                {
                  step: 2,
                  title: "2. Distributor Alert",
                  desc: "Rahul Garg & Sonu Notified",
                },
                {
                  step: 3,
                  title: "3. Warehouse Picked",
                  desc: "-18°C Van Dispatched",
                },
                {
                  step: 4,
                  title: "4. GST Invoice Sent",
                  desc: "INV-SG-2026 Issued",
                },
                {
                  step: 5,
                  title: "5. Payment Received",
                  desc: "Paytm UPI / Card / PayPal",
                },
                {
                  step: 6,
                  title: "6. Reconciled & Closed",
                  desc: "Order to Cash Complete",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono-spec font-black text-xs inline-flex items-center justify-center">
                    {item.step}
                  </span>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono-spec">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Widescreen Two-Column Order Management Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Active Customer Orders List (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-base font-bold text-white">
                  Active Customer Orders ({filteredOrders.length})
                </h3>
                <span className="text-xs font-mono-spec text-amber-400">
                  Select Order to Process
                </span>
              </div>

              {filteredOrders.map((order) => {
                const currentStep = getStepNumber(order.stage);
                const isSelected = selectedOrder?.orderId === order.orderId;

                return (
                  <div
                    key={order.orderId}
                    onClick={() => setSelectedOrder(order)}
                    className={`industrial-card p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? "border-amber-500 bg-slate-900 shadow-xl"
                        : "border-slate-800 hover:border-slate-700 bg-slate-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono-spec text-amber-400 font-bold uppercase">
                          {order.poNumber}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {order.customerName}
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-spec font-bold ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {order.paymentStatus === "PAID"
                          ? "PAID & RECONCILED"
                          : `STEP ${currentStep}/6: IN PIPELINE`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono-spec text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Amount: ₹{order.totalAmount.toLocaleString("en-IN")}</span>
                      <span>GSTIN: {order.customerGstin}</span>
                    </div>

                    {/* Progress Indicator Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${(currentStep / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Order-to-Cash Inspector & Fulfillment Action Panel (7 Cols) */}
            <div className="lg:col-span-7">
              {selectedOrder ? (
                <div className="industrial-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6">
                  {/* Order Top Summary */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase">
                        ORDER-TO-CASH DOSSIER: {selectedOrder.orderId}
                      </span>
                      <h2 className="text-2xl font-extrabold text-white mt-1">
                        {selectedOrder.customerName}
                      </h2>
                      <p className="text-xs text-slate-400 font-mono-spec">
                        PO: <strong>{selectedOrder.poNumber}</strong> • Invoice:{" "}
                        <strong>{selectedOrder.invoiceNumber}</strong>
                      </p>
                    </div>

                    <div className="text-right font-mono-spec">
                      <span className="text-2xl font-black text-amber-400 block">
                        ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-400">
                        Incl. ₹{selectedOrder.gstAmount} GST
                      </span>
                    </div>
                  </div>

                  {/* Distributor Fulfillment Action Bar (Rahul Garg & Sonu Operations) */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono-spec font-bold text-amber-400 uppercase flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        DISTRIBUTOR FULFILLMENT & O2C ACTION CONTROL DESK
                      </h4>
                      <span className="text-[11px] font-mono-spec text-slate-400">
                        Rahul Garg (9667731355) & Sonu
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {/* Step 3 Action */}
                      <button
                        onClick={() =>
                          advanceOrderStage(
                            selectedOrder.orderId,
                            "3_WAREHOUSE_FULFILLED"
                          )
                        }
                        disabled={
                          getStepNumber(selectedOrder.stage) >= 3
                        }
                        className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-left disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <span className="text-[10px] font-mono-spec text-amber-400 font-bold uppercase block">
                          Stage 3: Warehouse Pick
                        </span>
                        <span className="text-xs font-bold text-white block mt-0.5">
                          Mark Order Fulfilled & Dispatched (-18°C Van)
                        </span>
                      </button>

                      {/* Step 4 Action */}
                      <button
                        onClick={() =>
                          advanceOrderStage(
                            selectedOrder.orderId,
                            "4_TAX_INVOICE_SENT"
                          )
                        }
                        disabled={
                          getStepNumber(selectedOrder.stage) < 3 ||
                          getStepNumber(selectedOrder.stage) >= 4
                        }
                        className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-left disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <span className="text-[10px] font-mono-spec text-sky-400 font-bold uppercase block">
                          Stage 4: Tax Billing
                        </span>
                        <span className="text-xs font-bold text-white block mt-0.5">
                          Send Commercial GST Tax Invoice (07ADQFS8839Q1ZQ)
                        </span>
                      </button>

                      {/* Step 5/6 Action */}
                      <button
                        onClick={() =>
                          setActivePaymentModalOrderId(selectedOrder.orderId)
                        }
                        disabled={
                          selectedOrder.paymentStatus === "PAID"
                        }
                        className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500 text-left disabled:opacity-40 transition-all cursor-pointer group"
                      >
                        <span className="text-[10px] font-mono-spec text-emerald-400 group-hover:text-slate-950 font-bold uppercase block">
                          Stage 5 & 6: Cash Collect
                        </span>
                        <span className="text-xs font-bold text-white group-hover:text-slate-950 block mt-0.5">
                          Record Payment (Paytm / Card / PayPal / NEFT)
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Multi-Channel Payment Verification Box if active */}
                  {activePaymentModalOrderId === selectedOrder.orderId && (
                    <div className="p-6 rounded-2xl bg-white text-slate-900 space-y-4 border-2 border-emerald-500">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-base text-slate-900">
                          Verify & Collect Payment for {selectedOrder.poNumber}
                        </h4>
                        <span className="text-xs font-mono font-bold text-emerald-600">
                          Amount: ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        Select the payment channel through which the customer remitted funds to SG Trading Company:
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                          onClick={() => {
                            markOrderPaid(selectedOrder.orderId, "paytm_upi");
                            setActivePaymentModalOrderId(null);
                          }}
                          className="p-3 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white border border-sky-300 text-slate-900 font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
                        >
                          <QrCode className="w-5 h-5 text-sky-600" />
                          <span>Paytm / UPI QR</span>
                          <span className="text-[9px] font-mono">
                            paytmqr69pf0i@ptys
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            markOrderPaid(selectedOrder.orderId, "credit_card");
                            setActivePaymentModalOrderId(null);
                          }}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
                        >
                          <CreditCard className="w-5 h-5 text-amber-600" />
                          <span>Credit / Debit Card</span>
                          <span className="text-[9px] font-mono">
                            Visa / Mastercard
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            markOrderPaid(selectedOrder.orderId, "paypal");
                            setActivePaymentModalOrderId(null);
                          }}
                          className="p-3 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-300 text-slate-900 font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
                        >
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <span>PayPal Global</span>
                          <span className="text-[9px] font-mono">
                            International Express
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            markOrderPaid(selectedOrder.orderId, "neft_rtgs");
                            setActivePaymentModalOrderId(null);
                          }}
                          className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-300 text-slate-900 font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
                        >
                          <Building2 className="w-5 h-5 text-emerald-600" />
                          <span>RTGS / NEFT Wire</span>
                          <span className="text-[9px] font-mono">
                            ICICI Bank A/C
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Order Line-Item Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-spec font-bold text-slate-400 uppercase">
                      Ordered Products & Storage Temperature
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-800 text-xs font-mono-spec">
                        <thead>
                          <tr className="bg-slate-900 text-slate-400 uppercase">
                            <th className="p-3">Brand</th>
                            <th className="p-3">Product Name & Pack Size</th>
                            <th className="p-3 text-center">Case Qty</th>
                            <th className="p-3 text-right">Unit Rate</th>
                            <th className="p-3 text-right">Line Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {selectedOrder.items.map((item) => (
                            <tr key={item.product.id}>
                              <td className="p-3 font-bold text-amber-400">
                                {item.product.brand}
                              </td>
                              <td className="p-3 text-white">
                                {item.product.name}
                                <span className="block text-[10px] text-cyan-400">
                                  {item.product.storageCondition}
                                </span>
                              </td>
                              <td className="p-3 text-center text-white font-bold">
                                {item.quantity} Cases
                              </td>
                              <td className="p-3 text-right text-slate-300">
                                ₹{item.product.b2bWholesalePrice || item.product.priceExclGst}
                              </td>
                              <td className="p-3 text-right text-amber-400 font-bold">
                                ₹{((item.product.b2bWholesalePrice || item.product.priceExclGst) * item.quantity).toLocaleString("en-IN")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Customer & Logistics Details Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-spec text-xs pt-2">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 uppercase block text-[10px]">
                        Customer Contact & GSTIN:
                      </span>
                      <p className="text-white font-bold">
                        {selectedOrder.customerName}
                      </p>
                      <p className="text-amber-400">
                        GSTIN: {selectedOrder.customerGstin}
                      </p>
                      <p className="text-slate-300">
                        Phone: {selectedOrder.customerPhone}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 uppercase block text-[10px]">
                        Logistics & Distributor Information:
                      </span>
                      <p className="text-white font-bold">
                        SG TRADING COMPANY (Rahul Garg & Sonu)
                      </p>
                      <p className="text-emerald-400">
                        Warehouse: Mayur Vihar Phase-3, Delhi
                      </p>
                      <p className="text-slate-300">
                        Cold-Chain: Dedicated -18°C Refrigerated Vans
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DistributionConciergeChatbot />
    </div>
  );
}
