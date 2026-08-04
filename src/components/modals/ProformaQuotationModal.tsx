"use client";

import React from "react";
import { RFQItem } from "@/types/equipment";
import { X, Printer, FileText } from "lucide-react";

export interface QuotationBuyerDetails {
  companyName: string;
  gstin: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  pincode: string;
  projectTimeline: string;
}

interface ProformaQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RFQItem[];
  buyer: QuotationBuyerDetails;
}

export const ProformaQuotationModal: React.FC<ProformaQuotationModalProps> = ({
  isOpen,
  onClose,
  items,
  buyer,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalExclGst = items.reduce(
    (acc, item) =>
      acc + item.product.b2bWholesalePrice * item.quantity,
    0
  );
  const gstAmount = Math.round((totalExclGst * 12) / 100);
  const totalInclGst = totalExclGst + gstAmount;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-300 print:shadow-none print:border-0 print:my-0">
        {/* Top Control Bar (Non-Printable) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">
              Official SG Trading Company Wholesale Commercial Proforma Quotation
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Quotation Sheet (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Commercial Sheet */}
        <div className="p-8 md:p-12 space-y-8">
          {/* Corporate Header */}
          <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded bg-slate-900 text-amber-400 font-extrabold flex items-center justify-center text-lg">
                  SG
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  SG TRADING COMPANY
                </h1>
              </div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">
                AUTHORIZED DISTRIBUTOR — HORECA & GENERAL TRADE (GT) FOOD SERVICES
              </p>
              <p className="text-xs text-slate-600 mt-1">
                <strong>GSTIN:</strong> <span className="font-mono font-bold text-slate-900">07ADQFS8839Q1ZQ</span> • <strong>FSSAI LIC. NO:</strong> <span className="font-mono font-bold text-slate-800">[ADD YOUR FSSAI NO.]</span>
                <br />
                B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
                <br />
                <strong>Contact Persons:</strong> Rahul Garg & Sonu • <strong>Phone:</strong> 9667731355, 9643097002
                <br />
                <strong>Email:</strong> sgtradingcompany@rediffmail.com
              </p>
            </div>

            <div className="text-right border-l-2 border-slate-200 pl-6">
              <span className="inline-block px-3 py-1 bg-slate-900 text-amber-400 text-xs font-bold uppercase tracking-wider rounded">
                WHOLESALE PROFORMA QUOTATION
              </span>
              <p className="text-xs font-mono font-bold text-slate-700 mt-2">
                QUOTE NO: <span className="text-slate-900">SG-DIST-2026-441</span>
              </p>
              <p className="text-xs font-mono text-slate-600">
                DATE: {new Date().toLocaleDateString("en-IN")}
              </p>
              <p className="text-xs font-mono text-slate-600">
                VALIDITY: 15 Calendar Days
              </p>
            </div>
          </div>

          {/* Client Buyer Metadata */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                QUOTATION ISSUED TO (BUYER):
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">
                {buyer.companyName || "HORECA Establishment / General Trade Partner"}
              </h4>
              <p className="text-slate-700 font-mono mt-1">
                <strong>BUYER GSTIN:</strong> {buyer.gstin || "NOT PROVIDED"}
              </p>
              <p className="text-slate-600">
                <strong>Contact Officer:</strong> {buyer.contactPerson || "Procurement Manager"}{" "}
                ({buyer.phone || "+91 Contact"})
              </p>
            </div>

            <div className="text-right">
              <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                LOGISTICS & DELIVERY TERMS:
              </span>
              <p className="text-slate-700 mt-1">
                <strong>Delivery Destination:</strong> {buyer.city || "Delhi NCR"}{" "}
                {buyer.pincode ? `(${buyer.pincode})` : ""}
              </p>
              <p className="text-slate-600">
                <strong>Cold Chain Fleet:</strong> Dedicated -18°C / Chilled Truck Supply
              </p>
              <p className="text-slate-600">
                <strong>Distributor Warehouse:</strong> Mayur Vihar Phase-3, Delhi
              </p>
            </div>
          </div>

          {/* Quotation Itemized Line-Item Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-300 text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase">
                  <th className="p-2.5 border border-slate-700 w-10">S.No</th>
                  <th className="p-2.5 border border-slate-700 w-32">Authorized Brand</th>
                  <th className="p-2.5 border border-slate-700">
                    Product Description, Institutional Pack & Storage
                  </th>
                  <th className="p-2.5 border border-slate-700 w-16 text-center">
                    Qty
                  </th>
                  <th className="p-2.5 border border-slate-700 text-right w-28">
                    B2B Case Rate
                  </th>
                  <th className="p-2.5 border border-slate-700 text-right w-32">
                    Total (Excl. GST)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {items.map((item, index) => {
                  const lineTotal =
                    item.product.b2bWholesalePrice * item.quantity;
                  return (
                    <tr key={item.product.id} className="align-top">
                      <td className="p-2.5 border border-slate-300 font-mono font-bold">
                        {index + 1}
                      </td>
                      <td className="p-2.5 border border-slate-300 font-mono font-bold text-amber-700">
                        {item.product.brand}
                      </td>
                      <td className="p-2.5 border border-slate-300 space-y-1">
                        <h5 className="font-bold text-slate-900">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-slate-600 font-mono">
                          Pack: {item.product.packSize} • Storage: {item.product.storageCondition} • MOQ: {item.product.caseMoq}
                        </p>
                      </td>
                      <td className="p-2.5 border border-slate-300 font-mono font-bold text-center">
                        {item.quantity} Units
                      </td>
                      <td className="p-2.5 border border-slate-300 font-mono text-right font-semibold">
                        ₹{item.product.b2bWholesalePrice}
                      </td>
                      <td className="p-2.5 border border-slate-300 font-mono text-right font-bold text-slate-900">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quotation Financial Summary Table */}
          <div className="flex flex-wrap justify-between items-start gap-8 pt-2">
            <div className="max-w-md text-xs text-slate-600 space-y-1.5">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                DISTRIBUTION & BILLING TERMS:
              </h5>
              <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                <li>
                  Prices quoted are special <strong>B2B Authorized Distributor Rates</strong> by SG Trading Company.
                </li>
                <li>
                  GST is applicable as per Govt. of India food & dairy tax slabs.
                </li>
                <li>
                  Dedicated -18°C frozen cold chain delivery available for Delhi NCR clients.
                </li>
                <li>
                  For urgent orders contact Rahul Garg (9667731355) or Sonu (9643097002).
                </li>
              </ol>
            </div>

            <div className="w-72 border border-slate-300 rounded-lg p-4 bg-slate-50 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-700">
                <span>Wholesale Subtotal:</span>
                <span>₹{totalExclGst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Estimated GST Slabs:</span>
                <span>₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t-2 border-slate-300">
                <span>GRAND TOTAL:</span>
                <span>₹{totalInclGst.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Official Signature Seal Block */}
          <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs">
            <div className="text-slate-500">
              SG TRADING COMPANY • B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096
              <br />
              Digital Verification Code: SG-AUTH-9667731355
            </div>

            <div className="text-right">
              <div className="w-44 h-12 border-b border-slate-400 mb-2 ml-auto" />
              <p className="font-bold text-slate-900">
                For SG TRADING COMPANY
              </p>
              <p className="text-slate-600 text-[11px]">
                Rahul Garg & Sonu (Authorized Distributor)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
