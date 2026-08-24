import { CartItem } from "./cart";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "cod" | "upi" | "card" | "netbanking";
  paymentStatus: "paid" | "pending" | "failed";
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status: "confirmed" | "preparing" | "dispatched" | "delivered" | "cancelled";
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
  createdAt: string;
}
