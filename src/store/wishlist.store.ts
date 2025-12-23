import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((p) => p.id !== id) });
      },

      isInWishlist: (id) => {
        return get().items.some((p) => p.id == id);
      },
    }),
    {
      name: "wishlist-storage",  
    }
  )
);
