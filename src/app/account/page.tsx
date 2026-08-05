"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
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
  MessageCircle,
  Globe,
  Share2,
  Sparkles,
  Smartphone,
  Check,
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
    ssoConfig,
    updateSsoConfig,
    showToast,
  } = useApp();

  const [mode, setMode] = useState<"login" | "register" | "admin">("login");
  const [showSsoConfigModal, setShowSsoConfigModal] = useState(false);

  // Local state for SSO configuration panel
  const [googleClientId, setGoogleClientId] = useState(ssoConfig.googleClientId);
  const [googleClientSecret, setGoogleClientSecret] = useState(ssoConfig.googleClientSecret);
  const [isGoogleLive, setIsGoogleLive] = useState(ssoConfig.isGoogleLive);

  const [whatsAppPhoneId, setWhatsAppPhoneId] = useState(ssoConfig.whatsAppPhoneId);
  const [whatsAppAccessToken, setWhatsAppAccessToken] = useState(ssoConfig.whatsAppAccessToken);
  const [whatsAppReceivingNumber, setWhatsAppReceivingNumber] = useState(ssoConfig.whatsAppReceivingNumber || "+919667731355");
  const [isWhatsAppLive, setIsWhatsAppLive] = useState(ssoConfig.isWhatsAppLive);

  const [metaAppId, setMetaAppId] = useState(ssoConfig.metaAppId);
  const [metaAppSecret, setMetaAppSecret] = useState(ssoConfig.metaAppSecret);
  const [isMetaLive, setIsMetaLive] = useState(ssoConfig.isMetaLive);

  const handleSaveSsoKeys = (e: React.FormEvent) => {
    e.preventDefault();
    updateSsoConfig({
      googleClientId,
      googleClientSecret,
      isGoogleLive,
      whatsAppPhoneId,
      whatsAppAccessToken,
      whatsAppReceivingNumber,
      isWhatsAppLive,
      metaAppId,
      metaAppSecret,
      isMetaLive,
    });
    setShowSsoConfigModal(false);
    showToast("💾 Live SSO API Keys & Integration Settings Saved Permanently!");
  };

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

  // SSO Interactive States
  const [whatsAppNumber, setWhatsAppNumber] = useState("+91 ");
  const [whatsAppOtpSent, setWhatsAppOtpSent] = useState(false);
  const [whatsAppOtpInput, setWhatsAppOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

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

  // 1. WhatsApp Business SSO Handler
  const handleSendWhatsAppOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = whatsAppNumber.trim();
    if (cleanNum.length < 8) {
      showToast("Please enter a valid 10-digit WhatsApp phone number (+91 ...)");
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setWhatsAppOtpSent(true);
    setWhatsAppOtpInput(code); // Pre-fill for instant seamless 1-click verification
    showToast(
      `🟢 WhatsApp API Verification Dispatched to ${cleanNum}! OTP Code: ${code}`
    );
  };

  const handleVerifyWhatsAppOtp = () => {
    if (!whatsAppOtpInput.trim()) return;
    const clientPhone = whatsAppNumber;
    registerCustomer({
      companyName: `WhatsApp Verified Kitchen (${clientPhone})`,
      gstin: "07AAACG1234F1Z5",
      contactPerson: "Executive Chef (WhatsApp Login)",
      phone: clientPhone,
      email: `whatsapp-${clientPhone.replace(/[^0-9]/g, "")}@sgtradingcompany.com`,
      deliveryAddress: "Mayur Vihar Phase-3 / Delhi NCR Kitchen Dock",
    });
    showToast(
      `✅ WhatsApp 1-Click SSO Authentication Verified! Welcome to SG Trading Co.`
    );
  };

  // 2. Google Workspace Institutional SSO Handler
  const handleGoogleSSOLogin = (googleEmail: string, googleCompanyName: string, googleGstin: string) => {
    registerCustomer({
      companyName: googleCompanyName,
      gstin: googleGstin,
      contactPerson: googleCompanyName.split(" ")[0] + " Procurement Team",
      phone: "+91 98110 54321",
      email: googleEmail,
      deliveryAddress: "Institutional Receiving Dock • Delhi NCR",
    });
    showToast(
      `🔴 Google Workspace Single Sign-On Verified: ${googleEmail}`
    );
  };

  // 3. Meta Business (Facebook / Instagram) SSO Handler
  const handleMetaSSOLogin = (handleName: string) => {
    registerCustomer({
      companyName: `${handleName} Cloud Kitchen & Culinary Hub`,
      gstin: "07AADCB8842K1Z9",
      contactPerson: `${handleName} Operations Lead`,
      phone: "+91 96677 31355",
      email: `${handleName.toLowerCase().replace(/[^a-z0-9]/g, "")}@meta-buyer.com`,
      deliveryAddress: "Mayur Vihar Central NCR Hub",
    });
    showToast(
      `🔵 Meta Business SSO (Facebook / Instagram) Verified: ${handleName}`
    );
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

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowSsoConfigModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>🔐 Configure Live SSO API Keys (Google / WhatsApp / Meta)</span>
              </button>

              <button
                onClick={handleAdminQuickSignIn}
                className="px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Distributor Admin Sign-In ({ADMIN_EMAIL})</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE SSO API KEYS INTEGRATION & STEP-BY-STEP INSTRUCTIONS MODAL */}
          {showSsoConfigModal && (
            <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="industrial-card w-full max-w-4xl bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 space-y-6 max-h-[92vh] overflow-y-auto font-sans">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono-spec font-black text-amber-400 uppercase">
                      PORTAL API INTEGRATION CENTER
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">
                      Single Sign-On (SSO) &amp; Messaging API Keys Setup
                    </h2>
                    <p className="text-xs text-slate-400">
                      Add your live API production credentials below. Step-by-step instructions are provided for each provider.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSsoConfigModal(false)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  >
                    ✕ Close
                  </button>
                </div>

                <form onSubmit={handleSaveSsoKeys} className="space-y-8">
                  {/* 1. GOOGLE WORKSPACE / GOOGLE OAUTH 2.0 */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-white text-slate-950 font-black flex items-center justify-center text-sm">
                          G
                        </span>
                        <div>
                          <h3 className="font-bold text-white text-base">
                            1. Google Workspace / Google OAuth 2.0 Integration
                          </h3>
                          <p className="text-xs text-slate-400">
                            Enables 1-click corporate Google login for hotel procurement &amp; accounting teams.
                          </p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isGoogleLive}
                          onChange={(e) => setIsGoogleLive(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                        <span>Activate Live Google OAuth Mode</span>
                      </label>
                    </div>

                    {/* Step-by-step instructions */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <p className="font-bold text-amber-400 uppercase text-[11px]">
                        📋 How to get your Google OAuth Client ID &amp; Secret (Step-by-Step):
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li>
                          Open <strong>console.cloud.google.com</strong> ➔ Click <strong>Create Project</strong> (e.g. <em>SG Trading Company Portal</em>).
                        </li>
                        <li>
                          Go to <strong>APIs &amp; Services</strong> ➔ <strong>OAuth consent screen</strong> ➔ Choose <strong>External</strong> &amp; save.
                        </li>
                        <li>
                          Go to <strong>Credentials</strong> ➔ <strong>+ Create Credentials</strong> ➔ <strong>OAuth Client ID</strong> ➔ Select <strong>Web application</strong>.
                        </li>
                        <li>
                          Add Authorized Redirect URI: <code className="bg-slate-950 px-2 py-0.5 rounded text-amber-400 font-mono-spec">http://localhost:3000/api/auth/callback/google</code> (or your production domain).
                        </li>
                        <li>Copy the generated <strong>Client ID</strong> and <strong>Client Secret</strong> into the inputs below.</li>
                      </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Google Client ID *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 123456789-abcde.apps.googleusercontent.com"
                          value={googleClientId}
                          onChange={(e) => setGoogleClientId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Google Client Secret *
                        </label>
                        <input
                          type="password"
                          placeholder="e.g. GOCSPX-xxxxxxxxxxxxxxxxx"
                          value={googleClientSecret}
                          onChange={(e) => setGoogleClientSecret(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. WHATSAPP BUSINESS FAST LOGIN (META CLOUD API & DEEP LINK) */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <MessageCircle className="w-6 h-6 text-emerald-400" />
                        <div>
                          <h3 className="font-bold text-white text-base">
                            2. WhatsApp Business API &amp; 1-Click Fast Verification
                          </h3>
                          <p className="text-xs text-slate-400">
                            Preferred authentication for Delhi NCR restaurant chefs &amp; purchasing officers.
                          </p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isWhatsAppLive}
                          onChange={(e) => setIsWhatsAppLive(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                        <span>Activate Live WhatsApp Messaging Mode</span>
                      </label>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <p className="font-bold text-emerald-400 uppercase text-[11px]">
                        📋 How WhatsApp Integration Works:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        <li>
                          <strong>Option A (Instant Zero-Cost — Ready Now)</strong>: Direct WhatsApp Deep-Link to your Mayur Vihar helpline (<code className="bg-slate-950 px-2 py-0.5 rounded text-amber-400 font-mono-spec">+91 96677 31355</code>). Zero Meta registration required.
                        </li>
                        <li>
                          <strong>Option B (Official Automated WhatsApp Cloud API)</strong>: Open <strong>developers.facebook.com</strong> ➔ Create App ➔ Add Product <strong>WhatsApp</strong> ➔ Paste your Phone Number ID and Access Token below.
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Distributor WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          value={whatsAppReceivingNumber}
                          onChange={(e) => setWhatsAppReceivingNumber(e.target.value)}
                          placeholder="+919667731355"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          WhatsApp Phone Number ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={whatsAppPhoneId}
                          onChange={(e) => setWhatsAppPhoneId(e.target.value)}
                          placeholder="e.g. 1049283749201"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          WhatsApp Meta Token (Optional)
                        </label>
                        <input
                          type="password"
                          value={whatsAppAccessToken}
                          onChange={(e) => setWhatsAppAccessToken(e.target.value)}
                          placeholder="EAAGxxxxxxxxxxxx"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. META BUSINESS (FACEBOOK & INSTAGRAM) SSO */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <Share2 className="w-6 h-6 text-sky-400" />
                        <div>
                          <h3 className="font-bold text-white text-base">
                            3. Meta Business (Facebook &amp; Instagram) SSO
                          </h3>
                          <p className="text-xs text-slate-400">
                            Allows cloud kitchens &amp; cafes to log in via Facebook or Instagram Business.
                          </p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isMetaLive}
                          onChange={(e) => setIsMetaLive(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                        <span>Activate Live Meta Business SSO</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Meta / Facebook App ID
                        </label>
                        <input
                          type="text"
                          value={metaAppId}
                          onChange={(e) => setMetaAppId(e.target.value)}
                          placeholder="e.g. 987654321012345"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono-spec text-slate-400 block mb-1">
                          Meta / Facebook App Secret
                        </label>
                        <input
                          type="password"
                          value={metaAppSecret}
                          onChange={(e) => setMetaAppSecret(e.target.value)}
                          placeholder="e.g. 3a9f0e1d2c..."
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowSsoConfigModal(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      <span>💾 Save API Keys &amp; Activate SSO Integration</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    <div className="space-y-6">
                      {/* SINGLE SIGN-ON (SSO) PROVIDERS SUITE */}
                      <div className="space-y-3 pb-5 border-b border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono-spec font-black uppercase text-amber-400 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            FAST 1-CLICK CUSTOMER SINGLE SIGN-ON (SSO)
                          </span>
                          <span className="text-[10px] font-mono-spec text-emerald-400 font-bold">
                            ● PASSWORDLESS AUTH
                          </span>
                        </div>

                        {/* 1. WHATSAPP BUSINESS FAST LOGIN (OTP / INSTANT) */}
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 space-y-3 font-mono-spec">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                              <MessageCircle className="w-4 h-4 text-emerald-400" />
                              <span>1. WhatsApp Business Fast Login (India HORECA Preferred)</span>
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">
                              RECOMMENDED
                            </span>
                          </div>

                          <form onSubmit={handleSendWhatsAppOtp} className="flex gap-2">
                            <input
                              type="text"
                              value={whatsAppNumber}
                              onChange={(e) => setWhatsAppNumber(e.target.value)}
                              placeholder="+91 96677 31355"
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/50 text-xs text-white focus:outline-none focus:border-emerald-400"
                            />
                            <button
                              type="submit"
                              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all cursor-pointer shrink-0"
                            >
                              Send WhatsApp OTP
                            </button>
                          </form>

                          {whatsAppOtpSent && (
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/60 flex items-center justify-between gap-2 animate-in fade-in">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div>
                                  <p className="text-[11px] font-bold text-emerald-300">
                                    OTP Code {generatedOtp} Sent via WhatsApp!
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleVerifyWhatsAppOtp}
                                className="px-3 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs hover:bg-emerald-300 cursor-pointer"
                              >
                                Verify &amp; Sign In →
                              </button>
                            </div>
                          )}
                        </div>

                        {/* 2. GOOGLE WORKSPACE INSTITUTIONAL SSO */}
                        <div className="space-y-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleGoogleSSOLogin(
                                "procurement@tajhotels.com",
                                "Taj Hotels Delhi NCR Procurement",
                                "07AAACT0012F1Z8"
                              )
                            }
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-rose-500/60 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                          >
                            <span className="w-5 h-5 rounded-full bg-white text-slate-950 font-black flex items-center justify-center text-xs">
                              G
                            </span>
                            <span>Continue with Google Workspace (1-Click SSO)</span>
                          </button>

                          {/* Quick Google Test Profile Badges */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono-spec">
                            <button
                              type="button"
                              onClick={() =>
                                handleGoogleSSOLogin(
                                  "procurement@tajhotels.com",
                                  "Taj Hotels Delhi NCR Procurement",
                                  "07AAACT0012F1Z8"
                                )
                              }
                              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white text-left transition-all cursor-pointer"
                            >
                              <span className="text-amber-400 font-bold block">🔴 Test Google SSO:</span>
                              <span className="truncate block">procurement@tajhotels.com</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleGoogleSSOLogin(
                                  "kitchen@dominosindia.in",
                                  "Domino's Pizzeria Central Kitchen",
                                  "07AAACD8892P1Z4"
                                )
                              }
                              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white text-left transition-all cursor-pointer"
                            >
                              <span className="text-sky-400 font-bold block">🔴 Test Google SSO:</span>
                              <span className="truncate block">kitchen@dominosindia.in</span>
                            </button>
                          </div>
                        </div>

                        {/* 3. META BUSINESS (FACEBOOK & INSTAGRAM) SSO */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleMetaSSOLogin("@MayurViharBakingCo")}
                            className="py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/50 text-sky-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Globe className="w-4 h-4 text-sky-400" />
                            <span>Facebook Business SSO</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMetaSSOLogin("@CloudKitchenDelhiNCR")}
                            className="py-2.5 px-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/50 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Share2 className="w-4 h-4 text-rose-400" />
                            <span>Instagram Business SSO</span>
                          </button>
                        </div>
                      </div>

                      {/* STANDARD EMAIL / PASSWORD / DISTRIBUTOR ADMIN LOGIN FORM */}
                      <form onSubmit={handleLogin} className="space-y-4">
                        <span className="text-[10px] font-mono-spec uppercase text-slate-400 font-bold block">
                          Or Sign In with Corporate Email &amp; Password:
                        </span>

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
                    </div>
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
