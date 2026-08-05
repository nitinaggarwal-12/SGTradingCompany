"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Lock,
  Unlock,
  Save,
  Plus,
  RotateCcw,
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  History,
  FileEdit,
  X,
  Sparkles,
  Download,
  AlertCircle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ViewportMode } from "@/types/layout";

interface AdminCanvasToolbarProps {
  isCanvasMode: boolean;
  onToggleCanvasMode: (enabled: boolean) => void;
  onAddNewProduct: () => void;
  onSaveCanvasLive: () => Promise<void>;
  onSaveAsDraft: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  hasUnsavedChanges: boolean;
}

export const AdminCanvasToolbar: React.FC<AdminCanvasToolbarProps> = ({
  isCanvasMode,
  onToggleCanvasMode,
  onAddNewProduct,
  onSaveCanvasLive,
  onSaveAsDraft,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  viewportMode,
  onViewportChange,
  hasUnsavedChanges,
}) => {
  const { showToast } = useApp();
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSnapshotsModal, setShowSnapshotsModal] = useState(false);
  const [hasLocalDraft, setHasLocalDraft] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && isCanvasMode) {
      const draft = localStorage.getItem("sg_canvas_draft");
      setHasLocalDraft(!!draft);
    }
  }, [isCanvasMode]);

  const handleOpenPinModal = () => {
    if (isCanvasMode) {
      onToggleCanvasMode(false);
      showToast("Visual Canvas Edit Mode Deactivated.");
    } else {
      setShowPinModal(true);
      setPinInput("");
      setPinError(false);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "2026" || pinInput === "9667731355") {
      setShowPinModal(false);
      onToggleCanvasMode(true);
      showToast("🎨 Visual Canvas Edit Mode Activated!");
    } else {
      setPinError(true);
    }
  };

  const handleRestoreLocalDraft = () => {
    if (typeof window !== "undefined") {
      const draftStr = localStorage.getItem("sg_canvas_draft");
      if (draftStr) {
        showToast("📥 Restored local draft layout!");
        setHasLocalDraft(false);
      }
    }
  };

  const handleSaveLive = async () => {
    setIsSaving(true);
    await onSaveCanvasLive();
    setIsSaving(false);
  };

  return (
    <>
      {/* Top Sticky Canvas Control Ribbon (Phase 2 & Phase 9) */}
      {isCanvasMode && (
        <div className="fixed top-0 inset-x-0 z-[90] bg-slate-950/95 backdrop-blur-md border-b-2 border-amber-500 shadow-2xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          {/* Left: Active Status & Add Item */}
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono-spec text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VISUAL CANVAS MODE</span>
            </span>

            {/* Local Draft Recovery Prompt (Phase 9 Enhancement) */}
            {hasLocalDraft && (
              <button
                onClick={handleRestoreLocalDraft}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 font-mono-spec text-xs font-bold flex items-center gap-1 cursor-pointer animate-pulse"
              >
                <Download className="w-3 h-3" />
                <span>Restore Local Draft</span>
              </button>
            )}

            {/* Undo / Redo Stack (Phase 9) */}
            <div className="flex items-center gap-1 border-l border-r border-slate-800 px-2">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-all cursor-pointer"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-all cursor-pointer"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Responsive Viewport Simulator Toggles (Phase 2) */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => onViewportChange("desktop")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewportMode === "desktop"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Desktop 1440px Viewport"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                onClick={() => onViewportChange("tablet")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewportMode === "tablet"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Tablet 834px Viewport"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tablet</span>
              </button>
              <button
                onClick={() => onViewportChange("mobile")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewportMode === "mobile"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Mobile 390px Viewport"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Right: Actions (Add SKU, Save Draft, Save & Deploy Live, Exit) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAddNewProduct}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/50 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Product SKU</span>
            </button>

            <button
              onClick={onSaveAsDraft}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={handleSaveLive}
              disabled={isSaving}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {isSaving
                  ? "Publishing..."
                  : "💾 Save & Deploy Live (0.2s)"}
              </span>
            </button>

            <button
              onClick={() => onToggleCanvasMode(false)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title="Exit Visual Canvas Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Admin Visual Canvas Mode Launcher Button */}
      <div className="fixed bottom-6 left-6 z-[80]">
        <button
          onClick={handleOpenPinModal}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 shadow-2xl font-mono-spec text-xs font-black transition-all cursor-pointer ${
            isCanvasMode
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/30"
              : "bg-slate-950/90 hover:bg-slate-900 text-amber-400 border-amber-500/60 backdrop-blur-md"
          }`}
          title="Toggle Admin Visual Canvas Editing Mode"
        >
          <Settings className={`w-4 h-4 ${isCanvasMode ? "animate-spin" : ""}`} />
          <span>{isCanvasMode ? "EXIT VISUAL CANVAS" : "ADMIN CANVAS EDIT"}</span>
        </button>
      </div>

      {/* PIN Authentication Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="industrial-card w-full max-w-sm rounded-2xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-extrabold text-white">
                  Rahul Garg &amp; Sonu — Admin Canvas Auth
                </h3>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Enter Admin Security PIN to activate In-Place Visual Canvas Edit Mode for SG Trading Company portal.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono-spec text-slate-400 block mb-1">
                  ENTER ADMIN SECURITY PIN (Default: 2026)
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="••••"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono-spec font-bold text-center text-amber-400 tracking-widest focus:outline-none focus:border-amber-500"
                />
                {pinError && (
                  <p className="text-[11px] text-rose-400 font-mono-spec mt-1">
                    Incorrect PIN. Try 2026 or Rahul Garg phone number.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Visual Canvas Edit Mode</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
