"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Save,
  Sparkles,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { Product } from "@/types/equipment";
import { LayoutBlock } from "@/types/layout";

export type EditableItemType = "text" | "product" | "contact" | "block";

export interface EditableTarget {
  type: EditableItemType;
  title: string;
  fieldKey: string;
  value: any;
  product?: Product;
  block?: LayoutBlock;
}

interface AdminPropertyInspectorModalProps {
  target: EditableTarget | null;
  onClose: () => void;
  onSaveText: (fieldKey: string, newValue: string) => void;
  onSaveProduct: (updatedProduct: Product) => void;
  onSaveBlockProps?: (blockId: string, updatedProps: Record<string, any>) => void;
}

export const AdminPropertyInspectorModal: React.FC<
  AdminPropertyInspectorModalProps
> = ({ target, onClose, onSaveText, onSaveProduct, onSaveBlockProps }) => {
  const [textValue, setTextValue] = useState("");
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [editedBlock, setEditedBlock] = useState<LayoutBlock | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (target) {
      setSavedSuccess(false);
      if (target.type === "product" && target.product) {
        setEditedProduct({ ...target.product });
      } else if (target.type === "block" && target.block) {
        setEditedBlock({ ...target.block });
      } else {
        setTextValue(String(target.value || ""));
      }
    }
  }, [target]);

  if (!target) return null;

  // Integrated Media Drag-and-Drop Pipeline (Phase 5)
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (editedProduct) {
        setEditedProduct({ ...editedProduct, image: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (target.type === "product" && editedProduct) {
      onSaveProduct(editedProduct);
    } else if (target.type === "block" && editedBlock && onSaveBlockProps) {
      onSaveBlockProps(editedBlock.id, editedBlock.props || {});
    } else {
      onSaveText(target.fieldKey, textValue);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="industrial-card w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-amber-500 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Inspector Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono-spec font-black text-amber-400 uppercase tracking-wider">
              CANVAS VISUAL PROPERTY INSPECTOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inspector Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {savedSuccess ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-base font-extrabold text-white">
                Canvas Property Updated Live!
              </h4>
              <p className="text-xs text-slate-400">
                Changes applied to canvas. Click Save &amp; Deploy when ready.
              </p>
            </div>
          ) : target.type === "product" && editedProduct ? (
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                  SKU Product Name
                </label>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    Unit Rate Excl. GST (₹)
                  </label>
                  <input
                    type="number"
                    value={editedProduct.priceExclGst}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        priceExclGst: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    B2B Wholesale Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={editedProduct.b2bWholesalePrice}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        b2bWholesalePrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    Warehouse Stock (Cases)
                  </label>
                  <input
                    type="number"
                    value={editedProduct.stockQuantity}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono-spec focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                    GST Rate Slab (%)
                  </label>
                  <select
                    value={editedProduct.gstRate}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        gstRate: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>5% GST (Frozen / Dairy)</option>
                    <option value={12}>12% GST (Packaged Foods)</option>
                    <option value={18}>18% GST (Beverages / Commercial)</option>
                  </select>
                </div>
              </div>

              {/* INTEGRATED MEDIA DRAG-AND-DROP FILE UPLOADER (PHASE 5) */}
              <div>
                <label className="text-[11px] font-mono-spec text-slate-400 block mb-1">
                  Product Commercial Photo (Drag-and-Drop File or Paste URL)
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-4 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                    isDraggingFile
                      ? "border-amber-400 bg-amber-500/10"
                      : "border-slate-700 hover:border-amber-500/60 bg-slate-950"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <Upload className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">
                    Drop photo file here or click to upload
                  </p>
                  <p className="text-[10px] font-mono-spec text-slate-400">
                    Supports JPG, PNG, WEBP commercial studio photography
                  </p>
                </div>

                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Or paste Image URL..."
                    value={editedProduct.image}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        image: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {editedProduct.image && (
                  <img
                    src={editedProduct.image}
                    alt="Preview"
                    className="mt-2 w-full h-28 object-cover rounded-xl border border-slate-800"
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[11px] font-mono-spec text-slate-400 block mb-1.5 uppercase">
                {target.title}
              </label>
              <textarea
                rows={4}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono-spec"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Canvas Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
