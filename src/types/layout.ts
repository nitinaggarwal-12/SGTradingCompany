export type BlockType =
  | "CommercialShowcaseCarousel"
  | "BrandTicker"
  | "EquipmentCatalog"
  | "ContactUsSection"
  | "AnnouncementBanner";

export interface LayoutBlock {
  id: string;
  type: BlockType;
  title: string;
  enabled: boolean;
  order: number;
  props?: Record<string, any>;
}

export type ViewportMode = "desktop" | "tablet" | "mobile";
