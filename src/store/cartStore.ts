"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Coupon, CartTotals } from "@/types/cart";
import { Product, PackOption } from "@/types/product";
import { SITE_CONFIG } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  coupon: Coupon | null;
  toastMessage: string | null;
  
  // Actions
  addItem: (product: Product, packOption: PackOption, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearToast: () => void;
  
  // Computed Getters
  getTotals: () => CartTotals;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      coupon: null,
      toastMessage: null,

      addItem: (product: Product, packOption: PackOption, quantity = 1) => {
        const itemId = `${product.id}-${packOption.size}`;
        const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return {
              items: updatedItems,
              isDrawerOpen: true,
              toastMessage: `Updated quantity for ${product.name} (${packOption.size})`,
            };
          }

          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            productSlug: product.slug,
            categorySlug: product.categorySlug,
            name: product.name,
            image: primaryImage.url,
            packOption,
            quantity,
          };

          return {
            items: [...state.items, newItem],
            isDrawerOpen: true,
            toastMessage: `Added ${product.name} (${packOption.size}) to cart!`,
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== itemId),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      setDrawerOpen: (isOpen: boolean) => {
        set({ isDrawerOpen: isOpen });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = SITE_CONFIG.coupons.find((c) => c.code === cleanCode);

        if (!found) {
          return { success: false, message: "Invalid coupon code. Try 'GUJARAT10' or 'FREESHIP'" };
        }

        const subtotal = get().items.reduce(
          (sum, item) => sum + item.packOption.price * item.quantity,
          0
        );

        if (found.minOrderValue && subtotal < found.minOrderValue) {
          return {
            success: false,
            message: `Minimum order value for ${found.code} is ₹${found.minOrderValue} (Current: ₹${subtotal})`,
          };
        }

        set({ coupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      clearToast: () => {
        set({ toastMessage: null });
      },

      getTotals: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.packOption.price * item.quantity,
          0
        );

        let discount = 0;
        if (coupon && subtotal >= (coupon.minOrderValue || 0)) {
          if (coupon.discountType === "percentage") {
            discount = Math.round((subtotal * coupon.value) / 100);
          } else if (coupon.discountType === "fixed") {
            discount = coupon.value;
          }
        }

        const freeShippingThreshold = SITE_CONFIG.shipping.freeShippingThreshold;
        const isFreeShipCoupon = coupon?.code === "FREESHIP";
        const isEligibleForFreeShipping = subtotal >= freeShippingThreshold || isFreeShipCoupon;
        
        const shipping = subtotal === 0 ? 0 : isEligibleForFreeShipping ? 0 : SITE_CONFIG.shipping.standardShippingFee;
        const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
        const total = Math.max(0, subtotal - discount + shipping);

        return {
          subtotal,
          discount,
          shipping,
          freeShippingThreshold,
          amountNeededForFreeShipping,
          total,
        };
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "lajjas_foods_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);
