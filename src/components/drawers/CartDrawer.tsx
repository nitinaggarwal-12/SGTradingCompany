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

  if (!isCartOpen) return null;

  const subtotalExclGst = cart.reduce(
    (acc, item) => acc + item.product.priceExclGst * item.quantity,
    0
  );

  const gstAmount = Math.round((subtotalExclGst * 12) / 100);
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
                        <span>CGST</span>
                        <span>₹{cgstAmount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>SGST</span>
                        <span>₹{sgstAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-slate-400">
                      <span>IGST</span>
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
