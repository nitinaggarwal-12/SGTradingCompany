"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Product,
  CartItem,
  RFQItem,
  TurnkeyConfig,
  CustomerOrder,
  OrderLifecycleStage,
  OrderPaymentMethod,
} from "@/types/equipment";
import { PRODUCTS_CATALOG } from "@/data/products";

interface AppContextType {
  // Products with dynamic stock
  products: Product[];
  stockMap: Record<string, number>;
  restockProduct: (productId: string, addQuantity: number) => void;
  deductOrderStock: (cartItems: CartItem[]) => void;

  // Shopping Cart (Retail Checkout)
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customNotes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // B2B Bulk RFQ Workspace
  rfqItems: RFQItem[];
  addToRFQ: (product: Product, quantity?: number, customNotes?: string) => void;
  removeFromRFQ: (productId: string) => void;
  updateRFQQuantity: (productId: string, quantity: number) => void;
  clearRFQ: () => void;
  isRFQOpen: boolean;
  setIsRFQOpen: (open: boolean) => void;
  loadTurnkeyPackageToRFQ: (config: TurnkeyConfig) => void;

  // Compare Specs Engine (Up to 4 products)
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // Theme state (Dark / Light)
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Active Product Quick View / Detail Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Distributor Warehouse Inventory Dashboard Modal (Rahul & Sonu)
  isInventoryModalOpen: boolean;
  setIsInventoryModalOpen: (open: boolean) => void;

  // Order-to-Cash (O2C) Enterprise Lifecycle Engine
  orders: CustomerOrder[];
  createCustomerOrder: (orderData: Partial<CustomerOrder>) => CustomerOrder;
  advanceOrderStage: (
    orderId: string,
    targetStage?: OrderLifecycleStage
  ) => void;
  markOrderPaid: (orderId: string, method: OrderPaymentMethod) => void;

  // Toast / Notification
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize running warehouse stock map from products dataset
  const initialStockMap: Record<string, number> = {};
  PRODUCTS_CATALOG.forEach((p) => {
    initialStockMap[p.id] = p.stockQuantity ?? 100;
  });

  const [stockMap, setStockMap] = useState<Record<string, number>>(initialStockMap);

  // Pre-populate realistic commercial sample data
  const defaultCartItems: CartItem[] = [
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "mccain-02") || PRODUCTS_CATALOG[1],
      quantity: 2,
    },
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "itc-01") || PRODUCTS_CATALOG[2],
      quantity: 2,
    },
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "sleepy-01") || PRODUCTS_CATALOG[10],
      quantity: 3,
    },
  ];

  const defaultRfqItems: RFQItem[] = [
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "mccain-01") || PRODUCTS_CATALOG[0],
      quantity: 5,
      customNotes: "QSR Burger Chain Weekly Contract Supply",
    },
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "brit-01") || PRODUCTS_CATALOG[6],
      quantity: 6,
      customNotes: "Institutional Diced Mozzarella & Cheddar Blend",
    },
    {
      product: PRODUCTS_CATALOG.find((p) => p.id === "veeba-01") || PRODUCTS_CATALOG[4],
      quantity: 8,
      customNotes: "Chef's Special Eggless Mayonnaise (1 Kg Pouch)",
    },
  ];

  const defaultCompareList: Product[] = [
    PRODUCTS_CATALOG.find((p) => p.id === "mccain-01") || PRODUCTS_CATALOG[0],
    PRODUCTS_CATALOG.find((p) => p.id === "iscon-01") || PRODUCTS_CATALOG[8],
    PRODUCTS_CATALOG.find((p) => p.id === "brit-01") || PRODUCTS_CATALOG[6],
  ];

  // Authentic Order-to-Cash Enterprise Lifecycle Sample Orders
  const defaultOrders: CustomerOrder[] = [
    {
      orderId: "SG-O2C-2026-101",
      poNumber: "PO-RADISSON-2026-891",
      invoiceNumber: "INV-SG-2026-104",
      customerName: "Radisson Blu Hotel & Banquets",
      customerGstin: "07AAACR3841C1Z5",
      customerPhone: "+91 98112 44901",
      customerEmail: "purchase@radissonmayurvihar.com",
      deliveryCity: "Mayur Vihar Phase-1, Delhi NCR",
      items: [
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "mccain-01") || PRODUCTS_CATALOG[0],
          quantity: 10,
        },
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "brit-01") || PRODUCTS_CATALOG[6],
          quantity: 12,
        },
      ],
      subtotalExclGst: 7360,
      gstAmount: 883,
      totalAmount: 8243,
      stage: "6_RECONCILED_CLOSED",
      paymentMethod: "paytm_upi",
      paymentStatus: "PAID",
      createdAt: "Today, 09:15 AM",
      dispatchedAt: "Today, 11:30 AM",
      invoiceSentAt: "Today, 11:45 AM",
      paidAt: "Today, 12:10 PM",
      notes: "Delivered via -18°C refrigerated van to Hotel Banquet Kitchen.",
    },
    {
      orderId: "SG-O2C-2026-102",
      poNumber: "PO-BSINGH-2026-412",
      invoiceNumber: "INV-SG-2026-108",
      customerName: "Burger Singh Cloud Kitchen Hub",
      customerGstin: "07AABCB8812F1Z2",
      customerPhone: "+91 99100 87340",
      customerEmail: "procurement@burgersingh.com",
      deliveryCity: "Sector 63, Noida NCR",
      items: [
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "mccain-01") || PRODUCTS_CATALOG[0],
          quantity: 15,
        },
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "veeba-01") || PRODUCTS_CATALOG[4],
          quantity: 10,
        },
      ],
      subtotalExclGst: 5805,
      gstAmount: 696,
      totalAmount: 6501,
      stage: "4_TAX_INVOICE_SENT",
      paymentMethod: "credit_card",
      paymentStatus: "PENDING",
      createdAt: "Today, 01:20 PM",
      dispatchedAt: "Today, 02:45 PM",
      invoiceSentAt: "Today, 03:00 PM",
      notes: "Picked from Warehouse Cold Room 1. GST Invoice sent to customer.",
    },
    {
      orderId: "SG-O2C-2026-103",
      poNumber: "PO-BBQN-2026-905",
      invoiceNumber: "INV-SG-2026-PENDING",
      customerName: "Barbeque Nation Restaurant",
      customerGstin: "07AAACB5521M1Z8",
      customerPhone: "+91 98711 32900",
      customerEmail: "cp.store@barbequenation.com",
      deliveryCity: "Connaught Place, New Delhi",
      items: [
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "itc-01") || PRODUCTS_CATALOG[2],
          quantity: 8,
        },
        {
          product: PRODUCTS_CATALOG.find((p) => p.id === "chatha-01") || PRODUCTS_CATALOG[9],
          quantity: 6,
        },
      ],
      subtotalExclGst: 3994,
      gstAmount: 200,
      totalAmount: 4194,
      stage: "2_DISTRIBUTOR_NOTIFIED",
      paymentMethod: "paypal",
      paymentStatus: "PENDING",
      createdAt: "Just now",
      notes: "Customer generated PO. Awaiting Rahul Garg & Sonu warehouse fulfillment.",
    },
  ];

  const [cart, setCart] = useState<CartItem[]>(defaultCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [rfqItems, setRfqItems] = useState<RFQItem[]>(defaultRfqItems);
  const [isRFQOpen, setIsRFQOpen] = useState(false);

  const [compareList, setCompareList] = useState<Product[]>(defaultCompareList);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [orders, setOrders] = useState<CustomerOrder[]>(defaultOrders);

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "light") {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Products dynamically enriched with running warehouse stock
  const products: Product[] = PRODUCTS_CATALOG.map((p) => {
    const currentStock = stockMap[p.id] ?? p.stockQuantity ?? 0;
    return {
      ...p,
      stockQuantity: currentStock,
      inStock: currentStock > 0,
    };
  });

  const restockProduct = (productId: string, addQuantity: number) => {
    setStockMap((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + addQuantity,
    }));
    const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
    showToast(
      `Restocked +${addQuantity} Cases for "${product?.name || productId}" in Warehouse!`
    );
  };

  const deductOrderStock = (cartItems: CartItem[]) => {
    setStockMap((prev) => {
      const updated = { ...prev };
      cartItems.forEach((item) => {
        const current = updated[item.product.id] || 0;
        updated[item.product.id] = Math.max(0, current - item.quantity);
      });
      return updated;
    });
  };

  // ORDER-TO-CASH (O2C) ACTIONS
  const createCustomerOrder = (
    orderData: Partial<CustomerOrder>
  ): CustomerOrder => {
    const newId = `SG-O2C-2026-${Math.floor(110 + Math.random() * 890)}`;
    const newPo =
      orderData.poNumber || `PO-SG-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: CustomerOrder = {
      orderId: newId,
      poNumber: newPo,
      invoiceNumber: `INV-SG-2026-${Math.floor(120 + Math.random() * 880)}`,
      customerName:
        orderData.customerName || "HORECA Commercial Partner / Retailer",
      customerGstin: orderData.customerGstin || "07ADQFS8839Q1ZQ",
      customerPhone: orderData.customerPhone || "+91 96677 31355",
      customerEmail: orderData.customerEmail || "purchase@customer.com",
      deliveryCity: orderData.deliveryCity || "Delhi NCR",
      items: orderData.items || [...cart],
      subtotalExclGst: orderData.subtotalExclGst || 5000,
      gstAmount: orderData.gstAmount || 600,
      totalAmount: orderData.totalAmount || 5600,
      stage: "2_DISTRIBUTOR_NOTIFIED",
      paymentMethod: orderData.paymentMethod || "paytm_upi",
      paymentStatus: "PENDING",
      createdAt: "Just now",
      notes: "PO generated by customer. Rahul Garg & Sonu notified in O2C Desk.",
    };

    setOrders((prev) => [newOrder, ...prev]);
    deductOrderStock(newOrder.items);
    showToast(
      `PO "${newPo}" Generated! Rahul Garg & Sonu Notified in Order-to-Cash Desk.`
    );
    return newOrder;
  };

  const advanceOrderStage = (
    orderId: string,
    targetStage?: OrderLifecycleStage
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderId !== orderId) return ord;

        let nextStage: OrderLifecycleStage = ord.stage;
        if (targetStage) {
          nextStage = targetStage;
        } else {
          if (ord.stage === "1_PO_PLACED") nextStage = "2_DISTRIBUTOR_NOTIFIED";
          else if (ord.stage === "2_DISTRIBUTOR_NOTIFIED")
            nextStage = "3_WAREHOUSE_FULFILLED";
          else if (ord.stage === "3_WAREHOUSE_FULFILLED")
            nextStage = "4_TAX_INVOICE_SENT";
          else if (ord.stage === "4_TAX_INVOICE_SENT")
            nextStage = "5_PAYMENT_RECEIVED";
          else if (ord.stage === "5_PAYMENT_RECEIVED")
            nextStage = "6_RECONCILED_CLOSED";
        }

        const updated: CustomerOrder = { ...ord, stage: nextStage };
        if (nextStage === "3_WAREHOUSE_FULFILLED" && !ord.dispatchedAt) {
          updated.dispatchedAt = "Just now (-18°C Truck Dispatched)";
        }
        if (nextStage === "4_TAX_INVOICE_SENT" && !ord.invoiceSentAt) {
          updated.invoiceSentAt = "Just now (GST Invoice Sent)";
        }
        if (nextStage === "5_PAYMENT_RECEIVED" || nextStage === "6_RECONCILED_CLOSED") {
          updated.paymentStatus = "PAID";
          if (!ord.paidAt) updated.paidAt = "Just now";
        }
        return updated;
      })
    );

    showToast(`Order status updated in Order-to-Cash Pipeline!`);
  };

  const markOrderPaid = (orderId: string, method: OrderPaymentMethod) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderId === orderId
          ? {
              ...ord,
              paymentMethod: method,
              paymentStatus: "PAID",
              stage: "6_RECONCILED_CLOSED",
              paidAt: "Just now",
            }
          : ord
      )
    );
    showToast(
      `Payment received via ${method.toUpperCase()}! Order reconciled & closed.`
    );
  };

  // CART ACTIONS
  const addToCart = (
    product: Product,
    quantity = 1,
    customNotes = ""
  ) => {
    const currentStock = stockMap[product.id] ?? product.stockQuantity;
    if (currentStock <= 0) {
      showToast(`Out of Stock in Mayur Vihar Warehouse: "${product.name}"`);
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > currentStock) {
          showToast(`Cannot add ${newQty} units. Only ${currentStock} cases available in Warehouse!`);
          updated[existingIndex].quantity = currentStock;
        } else {
          updated[existingIndex].quantity = newQty;
        }
        return updated;
      }
      return [...prev, { product, quantity, customNotes }];
    });
    showToast(`Added "${product.name}" to Retail Cart (${currentStock} Cases In Stock)`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const currentStock = stockMap[productId] ?? 100;
    if (quantity > currentStock) {
      showToast(`Warehouse running stock limit reached (${currentStock} Cases available)`);
      quantity = currentStock;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // RFQ ACTIONS
  const addToRFQ = (
    product: Product,
    quantity = 1,
    customNotes = ""
  ) => {
    setRfqItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, customNotes }];
    });
    showToast(`Added "${product.name}" to B2B RFQ Wholesale Basket`);
  };

  const removeFromRFQ = (productId: string) => {
    setRfqItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateRFQQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromRFQ(productId);
      return;
    }
    setRfqItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearRFQ = () => setRfqItems([]);

  const loadTurnkeyPackageToRFQ = (config: TurnkeyConfig) => {
    const productsToLoad = PRODUCTS_CATALOG.filter((p) =>
      config.recommendedProductIds.includes(p.id)
    );

    setRfqItems((prev) => {
      const newItems = [...prev];
      productsToLoad.forEach((product) => {
        const idx = newItems.findIndex(
          (item) => item.product.id === product.id
        );
        if (idx === -1) {
          newItems.push({
            product,
            quantity: 1,
            customNotes: `Turnkey Package: ${config.title}`,
          });
        }
      });
      return newItems;
    });

    showToast(`Loaded ${productsToLoad.length} equipment items from "${config.title}" into RFQ Basket!`);
  };

  // COMPARE ACTIONS
  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Spec Compare`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast("Maximum 4 products allowed for Technical Spec Comparison");
        return prev;
      }
      showToast(`Added "${product.name}" to Brand Spec Compare (${prev.length + 1}/4)`);
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  return (
    <AppContext.Provider
      value={{
        products,
        stockMap,
        restockProduct,
        deductOrderStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        rfqItems,
        addToRFQ,
        removeFromRFQ,
        updateRFQQuantity,
        clearRFQ,
        isRFQOpen,
        setIsRFQOpen,
        loadTurnkeyPackageToRFQ,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        theme,
        toggleTheme,
        quickViewProduct,
        setQuickViewProduct,
        isInventoryModalOpen,
        setIsInventoryModalOpen,
        orders,
        createCustomerOrder,
        advanceOrderStage,
        markOrderPaid,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
