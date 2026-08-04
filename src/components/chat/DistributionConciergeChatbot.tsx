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
      text: "Namaste & warm welcome to SG Trading Company! 🙏 I'm your dedicated AI Commercial Distribution Specialist working alongside Rahul Garg & Sonu in Mayur Vihar Phase-3.\n\nWhether you need help choosing between McCain vs. Iscon Balaji fries, negotiating B2B case discounts, understanding -18°C cold-chain guarantees, or claiming 100% GST input tax credit, I'm here to guide you toward the highest profitability for your kitchen or store.",
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

    // Simulate consultative empathetic response logic
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

        responseText = `**Live Mayur Vihar Phase-3 Warehouse Stock Status (-18°C Cold Room):**\n\n${friesProducts
          .map(
            (p) =>
              `• **${p.brand} — ${p.name}**: **${p.stockQuantity} Master Cases** in stock (₹${p.priceExclGst} / Pack)`
          )
          .join("\n")}\n\n**Total Frozen / Fry Cases Ready for Immediate Dispatch:** **${totalFryCases.toLocaleString(
          "en-IN"
        )} Cases**!\n\nRahul Garg & Sonu maintain continuous -18°C cold-chain replenishment. Orders placed before 12:00 PM are dispatched same-day.`;

        followUps = [
          "Load McCain & Iscon Balaji Fries into my Wholesale Cart",
          "Can I get a discount if I order 10+ master cases?",
          "Call Rahul Garg (9667731355) to reserve stock",
        ];
      } else if (
        (query.includes("mccain") && query.includes("iscon")) ||
        query.includes("compare fries") ||
        query.includes("difference")
      ) {
        const mccain = products.find((p) => p.brand.includes("McCain"));
        const iscon = products.find((p) => p.brand.includes("Iscon"));

        responseText =
          "**McCain vs. Iscon Balaji 9mm Fries Commercial Comparison:**\n\n1. **McCain 9mm French Fries (2.5 Kg - ₹380)**: Industry benchmark with superior starch consistency, crisp retention (25+ mins under heat lamps), and zero oil absorption variance. Ideal for 4-star/5-star banquets & premium QSRs.\n2. **Iscon Balaji 9mm Fries (2.5 Kg - ₹340)**: High yield and ₹40 lower per pack cost, giving cloud kitchens a 14% higher net margin on every fry basket.\n\nRahul Garg & Sonu keep both ready in `-18°C Cold Room 1` in Mayur Vihar Phase-3!";
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
        responseText = `**Current Warehouse Stock & Commercial Specs for French Fries:**\n\n${fryItems
          .map(
            (p) =>
              `• **${p.name}** (${p.brand}): **${p.stockQuantity} Cases Available** at ₹${p.priceExclGst} / Pack`
          )
          .join(
            "\n"
          )}\n\nBoth McCain Food Service & Iscon Balaji fries are stored at -18°C in Mayur Vihar Phase-3 and ready for instant delivery across Delhi NCR!`;
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
          "**Why Britannia & Go Diced Mozzarella Outperform Local Unorganized Dairy:**\n\n• **Baking Stretch & Stretch Retention**: Commercial Britannia Diced Mozzarella & Cheddar blend melts uniformly without oiling off at 280°C.\n• **FSSAI & GST Compliance**: 100% legal GST invoices with **GSTIN: 07ADQFS8839Q1ZQ** allowing your restaurant to claim input tax credit.\n• **Cold-Chain Safety**: Stored strictly at 2°C to 4°C in our Mayur Vihar Phase-3 Chilled Bay.";
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
          "**Bulk Case & Wholesale Margin Structuring:**\n\nRahul Garg & Sonu offer institutional tier discounts for recurring contracts:\n• **5+ Master Cases**: Flat wholesale B2B case rates applied automatically.\n• **10+ Master Cases**: Free refrigerated delivery within Delhi NCR + priority morning 7:00 AM dispatch slot.\n\nYou can also submit a formal B2B RFQ directly in our wholesale workspace!";
        followUps = [
          "Open B2B Wholesale RFQ Workspace",
          "What is the contact number for Rahul Garg & Sonu?",
        ];
      } else if (
        query.includes("defrost") ||
        query.includes("cold chain") ||
        query.includes("delivery")
      ) {
        responseText =
          "**Our 100% Unbroken Cold-Chain Delivery Guarantee:**\n\nEvery frozen item (McCain, ITC Master Chef, Iscon Balaji, Chatha Foods) leaves our Mayur Vihar Phase-3 warehouse inside dedicated **-18°C insulated refrigerated vans**.\n\nIf any pack temperature exceeds -12°C upon delivery, Rahul Garg & Sonu provide **100% instant replacement** without question.";
        followUps = [
          "Inspect running stock in Mayur Vihar Phase-3 Warehouse",
          "Call Rahul Garg (9667731355) directly",
        ];
      } else {
        responseText =
          "Thank you for reaching out! As authorized distributors for **McCain, ITC Master Chef, Veeba, Britannia, Iscon Balaji, Go Diced, Chatha Foods, Milkana, Anoop Sattu, Ocean Water, Sleepy Owl & Loyka**, we ensure direct distributor pricing and zero-defrost logistics.\n\nHow can Rahul Garg & Sonu assist your business today?";
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
          title="SG Commercial AI Specialist (Rahul Garg & Sonu)"
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
                  title="Rahul Garg & Sonu Desk Online"
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
                  Rahul Garg & Sonu Distribution Desk • Mayur Vihar Phase-3
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
            <span className="text-slate-300">Direct Human Distributor:</span>
            <a
              href="tel:+919667731355"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" /> Rahul Garg (9667731355)
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
                        Suggested Follow-Up Questions:
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
              placeholder="Ask competitive questions, objection handling, pricing..."
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
