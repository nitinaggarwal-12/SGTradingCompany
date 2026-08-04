"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Phone,
  ShoppingCart,
  FileText,
  Boxes,
  Heart,
  HelpCircle,
  CheckCircle2,
  Snowflake,
  ShieldCheck,
  Award,
  TrendingDown,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "assistant" | "user";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  actionProductId?: string;
  categoryTag?: string;
}

export const DistributionConciergeChatbot: React.FC = () => {
  const {
    products,
    addToCart,
    addToRFQ,
    setIsCartOpen,
    setIsRFQOpen,
    setIsInventoryModalOpen,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Namaste & warm welcome to SG Trading Company! 🙏 I'm your dedicated AI Commercial Distribution Specialist working alongside Rahul Garg & Sonu in Mayur Vihar Phase-3.\n\nWhether you need help choosing between **McCain vs. Iscon Balaji fries**, negotiating **B2B case discounts**, understanding **-18°C cold-chain guarantees**, or claiming **100% GST input tax credit**, I'm here to guide you toward the highest profitability for your kitchen or store.",
      timestamp: "Just now",
      suggestedQuestions: [
        "McCain vs Iscon Balaji fries: Which should I choose for my kitchen?",
        "Why buy brand cheese instead of local unorganized dairy?",
        "Can I get a discount if I order 5+ master cases?",
        "What happens if frozen food defrosts during delivery?",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // CONSULTATIVE DECISION & OBJECTION HANDLING ENGINE
  const generateConsultativeResponse = (
    userText: string
  ): {
    reply: string;
    suggestions: string[];
    actionProductId?: string;
  } => {
    const lower = userText.toLowerCase();

    // OBJECTION 1: COMPARISON & CHOICE — McCain vs Iscon Balaji
    if (
      (lower.includes("mccain") && lower.includes("iscon")) ||
      (lower.includes("compare") && lower.includes("fries")) ||
      lower.includes("which fry") ||
      lower.includes("mccain vs")
    ) {
      const mccain = products.find((p) => p.id === "mccain-01");
      const iscon = products.find((p) => p.id === "iscon-01");
      const mccainRate = mccain ? mccain.b2bWholesalePrice : 295;
      const isconRate = iscon ? iscon.b2bWholesalePrice : 268;

      return {
        reply: `Great operational question! Choosing between **McCain 9mm** and **Iscon Balaji 9mm** depends on your service model:\n\n🥇 **Choose McCain Food Service (2.5 Kg • ₹${mccainRate} B2B Rate)** if:\n• You do **delivery via Zomato/Swiggy** or cloud kitchen (McCain holds golden crunch under heat lamps for 25+ minutes).\n• Your customers demand brand recognition.\n\n🥈 **Choose Iscon Balaji Foods (2.5 Kg • ₹${isconRate} B2B Rate)** if:\n• You run a **dine-in restaurant, banquet, or QSR counter** where fries are served within 5 minutes of frying.\n• You want to **cut food cost by ₹27 per pack** (saving ₹108+ per master case) without sacrificing potato starch density.\n\nBoth are stored at **-18°C in our Mayur Vihar Phase-3 warehouse** and ready for express delivery!`,
        suggestions: [
          "Add McCain French Fries (2.5 Kg) to my Cart",
          "Add Iscon Balaji French Fries (2.5 Kg) to my Cart",
          "What cheese blends do you recommend for Cheese Fries?",
        ],
        actionProductId: "mccain-01",
      };
    }

    // OBJECTION 2: OBJECTION HANDLING — Why Brand Cheese vs Local Open Dairy Cheese?
    if (
      lower.includes("local") ||
      lower.includes("cheap") ||
      lower.includes("unorganized") ||
      lower.includes("why britannia") ||
      lower.includes("why brand") ||
      lower.includes("dairy")
    ) {
      return {
        reply: `That is one of the smartest food-cost questions a chef or owner can ask! Many kitchens switch to **Britannia Diced Cheese** or **Go Diced Mozzarella** from local open cheese for 4 vital reasons:\n\n1. **Zero Free-Oil Separation**: Unorganized open cheese releases puddle-oil under 280°C pizza ovens, ruining pizza crusts. Britannia & Go Diced melt into a silky, golden stretch.\n2. **100% Tax Credit (GST Compliance)**: Local cash sellers give zero bill. With SG Trading Company, you receive an official **12% GST Invoice**, reducing your net cheese cost immediately!\n3. **FSSAI & Microbial Safety**: Zero risk of food contamination or customer complaints.\n4. **Labor-Free Pre-Diced Pack**: Saves 45 minutes of daily staff grating time.`,
        suggestions: [
          "Compare Britannia Cheese vs Go Diced Cheese specs",
          "What is the wholesale case rate for Britannia 51-Slice Cheese?",
          "Can I talk directly to Rahul Garg or Sonu?",
        ],
        actionProductId: "brit-01",
      };
    }

    // OBJECTION 3: PRICING / DISCOUNT OBJECTION — "Is pricing negotiable / can I get a discount?"
    if (
      lower.includes("discount") ||
      lower.includes("negotiable") ||
      lower.includes("expensive") ||
      lower.includes("cheaper") ||
      lower.includes("rate") ||
      lower.includes("price")
    ) {
      return {
        reply: `I completely respect that—controlling food cost percentage (FC%) is what determines profitability in the restaurant business! 📈\n\nHere is how Rahul Garg & Sonu protect your margins:\n\n1. **B2B Wholesale Case Tier**: When you order master cases (e.g. 4+ packs of McCain fries or 6+ packs of Veeba Mayo), your price drops automatically to our wholesale tier (saving up to **₹45 per pack**).\n2. **Consolidated GST Input Credit**: Claim **5%, 12%, or 18% GST** on every tax invoice.\n3. **Custom Contract Supply**: For monthly kitchen requirements exceeding ₹50,000, Rahul Garg (+91 96677 31355) & Sonu (+91 96430 97002) offer customized seasonal contract rates.`,
        suggestions: [
          "Load QSR Burger Chain Case Bundle into my B2B RFQ",
          "Check running warehouse stock in Mayur Vihar Phase-3",
          "Call Rahul Garg to discuss monthly contract rates",
        ],
      };
    }

    // OBJECTION 4: COLD CHAIN & QUALITY ASSURANCE — "What if frozen items melt during transport?"
    if (
      lower.includes("defrost") ||
      lower.includes("melt") ||
      lower.includes("cold chain") ||
      lower.includes("transport") ||
      lower.includes("delivery") ||
      lower.includes("quality")
    ) {
      return {
        reply: `Broken cold-chains are a nightmare for frozen fries and sausages—once defrosted and refrozen, fries lose crispness and stick together! ❄️\n\nHere is our **SG Trading Company Cold-Chain Guarantee**:\n\n• **Dedicated -18°C Refrigerated Vans**: All McCain, ITC Master Chef, and Chatha Foods shipments travel in temperature-monitored refrigerated transport directly from our Mayur Vihar Phase-3 warehouse.\n• **Immediate Replacement Guarantee**: If any pack arrives above -15°C, Rahul Garg & Sonu replace it on the spot at zero cost.\n• **Same-Day Express Dispatch**: Delhi NCR delivery within 4 to 6 hours of order placement.`,
        suggestions: [
          "Check running stock of McCain French Fries & Britannia Cheese",
          "How do I pay via Paytm UPI (paytmqr69pf0i@ptys)?",
          "Can I visit the Mayur Vihar Phase-3 warehouse?",
        ],
      };
    }

    // OBJECTION 5: MOQ & QUANTITY FLEXIBILITY — "Can I buy single packs or only bulk?"
    if (
      lower.includes("moq") ||
      lower.includes("minimum") ||
      lower.includes("single pack") ||
      lower.includes("small quantity") ||
      lower.includes("sample")
    ) {
      return {
        reply: `We support businesses at every growth stage! 🌱\n\n• **For Small Cafes & Trial Samples**: You can buy **single institutional packs** (e.g. 1 Kg Veeba Mayo or 1 Kg Britannia Cheese) directly through our **Retail Cart** with immediate online checkout.\n• **For High-Volume Outlets**: Order by the **Master Case (B2B RFQ)** to unlock maximum wholesale price discounts and priority cold-chain delivery.\n\nWhether you need 1 pack or 100 cases today, Rahul Garg & Sonu have you covered!`,
        suggestions: [
          "View all 12 authorized brand SKUs and pack sizes",
          "What General Trade (GT) items do you supply to retail stores?",
          "Call Rahul Garg (+91 96677 31355)",
        ],
      };
    }

    // CONTACT / RAHUL GARG & SONU
    if (
      lower.includes("rahul") ||
      lower.includes("sonu") ||
      lower.includes("phone") ||
      lower.includes("contact") ||
      lower.includes("speak") ||
      lower.includes("call")
    ) {
      return {
        reply: `You can connect directly with our Managing Directors right now:\n\n📞 **Rahul Garg (Order & B2B Sales Desk)**: +91 96677 31355\n📞 **Sonu (Cold-Chain & Warehouse Operations)**: +91 96430 97002\n✉️ **Email**: sgtradingcompany@rediffmail.com\n📍 **Warehouse Address**: B-577, Shiv Mandir Road, G.D. Colony, Mayur Vihar Phase-3, Delhi - 110096\n\nThey personally ensure your hotel, cloud kitchen, or retail store receives priority delivery!`,
        suggestions: [
          "Check running stock of McCain French Fries & Britannia Cheese",
          "How do I pay via Paytm UPI (paytmqr69pf0i@ptys)?",
          "Can I generate an official GST Proforma Quotation?",
        ],
      };
    }

    // DEFAULT CONSULTATIVE RESPONSE
    return {
      reply: `Thank you for reaching out! 😊 As authorized distributors for **McCain, ITC Master Chef, Veeba, Britannia Cheese, Iscon Balaji, Go Diced, Chatha Foods, Milkana Professional, Anoop Sattu, Ocean Water, Sleepy Owl Coffee & Loyka**, our mission is to cut your procurement cost while guaranteeing 100% quality.\n\nHow can I assist your kitchen or retail business today?`,
      suggestions: [
        "McCain vs Iscon Balaji fries: Which should I choose?",
        "Why buy brand cheese instead of local unorganized dairy?",
        "Can I get a discount if I order 5+ master cases?",
        "What happens if frozen food defrosts during delivery?",
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    setTimeout(() => {
      const response = generateConsultativeResponse(query);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: response.reply,
        timestamp: "Just now",
        suggestedQuestions: response.suggestions,
        actionProductId: response.actionProductId,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 420);
  };

  const handleQuickAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chatbot Window */}
      {isOpen ? (
        <div className="industrial-card w-[92vw] sm:w-[440px] max-h-[640px] h-[600px] rounded-2xl border border-amber-500/40 shadow-2xl flex flex-col overflow-hidden bg-slate-950 text-white animate-in slide-in-from-bottom-5 duration-300">
          {/* Top Consultative Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg">
                  SG
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">
                    SG Commercial AI Specialist
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400 font-mono-spec">
                  Rahul Garg & Sonu Distribution Desk • Consultative Advisor
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-slate-950 font-semibold rounded-br-none shadow"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.text}

                  {/* Optional Embedded Action Buttons in Chat */}
                  {msg.actionProductId && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleQuickAddToCart(msg.actionProductId!)
                        }
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add Pack to Cart</span>
                      </button>

                      <a
                        href="tel:+919667731355"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Rahul Garg</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Suggested Next Questions Pills */}
                {msg.suggestedQuestions &&
                  msg.suggestedQuestions.length > 0 && (
                    <div className="mt-2.5 space-y-1.5 w-full">
                      <span className="text-[10px] font-mono-spec uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Suggested Follow-Up Questions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="text-left px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 text-[11px] font-medium transition-all cursor-pointer"
                          >
                            {q} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Direct Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask competitive questions, objection handling, pricing..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Chat Button Trigger */
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-slate-950" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-amber-500 absolute -top-0.5 -right-0.5 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-amber-500 absolute -top-0.5 -right-0.5" />
          </div>

          <div className="text-left leading-tight">
            <span className="block font-black">SG Commercial AI Specialist</span>
            <span className="text-[10px] font-mono-spec font-semibold opacity-90 block">
              Ask about brand choices, discounts & cold-chain →
            </span>
          </div>
        </button>
      )}
    </div>
  );
};
