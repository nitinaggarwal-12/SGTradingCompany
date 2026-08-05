"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  PhoneCall,
  ShoppingCart,
  ShieldCheck,
  Award,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  actionType?: "CALL" | "CART" | "RFQS";
}

const INITIAL_SUGGESTED_QUESTIONS = [
  "McCain vs Iscon Balaji fries: Which should I choose for my kitchen?",
  "Why buy brand cheese instead of local unorganized dairy?",
  "Can I get a discount if I order 5+ master cases?",
  "What happens if frozen food defrosts during delivery?",
];

export const DistributionConciergeChatbot: React.FC = () => {
  const { addToCart, products, showToast } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Namaste & warm welcome to **SG Trading Company (Mayur Vihar Phase-3, Delhi)**! 🙏 I am your **Google AI Commercial Distribution Intelligence Assistant**.\n\nAsk me anything about:\n• **McCain vs. Iscon Balaji Fries** (Cook yields, crispness retention, cost/portion)\n• **Live -18°C Cold Room 1 Inventory** across all 16 Authorized SKUs\n• **Wholesale Carton Rate Cards & Volume Discounts** (5+ / 10+ master cases)\n• **GSTIN 07ADQFS8839Q1ZQ Tax Invoices** for 100% ITC claims",
      timestamp: "Just now",
      suggestedQuestions: INITIAL_SUGGESTED_QUESTIONS,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Helper to format bold markdown syntax safely
  const renderFormattedText = (rawText: string) => {
    return rawText.split("\n").map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-2 last:mb-0 leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="font-extrabold text-amber-500">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");

    // Simulate consultative empathetic response logic via Google AI Mode Engine
    setTimeout(() => {
      let responseText = "";
      let followUps: string[] = [];

      const query = textToSend.toLowerCase();

      // Check if user is asking about live stock / inventory
      if (
        query.includes("stock") ||
        query.includes("inventory") ||
        query.includes("available") ||
        query.includes("how many") ||
        query.includes("cases")
      ) {
        const friesProducts = products.filter(
          (p) =>
            p.name.toLowerCase().includes("frie") ||
            p.category.toLowerCase().includes("frozen")
        );

        const totalFryCases = friesProducts.reduce(
          (acc, p) => acc + (p.stockQuantity || 0),
          0
        );

        responseText = `**[Google AI Live Telemetry] — Mayur Vihar Phase-3 Warehouse Stock (-18°C Cold Room 1):**\n\n${friesProducts
          .map(
            (p) =>
              `• **${p.brand} — ${p.name}**: **${p.stockQuantity} Master Cases** in stock (₹${p.priceExclGst} / Pack)`
          )
          .join("\n")}\n\n**Total Deep-Frozen Ready Cases:** **${totalFryCases.toLocaleString(
          "en-IN"
        )} Cases** ready for same-day refrigerated dispatch across Delhi NCR.\n\nAll dispatch vehicles operate with digital GPS thermal loggers maintaining strictly -18.3°C.`;

        followUps = [
          "Load McCain & Iscon Balaji Fries into my Wholesale Cart",
          "Can I get a discount if I order 10+ master cases?",
          "How do I request an official GST Tax Proforma Invoice?",
        ];
      } else if (
        (query.includes("mccain") && query.includes("iscon")) ||
        query.includes("compare fries") ||
        query.includes("difference")
      ) {
        responseText =
          "**[Google AI Commercial Yield Analysis] — McCain vs. Iscon Balaji 9mm Fries:**\n\n1. **McCain 9mm French Fries (2.5 Kg - ₹380)**:\n   • **Crisp Hold Duration**: 25–30 minutes under QSR heat lamps.\n   • **Fry Yield**: High solid dry matter content means lower oil absorption.\n   • **Best For**: 4/5-Star Banquets, High-Volume Burgers & Dine-in.\n\n2. **Iscon Balaji 9mm Fries (2.5 Kg - ₹340)**:\n   • **Cost Saving**: ₹40 lower per pack (approx. ₹11.20 net profit boost per served basket).\n   • **Best For**: Cloud Kitchen delivery operations & high-throughput GT retail.\n\nBoth items are stocked in bulk at Mayur Vihar Phase-3 Central Cold Room 1!";
        followUps = [
          "What is the current stock of fries at your store?",
          "Can I get a combo case of McCain Fries + Britannia Cheese?",
          "How many portions can I serve from a 2.5 Kg McCain pack?",
        ];
      } else if (
        query.includes("mccain") ||
        query.includes("fries")
      ) {
        const fryItems = products.filter((p) =>
          p.name.toLowerCase().includes("frie")
        );
        responseText = `**[Google AI Catalog Matrix] — French Fries Specifications:**\n\n${fryItems
          .map(
            (p) =>
              `• **${p.name}** (${p.brand}): **${p.stockQuantity} Cases Available** at ₹${p.priceExclGst} / Pack`
          )
          .join(
            "\n"
          )}\n\nStored strictly at -18°C in Mayur Vihar Phase-3 with 100% zero-defrost delivery guarantee.`;
        followUps = [
          "McCain vs Iscon Balaji fries: Which should I choose for my kitchen?",
          "Can I get a discount if I order 5+ master cases?",
          "What happens if frozen food defrosts during delivery?",
        ];
      } else if (
        query.includes("cheese") ||
        query.includes("unorganized") ||
        query.includes("dairy")
      ) {
        responseText =
          "**[Google AI Commercial Benchmark] — Britannia & Go Diced Mozzarella vs. Unorganized Local Dairy:**\n\n• **Baking Melt & Stretch**: Commercial Britannia Diced Mozzarella & Cheddar blend melts uniformly without oiling off at 280°C pizza deck temperatures.\n• **Legal GST Input Credit**: 100% official GST invoices (**GSTIN: 07ADQFS8839Q1ZQ**) allow registered restaurants to claim input tax credit on every purchase.\n• **Cold-Chain Audit**: Kept at 2°C to 4°C in our Mayur Vihar Phase-3 Chilled Storage Bay.";
        followUps = [
          "What is the wholesale price for 10+ packs of Britannia Cheese?",
          "Compare Britannia 51-Slice Burger Cheese vs Diced Mozzarella",
        ];
      } else if (
        query.includes("discount") ||
        query.includes("master case") ||
        query.includes("bulk") ||
        query.includes("price")
      ) {
        responseText =
          "**[Google AI Wholesale Margin Framework] — Institutional Bulk Case Discounts:**\n\nSG Trading Company provides structured wholesale B2B pricing:\n• **5+ Master Cases**: Institutional wholesale rate automatically unlocked.\n• **10+ Master Cases**: Free refrigerated cold-chain delivery across Delhi NCR + priority morning 7:00 AM dispatch slot.\n\nYou can also download official **Tally Prime CSV purchase vouchers** or print **GST Proforma PDFs** directly from your Wholesale Cart!";
        followUps = [
          "Open B2B Wholesale RFQ Workspace",
          "What is the Wholesale Dispatch Desk number?",
        ];
      } else if (
        query.includes("defrost") ||
        query.includes("cold chain") ||
        query.includes("delivery")
      ) {
        responseText =
          "**[Google AI Logistics Assurance] — 100% Unbroken Cold-Chain Guarantee:**\n\nEvery frozen product (McCain, ITC Master Chef, Iscon Balaji, Chatha Foods) leaves our Mayur Vihar Phase-3 warehouse inside dedicated **-18°C insulated refrigerated delivery vans**.\n\nIf any core product temperature exceeds -12°C upon delivery, SG Trading Company issues an **instant 100% replacement credit**.";
        followUps = [
          "Inspect running stock in Mayur Vihar Phase-3 Warehouse",
          "What is the Wholesale Dispatch Desk number?",
        ];
      } else {
        responseText =
          "**[Google AI Commercial Concierge]** — Welcome to **SG Trading Company**, Authorized Wholesale Distributor for **McCain, ITC Master Chef, Veeba, Britannia, Iscon Balaji, Go Diced, Chatha Foods, Milkana, Anoop Sattu, Ocean Water, Sleepy Owl & Loyka**.\n\nHow can our Mayur Vihar Phase-3 Wholesale Dispatch Desk assist your kitchen or store today?";
        followUps = INITIAL_SUGGESTED_QUESTIONS;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: "Just now",
        suggestedQuestions: followUps,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Trigger Launcher Button - ICON ONLY */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer border-2 border-amber-300"
          title="SG Commercial AI Specialist"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-slate-950" />
            <span className="w-3 h-3 bg-emerald-500 rounded-full absolute -top-1 -right-1 border-2 border-slate-950 animate-pulse" />
          </div>
        </button>
      )}

      {/* Modern High-Craft Distribution Concierge Panel - REDUCED COMPACT WIDTH */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[340px] h-[550px] max-h-[85vh] bg-slate-950 rounded-2xl border-2 border-amber-500/60 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header with High-Contrast Typography & Visual Status */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black flex items-center justify-center text-lg shadow-md shrink-0 relative">
                SG
                <span
                  className="w-3 h-3 bg-emerald-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-slate-900"
                  title="Wholesale Distribution Desk Online"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-white text-base leading-tight">
                    SG Commercial AI Specialist
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-amber-400 font-mono-spec font-bold mt-0.5">
                  SG Trading Company • Mayur Vihar Central Hub
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Contact & Escalation Strip */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono-spec shrink-0">
            <span className="text-slate-300">Wholesale Dispatch Desk:</span>
            <a
              href="tel:+919667731355"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" /> +91 96677 31355
            </a>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-slate-950 font-bold shadow-lg"
                      : "industrial-card text-slate-100 border border-slate-800 shadow-md"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    renderFormattedText(msg.text)
                  ) : (
                    <p className="leading-relaxed">{msg.text}</p>
                  )}
                </div>

                {/* Suggested Follow-Up Questions Chips */}
                {msg.sender === "bot" &&
                  msg.suggestedQuestions &&
                  msg.suggestedQuestions.length > 0 && (
                    <div className="mt-3 space-y-1.5 w-full">
                      <span className="text-[10px] font-mono-spec font-bold uppercase text-amber-400 flex items-center gap-1 pl-1">
                        <Sparkles className="w-3 h-3" />
                        Google AI Suggested Queries:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestedQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(q)}
                            className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/70 hover:bg-slate-850 text-slate-200 hover:text-amber-400 text-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                          >
                            <span>{q}</span>
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask Google AI Mode about yields, stock, GST..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
