import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items;

    set({
      items: [...items, item],
    });
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  clearCart: () => set({ items: [] }),
}));
