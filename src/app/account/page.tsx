"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { DistributionConciergeChatbot } from "@/components/chat/DistributionConciergeChatbot";
import {
  User,
  Building2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Boxes,
  FileText,
  KeyRound,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const {
    currentUser,
    isGuestCheckout,
    setIsGuestCheckout,
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    showToast,
  } = useApp();

  const [mode, setMode] = useState<"login" | "register" | "admin">("login");

  // Registration form state
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Admin login email
  const ADMIN_EMAIL = "sgtradingcompany@rediffmail.com";

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerCustomer({
      companyName,
      gstin,
      contactPerson,
      phone,
      email,
      deliveryAddress,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === ADMIN_EMAIL) {
      showToast(
        `Distributor Admin Sign-In Verified! Connected to ${ADMIN_EMAIL} (Rahul Garg & Sonu)`
      );
      loginCustomer(ADMIN_EMAIL);
      return;
    }
    loginCustomer(loginEmail);
  };

  const handleAdminQuickSignIn = () => {
    setLoginEmail(ADMIN_EMAIL);
    setMode("login");
    showToast(
      `Pre-filled Distributor Admin Email: ${ADMIN_EMAIL}. Click Sign In to access Rahul Garg & Sonu Desk.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <StickyHeader />

      <main className="flex-1 py-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
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
                Customer Account & Guest Shopping Portal
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono-spec">
                Shop as a Guest • Create Commercial Account • Official Admin Email:{" "}
                <span className="text-amber-400 font-bold">{ADMIN_EMAIL}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAdminQuickSignIn}
                className="px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Distributor Admin Sign-In ({ADMIN_EMAIL})</span>
              </button>
            </div>
          </div>

          {currentUser ? (
            /* Logged-In Account Dashboard */
            <div className="industrial-card rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center font-black text-2xl">
                    {currentUser.companyName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-mono-spec text-amber-400 font-bold uppercase">
                      {currentUser.email === ADMIN_EMAIL
                        ? "AUTHORIZED DISTRIBUTOR ADMIN ACCOUNT"
                        : "REGISTERED HORECA / GT COMMERCIAL BUYER"}
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">
                      {currentUser.companyName}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono-spec">
                      GSTIN: <strong>{currentUser.gstin}</strong> • Phone:{" "}
                      <strong>{currentUser.phone}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={logoutCustomer}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-400 text-xs font-bold"
                >
                  Sign Out to Guest Shopping Mode
                </button>
              </div>

              {/* Admin vs Customer Action Shortcuts */}
              {currentUser.email === ADMIN_EMAIL ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-amber-400 text-base flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      DISTRIBUTOR ADMIN DESK — RAHUL GARG & SONU
                    </h3>
                    <span className="text-xs font-mono-spec text-slate-300">
                      Notifications copied to: {ADMIN_EMAIL}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    You are signed in under official distributor email{" "}
                    <strong>{ADMIN_EMAIL}</strong>. You have full oversight of running warehouse inventory, PO notifications, tax invoices, and multi-channel payment reconciliation.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href="/stock-manager"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Boxes className="w-4 h-4" />
                      <span>Mayur Vihar Phase-3 Stock Manager →</span>
                    </Link>
                    <Link
                      href="/order-to-cash"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Order-to-Cash (O2C) Enterprise Desk →</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-spec">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 uppercase block text-[10px]">
                      Saved Business GSTIN:
                    </span>
                    <p className="text-amber-400 font-bold text-sm">
                      {currentUser.gstin}
                    </p>
                    <p className="text-slate-400">
                      Automatically pre-filled on every GST Tax Invoice for 100% credit!
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 uppercase block text-[10px]">
                      Default Delivery Destination:
                    </span>
                    <p className="text-white font-bold">
                      {currentUser.deliveryAddress}
                    </p>
                    <p className="text-emerald-400">
                      Cold-Chain Fleet: -18°C Refrigerated Delivery
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Shopping vs Customer Account vs Admin Login */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Guest Shopping Mode Explanation (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="industrial-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-spec text-emerald-400 font-bold uppercase block">
                        DEFAULT SHOPPING MODE
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        Guest Shopping Mode Enabled
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    You can browse all 12 authorized HORECA & General Trade FMCG brands, inspect running warehouse stock, and check out immediately as a <strong>Guest Commercial Buyer</strong> without creating an account!
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono-spec">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Zero Registration Required for Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Instant PO & Digital GST Invoice Generation</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Admin Email ({ADMIN_EMAIL}) receives instant order copy</span>
                    </div>
                  </div>

                  <Link
                    href="/#catalog"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start Guest Shopping in Catalog →</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Account Sign-In / Register / Admin Form (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="industrial-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6">
                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 gap-3 pb-4 border-b border-slate-800">
                    <button
                      onClick={() => setMode("login")}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        mode === "login"
                          ? "bg-amber-500/15 border-amber-500 text-amber-400"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      Sign In (Customer / Admin)
                    </button>
                    <button
                      onClick={() => setMode("register")}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        mode === "register"
                          ? "bg-amber-500/15 border-amber-500 text-amber-400"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      Create Commercial Account
                    </button>
                  </div>

                  {mode === "login" ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Email Address * (Use {ADMIN_EMAIL} for Distributor Admin)
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="purchase@restaurant.com or sgtradingcompany@rediffmail.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Password *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Sign In to Account / Admin Desk →</span>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Hotel / Restaurant / Supermarket Establishment Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Radisson Blu / Burger Hub"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                            Establishment GSTIN (For 100% Tax Credit)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 07AAACR3841C1Z5"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono-spec text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Email Address * (Copies sent to Admin Email: {ADMIN_EMAIL})
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="purchase@establishment.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Delivery Address in Delhi NCR *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Kitchen Address, Mayur Vihar / Noida / Connaught Place"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Register Account & Pre-Fill GSTIN →</span>
                      </button>
                    </form>
                  )}
                </div>
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
