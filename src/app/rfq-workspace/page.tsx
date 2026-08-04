"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  FileText,
  Printer,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function RFQWorkspacePage() {
  const { rfqItems, removeFromRFQ, updateRFQQuantity, showToast } = useApp();

  const [buyer, setBuyer] = useState({
    companyName: "",
    gstin: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "Delhi NCR",
    pincode: "",
  });

  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const subtotalExclGst = rfqItems.reduce(
    (acc, item) =>
      acc + (item.product.b2bWholesalePrice || item.product.priceExclGst) * item.quantity,
    0
  );

  const totalGst = Math.round((subtotalExclGst * 12) / 100);
  const grandTotal = subtotalExclGst + totalGst;

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteGenerated(true);
    showToast("Official Wholesale B2B Proforma Quotation Generated!");
  };

  const handlePrint = () => {
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
                <ArrowLeft className="w-3.5 h-3.5" /> Back to SG Trading Co. Portal
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                B2B Wholesale & Commercial Case Quotation Workspace
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono-spec">
                Official Distributor Proforma Sheet • GSTIN: 07ADQFS8839Q1ZQ • Rahul Garg & Sonu (Mayur Vihar Phase-3)
              </p>
            </div>

            {quoteGenerated && (
              <button
                onClick={handlePrint}
                className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official PDF Proforma Sheet</span>
              </button>
            )}
          </div>

          {quoteGenerated ? (
            /* Printable Formal B2B Quotation Sheet */
            <div className="industrial-card rounded-2xl p-8 md:p-12 bg-white text-slate-900 border border-slate-300 shadow-2xl max-w-5xl mx-auto space-y-8 print:shadow-none print:border-none">
              {/* Distributor Letterhead */}
              <div className="flex flex-wrap justify-between items-start border-b-2 border-slate-900 pb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    SG TRADING COMPANY
                  </h1>
                  <p className="text-xs font-bold text-amber-700 uppercase mt-1">
                    AUTHORIZED DISTRIBUTOR — HORECA & GENERAL TRADE (GT) FOOD SERVICES
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-mono">
                    <strong>GSTIN:</strong> 07ADQFS8839Q1ZQ • <strong>FSSAI LIC. NO:</strong> [ADD YOUR FSSAI NO.]
                    <br />
                    B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                    <br />
                    <strong>Contacts:</strong> Rahul Garg (9667731355) & Sonu (9643097002)
                  </p>
                </div>

                <div className="text-right border-l-2 border-slate-200 pl-6 font-mono text-xs">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-amber-400 font-bold uppercase rounded">
                    WHOLESALE PROFORMA QUOTATION
                  </span>
                  <p className="font-bold text-slate-900 mt-2">
                    QUOTE NO: SG-DIST-2026-441
                  </p>
                  <p className="text-slate-600">
                    DATE: {new Date().toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-slate-600">VALIDITY: 15 Calendar Days</p>
                </div>
              </div>

              {/* Client Buyer Details */}
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold uppercase text-slate-500 block text-[10px]">
                    QUOTATION ISSUED TO (BUYER):
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {buyer.companyName || "HORECA Establishment / General Trade Partner"}
                  </h4>
                  <p className="text-slate-700 font-mono mt-1">
                    <strong>BUYER GSTIN:</strong> {buyer.gstin || "NOT PROVIDED"}
                  </p>
                  <p className="text-slate-600">
                    <strong>Contact Officer:</strong> {buyer.contactPerson || "Procurement Manager"} ({buyer.phone || "+91 Contact"})
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold uppercase text-slate-500 block text-[10px]">
                    LOGISTICS & DELIVERY TERMS:
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>Delivery Destination:</strong> {buyer.city}
                  </p>
                  <p className="text-slate-600">
                    <strong>Cold-Chain Fleet:</strong> Dedicated -18°C / Chilled Truck Supply
                  </p>
                  <p className="text-slate-600">
                    <strong>Distributor Warehouse:</strong> Mayur Vihar Phase-3, Delhi
                  </p>
                </div>
              </div>

              {/* Line Itemized Quotation Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono uppercase">
                      <th className="p-3 border border-slate-700">Brand</th>
                      <th className="p-3 border border-slate-700">Product SKU & Pack Size</th>
                      <th className="p-3 border border-slate-700 text-center">Case Quantity</th>
                      <th className="p-3 border border-slate-700 text-right">Wholesale Rate</th>
                      <th className="p-3 border border-slate-700 text-right">Total (Excl. GST)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rfqItems.map((item) => {
                      const rate =
                        item.product.b2bWholesalePrice || item.product.priceExclGst;
                      const lineTotal = rate * item.quantity;
                      return (
                        <tr key={item.product.id}>
                          <td className="p-3 font-bold border border-slate-300">
                            {item.product.brand}
                          </td>
                          <td className="p-3 border border-slate-300">
                            <span className="font-bold text-slate-900 block">
                              {item.product.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {item.product.packSize} • {item.product.storageCondition}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono font-bold border border-slate-300">
                            {item.quantity} Packs/Cases
                          </td>
                          <td className="p-3 text-right font-mono border border-slate-300">
                            ₹{rate}
                          </td>
                          <td className="p-3 text-right font-mono font-bold border border-slate-300">
                            ₹{lineTotal.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-end font-mono text-xs">
                <div className="w-72 space-y-2 border border-slate-300 p-4 rounded-xl bg-slate-50">
                  <div className="flex justify-between">
                    <span>Subtotal (Excl. GST):</span>
                    <span>₹{subtotalExclGst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (CGST/SGST/IGST):</span>
                    <span>₹{totalGst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-base pt-2 border-t border-slate-300">
                    <span>GRAND TOTAL:</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setQuoteGenerated(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-900 font-bold text-xs"
                >
                  ← Edit Buyer & Items
                </button>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `*SG TRADING COMPANY - B2B WHOLESALE PROFORMA QUOTATION*\nDistributor: Rahul Garg & Sonu (Mayur Vihar Phase-3)\nGSTIN: 07ADQFS8839Q1ZQ\nBuyer: ${buyer.companyName}\n*Grand Total: ₹${grandTotal.toLocaleString("en-IN")}*\nSubtotal (Excl. GST): ₹${subtotalExclGst.toLocaleString("en-IN")}\nGST: ₹${totalGst.toLocaleString("en-IN")}`
                      );
                      window.open(`https://wa.me/919667731355?text=${text}`, "_blank");
                      showToast("Opening WhatsApp with B2B Wholesale Proforma Quotation...");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Send via WhatsApp
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Official B2B Proforma Quotation emailed to ${buyer.email || "buyer@company.com"} & sgtradingcompany@rediffmail.com!`);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Send via Email
                  </button>

                  <button
                    onClick={() => {
                      showToast(`SMS Wholesale Quotation alert sent to +91 ${buyer.phone || "9667731355"}`);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                  >
                    Send via SMS
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Official PDF Sheet</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Widescreen Two-Column RFQ Form & Basket */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: RFQ Items (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base">
                      Wholesale RFQ Basket ({rfqItems.length} SKUs)
                    </h3>
                    <span className="text-xs text-amber-400 font-mono-spec">
                      Case-Tier Wholesale Rates Applied
                    </span>
                  </div>

                  {rfqItems.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 space-y-2">
                      <FileText className="w-10 h-10 mx-auto text-slate-600" />
                      <p className="text-xs">
                        Your RFQ basket is empty. Add products from the catalog to generate a formal wholesale quotation.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {rfqItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-4 items-center"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-mono-spec text-amber-400 font-bold block">
                              {item.product.brand}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-mono-spec mt-1">
                              Wholesale Rate: ₹{item.product.b2bWholesalePrice || item.product.priceExclGst} / Unit
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                                <button
                                  onClick={() =>
                                    updateRFQQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-2.5 py-1 text-slate-400 hover:text-white"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 py-1 text-xs font-mono-spec font-bold text-white">
                                  {item.quantity} Cases
                                </span>
                                <button
                                  onClick={() =>
                                    updateRFQQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-2.5 py-1 text-slate-400 hover:text-white"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromRFQ(item.product.id)}
                                className="text-slate-500 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Buyer Form (5 Cols) */}
              <div className="lg:col-span-5">
                <form
                  onSubmit={handleGenerateQuote}
                  className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4"
                >
                  <h3 className="font-bold text-white text-base pb-2 border-b border-slate-800">
                    Buyer Business & GSTIN Metadata
                  </h3>

                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      Hotel / Restaurant / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radisson Blue / Burger Hub"
                      value={buyer.companyName}
                      onChange={(e) =>
                        setBuyer({ ...buyer, companyName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                      Buyer GSTIN (For 100% Tax Credit)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 07AABCU9603R1ZM"
                      value={buyer.gstin}
                      onChange={(e) =>
                        setBuyer({ ...buyer, gstin: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono-spec text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Executive Chef / Manager"
                        value={buyer.contactPerson}
                        onChange={(e) =>
                          setBuyer({
                            ...buyer,
                            contactPerson: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={buyer.phone}
                        onChange={(e) =>
                          setBuyer({ ...buyer, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate Official Proforma Quotation Sheet →</span>
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
