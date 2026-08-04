export type DistributionSegment = "HORECA Institutional" | "General Trade (GT)";

export type ProductCategory =
  | "HORECA - Frozen Foods & Fries"
  | "HORECA - Commercial Cheese & Dairy"
  | "HORECA - Sauces, Mayo & Dressings"
  | "GT - Beverages & Hydration"
  | "GT - Packaged Foods & Gourmet Snacks";

export type StorageCondition =
  | "Frozen (-18°C Cold Chain)"
  | "Chilled (2°C to 4°C)"
  | "Ambient Dry Storage";

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand:
    | "ITC Master Chef"
    | "Veeba Food Services"
    | "Britannia Cheese"
    | "Iscon Balaji Foods"
    | "Go Diced Cheese"
    | "Chatha Foods"
    | "McCain Food Service"
    | "Milkana Professional"
    | "Anoop Sattu"
    | "Ocean Water"
    | "Sleepy Owl Coffee"
    | "Loyka";
  segment: DistributionSegment;
  category: ProductCategory;
  packSize: string;
  caseMoq: string;
  priceExclGst: number;
  gstRate: number;
  b2bMinQty: number;
  b2bWholesalePrice: number;
  storageCondition: StorageCondition;
  shelfLife: string;
  inStock: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  warehouseZone: string;
  isFeatured?: boolean;
  image: string;
  badges: string[];
  description: string;
  highlights: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface RFQItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface SavedPaymentMethod {
  id: string;
  type: "card" | "upi";
  nickname: string;
  cardBrand?: "VISA" | "MASTERCARD" | "AMEX" | "RUPAY";
  maskedNumber?: string;
  cardHolder?: string;
  expiry?: string;
  upiId?: string;
  isDefault?: boolean;
}

export interface CustomerAccount {
  id: string;
  companyName: string;
  gstin: string;
  contactPerson: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  establishmentType: string;
  createdAt: string;
  savedPaymentMethods?: SavedPaymentMethod[];
}

export type OrderLifecycleStage =
  | "1_PO_PLACED"
  | "2_DISTRIBUTOR_NOTIFIED"
  | "3_WAREHOUSE_FULFILLED"
  | "4_TAX_INVOICE_SENT"
  | "5_PAYMENT_RECEIVED"
  | "6_RECONCILED_CLOSED";

export type OrderPaymentMethod =
  | "paytm_upi"
  | "credit_card"
  | "paypal"
  | "neft_rtgs";

export interface CustomerOrder {
  orderId: string;
  poNumber: string;
  invoiceNumber: string;
  customerName: string;
  customerGstin: string;
  customerPhone: string;
  customerEmail: string;
  deliveryCity: string;
  items: CartItem[];
  subtotalExclGst: number;
  gstAmount: number;
  totalAmount: number;
  stage: OrderLifecycleStage;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: "PENDING" | "PAID";
  createdAt: string;
  dispatchedAt?: string;
  invoiceSentAt?: string;
  paidAt?: string;
  notes?: string;
}

export type TurnkeyEstablishmentType =
  | "qsr-burger-chain"
  | "hotel-banquet-buffet"
  | "cloud-kitchen-delivery"
  | "supermarket-gt-distributor"
  | "cafe-beverage-chain";

export interface TurnkeyConfig {
  id: TurnkeyEstablishmentType;
  title: string;
  subtitle: string;
  recommendedCovers: string;
  estimatedSqFt: string;
  totalPowerLoadKW: string;
  lpgCylindersDay: string;
  recommendedProductIds: string[];
  layoutDescription: string;
  keyDeliverables: string[];
}

export interface CatalogFilterState {
  searchQuery: string;
  category: string;
  segment: string;
  brand: string;
  storageCondition: string;
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: "featured" | "price-asc" | "price-desc";
}
