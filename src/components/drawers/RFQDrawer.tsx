"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  FileText,
  Trash2,
  Plus,
  Minus,
  Building2,
  Printer,
  Sparkles,
} from "lucide-react";
import {
  ProformaQuotationModal,
  QuotationBuyerDetails,
} from "@/components/modals/ProformaQuotationModal";

export const RFQDrawer: React.FC = () => {
  const {
    rfqItems,
    isRFQOpen,
    setIsRFQOpen,
    removeFromRFQ,
    updateRFQQuantity,
    clearRFQ,
    showToast,
  } = useApp();

  const [buyerDetails, setBuyerDetails] = useState<QuotationBuyerDetails>({
    companyName: "",
    gstin: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "New Delhi NCR",
    pincode: "",
    projectTimeline: "Immediate Commercial Case Delivery",
  });

  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  if (!isRFQOpen) return null;

  const totalWholesaleExclGst = rfqItems.reduce(
    (acc, item) =>
      acc + item.product.b2bWholesalePrice * item.quantity,
    0
  );

  const handleGenerateOfficialQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (rfqItems.length === 0) {
      showToast("Please add at least 1 product SKU to your RFQ Basket.");
      return;
    }
    setIsQuotationModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
        <div className="industrial-card w-full max-w-xl h-full bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  B2B Wholesale RFQ Workspace
                </h3>
                <p className="text-xs text-slate-400 font-mono-spec">
                  SG Trading Company Case Supply Manifest ({rfqItems.length} SKUs)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsRFQOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {rfqItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                Your B2B Wholesale RFQ Basket is currently empty.
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                Add HORECA institutional packs or General Trade FMCG cartons to request wholesale proforma pricing from Rahul Garg & Sonu.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleGenerateOfficialQuote}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* RFQ Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Authorized Distributor Advantage:</strong> All case orders qualify for direct SG Trading Company wholesale rates with cold-chain delivery.
                  </span>
                </div>

                {rfqItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex gap-3.5 items-start"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono-spec text-amber-400 font-bold">
                          {item.product.brand}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono-spec">
                          Wholesale: ₹{item.product.b2bWholesalePrice} / Unit
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white truncate mt-0.5">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] font-mono-spec text-slate-400">
                        Pack: {item.product.packSize} • {item.product.storageCondition}
                      </p>

                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                          <button
                            type="button"
                            onClick={() =>
                              updateRFQQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-1 text-xs font-mono-spec font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateRFQQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromRFQ(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Commercial Buyer Details Input Form */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>HORECA / Retail Partner Organization Details</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Business / Hotel / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radisson Blu / Kirana Supermarket"
                        value={buyerDetails.companyName}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Company GSTIN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="07AABCS1429B1Z1"
                        value={buyerDetails.gstin}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            gstin: e.target.value.toUpperCase(),
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono-spec text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Procurement Person Name"
                        value={buyerDetails.contactPerson}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            contactPerson: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 96677 XXXXX"
                        value={buyerDetails.phone}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Delivery Area / Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mayur Vihar / Okhla / 110096"
                        value={buyerDetails.city}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                        Delivery Schedule
                      </label>
                      <select
                        value={buyerDetails.projectTimeline}
                        onChange={(e) =>
                          setBuyerDetails({
                            ...buyerDetails,
                            projectTimeline: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Immediate Commercial Supply">
                          Immediate Supply (Daily Cold Chain)
                        </option>
                        <option value="Weekly HORECA Contract">
                          Weekly HORECA Contract
                        </option>
                        <option value="Monthly Bulk Master Case Supply">
                          Monthly Bulk Master Case Supply
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Generate Quotation Footer */}
              <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono-spec">
                  <span className="text-slate-400">
                    Estimated Wholesale Subtotal (Excl. GST)
                  </span>
                  <span className="text-base font-extrabold text-amber-400">
                    ₹{totalWholesaleExclGst.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>
                    Generate Official SG Trading Co. Commercial Quotation Sheet (PDF/Print) →
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Proforma Quotation Printable Sheet Modal */}
      <ProformaQuotationModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        items={rfqItems}
        buyer={buyerDetails}
      />
    </>
  );
};
