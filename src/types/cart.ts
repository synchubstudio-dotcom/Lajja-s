import { Product, PackOption } from "./product";

export interface CartItem {
  id: string; // Composite key: `${product.id}-${packOption.size}`
  productId: string;
  productSlug: string;
  categorySlug: string;
  name: string;
  image: string;
  packOption: PackOption;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  value: number; // e.g. 10 for 10%, 100 for Rs.100 off
  minOrderValue?: number;
  description: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  total: number;
}
