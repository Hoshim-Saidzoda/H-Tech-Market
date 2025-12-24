import { create } from "zustand";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product & { selectedColor?: string }) => void;
  increase: (id: number, color?: string) => void;
  decrease: (id: number, color?: string) => void;
  remove: (id: number, color?: string) => void;
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
    const existing = items.find(
      (i) => i.id === product.id && i.selectedColor === product.selectedColor
    );

    let newItems: CartItem[];
    if (existing) {
      newItems = items.map((i) =>
        i.id === product.id && i.selectedColor === product.selectedColor
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }

    set({ items: newItems });
    saveToStorage(newItems);
  },

  increase: (id, color) => {
    const newItems = get().items.map((i) =>
      i.id === id && i.selectedColor === color
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
    set({ items: newItems });
    saveToStorage(newItems);
  },

  decrease: (id, color) => {
    const newItems = get()
      .items.map((i) =>
        i.id === id && i.selectedColor === color
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter((i) => i.quantity > 0);
    set({ items: newItems });
    saveToStorage(newItems);
  },

 remove: (id, color) => {
  const newItems = get().items.filter(
    (i) => !(i.id === id && i.selectedColor === color)
  );
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
      (sum, i) =>
        sum + i.quantity * (i.hasDiscount ? i.discountPrice : i.price),
      0
    ),
}));
