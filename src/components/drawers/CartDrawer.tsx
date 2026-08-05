"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Lock,
} from "lucide-react";
import { PaymentGatewayModal } from "@/components/payment/PaymentGatewayModal";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
  } = useApp();

  const [gstType, setGstType] = useState<"intrastate" | "interstate">("intrastate");
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);

  const handleDownloadTallyCsv = () => {
    const today = new Date().toISOString().split("T")[0];
    const csvRows = [
      [
        "Date",
        "VoucherType",
        "VoucherNo",
        "SupplierName",
        "SupplierGSTIN",
        "ItemName",
        "Category",
        "Quantity",
        "RateExclGST",
        "CGST_Amount",
        "SGST_Amount",
        "TotalAmount",
      ],
    ];

    cart.forEach((item, idx) => {
      const itemSubtotal = item.product.priceExclGst * item.quantity;
      const cgst = Math.round((itemSubtotal * 2.5) / 100);
      const sgst = Math.round((itemSubtotal * 2.5) / 100);
      const total = itemSubtotal + cgst + sgst;

      csvRows.push([
        today,
        "Purchase Voucher",
        `PUR-SG-2026-${String(idx + 1).padStart(3, "0")}`,
        "SG Trading Company (Mayur Vihar Phase-3)",
        "07ADQFS8839Q1ZQ",
        `"${item.product.name}"`,
        `"${item.product.category}"`,
        String(item.quantity),
        String(item.product.priceExclGst),
        String(cgst),
        String(sgst),
        String(total),
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((r) => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `SG_Trading_Tally_Purchase_Voucher_${today}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintGstProforma = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const itemsHtml = cart
      .map(
        (item, index) => `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px; font-size: 12px; font-weight: bold;">${index + 1}</td>
        <td style="padding: 10px;">
          <div style="font-size: 13px; font-weight: 800; color: #0F172A;">${item.product.name}</div>
          <div style="font-size: 11px; color: #64748B;">Brand: ${item.product.brand} • Authorized Case</div>
        </td>
        <td style="padding: 10px; font-size: 12px; text-align: center; font-weight: bold;">${item.quantity} Cases</td>
        <td style="padding: 10px; font-size: 12px; text-align: right;">₹${item.product.priceExclGst.toLocaleString("en-IN")}</td>
        <td style="padding: 10px; font-size: 12px; text-align: right;">₹${(item.product.priceExclGst * item.quantity).toLocaleString("en-IN")}</td>
      </tr>
    `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Official GST Proforma Invoice - SG Trading Company</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0F172A; margin: 0; padding: 24px; background: #FFFFFF; }
          .header { border-bottom: 3px solid #D97706; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; }
          .title { font-size: 24px; font-weight: 900; color: #0F172A; }
          .badge { background: #FEF3C7; color: #92400E; padding: 4px 8px; font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { background: #F8FAFC; color: #475569; font-size: 11px; text-transform: uppercase; padding: 10px; text-align: left; border-bottom: 2px solid #E2E8F0; }
          .totals { margin-top: 24px; float: right; width: 320px; font-size: 13px; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .totals-grand { font-size: 16px; font-weight: 900; color: #D97706; border-top: 2px solid #0F172A; padding-top: 8px; }
          .footer { clear: both; margin-top: 60px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div className="no-print" style="margin-bottom: 20px;">
          <button onclick="window.print()" style="background: #D97706; color: #FFFFFF; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer;">
            🖨️ Print / Save Official GST Tax Proforma PDF
          </button>
        </div>

        <div class="header">
          <div>
            <div class="title">SG TRADING COMPANY</div>
            <div class="badge">OFFICIAL AUTHORIZED FACTORY DISTRIBUTOR • MAYUR VIHAR PHASE-3</div>
            <p style="font-size: 12px; margin: 6px 0 0 0; color: #475569;">
              Central Cold Room 1 Hub: B-377, Shiv Mandir Road, Mayur Vihar Phase-3, Delhi-110096<br/>
              GSTIN: <strong>07ADQFS8839Q1ZQ</strong> • FSSAI License: <strong>13324008000192</strong><br/>
              Wholesale Helpline: +91 96677 31355 / 9643097002
            </p>
          </div>
          <div style="text-align: right;">
            <h3 style="margin: 0; font-size: 18px; color: #D97706;">GST PROFORMA INVOICE</h3>
            <p style="font-size: 12px; color: #475569; margin: 4px 0 0 0;">
              Date: <strong>${today}</strong><br/>
              Invoice Ref: <strong>SG-PROFORMA-${Date.now().toString().slice(-6)}</strong><br/>
              Cold Room Status: <strong style="color: #059669;">-18.3°C READY</strong>
            </p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Commercial Product SKU &amp; Brand</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Rate / Case (Excl. GST)</th>
              <th style="text-align: right;">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Products Subtotal (Excl. GST):</span>
            <strong>₹${subtotalExclGst.toLocaleString("en-IN")}</strong>
          </div>
          <div class="totals-row">
            <span>CGST (2.5%) + SGST (2.5%):</span>
            <strong>₹${gstAmount.toLocaleString("en-IN")}</strong>
          </div>
          <div class="totals-row">
            <span>Cold-Chain Reefer Logistics:</span>
            <strong>₹${deliveryFreight}</strong>
          </div>
          <div class="totals-row totals-grand">
            <span>TOTAL AMOUNT PAYABLE:</span>
            <span>₹${totalInclGst.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div class="footer">
          <p><strong>Bank &amp; Payment Details for Instant Dispatch:</strong></p>
          <p>Bank: HDFC Bank Commercial • Account Name: SG Trading Company • A/C No: 50200088921102 • IFSC: HDFC0001402<br/>
          Paytm Merchant UPI ID: <strong>paytmqr69pf0i@ptys</strong> (WhatsApp Helpline: +91 96677 31355)</p>
          <p style="margin-top: 12px; font-size: 10px;">* Certified factory-sealed cargo. Full GST Input Tax Credit (ITC) compliant under CGST/SGST/IGST Act.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isCartOpen) return null;

  const subtotalExclGst = cart.reduce(
    (acc, item) => acc + item.product.priceExclGst * item.quantity,
    0
  );

  const gstAmount = Math.round((subtotalExclGst * 5) / 100);
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;
  const deliveryFreight = cart.length > 0 ? 350 : 0;
  const totalInclGst = subtotalExclGst + gstAmount + deliveryFreight;

  return (
    <>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
        <div className="industrial-card w-full max-w-lg h-full bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  SG Trading Co. Cart
                </h3>
                <p className="text-xs text-slate-400 font-mono-spec">
                  {cart.length} Product SKUs Added
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                Your Wholesale Cart is currently empty.
              </p>
              <p className="text-xs text-slate-400">
                Browse our authorized HORECA & GT product catalog to add packs or cases.
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono-spec text-amber-400 font-bold block">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-mono-spec text-slate-300 mt-1">
                        ₹{item.product.priceExclGst}{" "}
                        <span className="text-slate-500">(Excl. GST)</span>
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                          <button
                            onClick={() =>
                              updateCartQuantity(
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
                            onClick={() =>
                              updateCartQuantity(
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

              {/* GST Tax Invoice & Calculation Strip */}
              <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
                {/* Intra-state vs Inter-state GST selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-spec text-slate-400 block uppercase">
                    GST Billing Compliance Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setGstType("intrastate")}
                      className={`py-1.5 px-2 rounded text-xs font-semibold border ${
                        gstType === "intrastate"
                          ? "bg-amber-500/15 border-amber-500 text-amber-400"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      CGST + SGST (Delhi NCR)
                    </button>
                    <button
                      onClick={() => setGstType("interstate")}
                      className={`py-1.5 px-2 rounded text-xs font-semibold border ${
                        gstType === "interstate"
                          ? "bg-amber-500/15 border-amber-500 text-amber-400"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      IGST (Inter-State)
                    </button>
                  </div>
                </div>

                {/* Detailed Financial Calculation */}
                <div className="space-y-1.5 text-xs font-mono-spec border-t border-slate-800/80 pt-3">
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
                    <span>Cold Chain Delivery & Logistics</span>
                    <span>₹{deliveryFreight}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>TOTAL ORDER PAYABLE</span>
                    <span className="text-amber-400">
                      ₹{totalInclGst.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* INSTITUTIONAL B2B GST PROFORMA & TALLY CSV EXPORT ACTIONS */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handlePrintGstProforma}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono-spec font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                    title="Print or Save Official GST Tax Proforma PDF"
                  >
                    <span>📄 GST Proforma PDF</span>
                  </button>

                  <button
                    onClick={handleDownloadTallyCsv}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono-spec font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                    title="Download Purchase Voucher formatted for Tally Prime & Busy Accounting"
                  >
                    <span>📊 Tally Prime CSV</span>
                  </button>
                </div>

                {/* Proceed to Payment Gateway Button */}
                <button
                  onClick={() => setIsPaymentGatewayOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Online Payment Gateway (UPI / Card / NEFT)</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentGatewayOpen}
        onClose={() => setIsPaymentGatewayOpen(false)}
        amount={totalInclGst}
        gstAmount={gstAmount}
        orderSummaryText={`${cart.length} SKUs`}
      />
    </>
  );
};
