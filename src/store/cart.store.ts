// store/cart.store.ts
import { create } from "zustand";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  addManyToCart: (products: Product[]) => void; // для Wishlist -> Cart
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

const loadFromStorage = (): CartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadFromStorage(),

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);

    let newItems: CartItem[];
    if (existing) {
      newItems = items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }

    set({ items: newItems });
    saveToStorage(newItems);
  },

  addManyToCart: (products) => {
    let newItems = [...get().items];

    products.forEach((product) => {
      const existing = newItems.find((i) => i.id === product.id);
      if (existing) {
        newItems = newItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems.push({ ...product, quantity: 1 });
      }
    });

    set({ items: newItems });
    saveToStorage(newItems);
  },

  increase: (id) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    set({ items: newItems });
    saveToStorage(newItems);
  },

  decrease: (id) => {
    const newItems = get()
      .items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    set({ items: newItems });
    saveToStorage(newItems);
  },

  remove: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({ items: newItems });
    saveToStorage(newItems);
  },

  clear: () => {
    set({ items: [] });
    localStorage.removeItem("cart");
  },

  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () =>
    get().items.reduce(
      (sum, i) => sum + i.quantity * (i.hasDiscount ? i.discountPrice : i.price),
      0
    ),
}));
