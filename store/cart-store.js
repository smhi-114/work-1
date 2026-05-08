import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function getProduct(cartItem) {
  return cartItem?.product ?? cartItem;
}

function normalizeCartItem(cartItem) {
  const product = getProduct(cartItem);

  if (!product?.id) return null;

  return {
    product,
    quantity: Math.max(1, Number(cartItem?.quantity ?? 1) || 1),
  };
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map(normalizeCartItem)
    .filter(Boolean)
    .reduce((cartItems, item) => {
      const existing = cartItems.find((cartItem) => cartItem.product.id === item.product.id);

      if (existing) {
        existing.quantity += item.quantity;
        return cartItems;
      }

      return [...cartItems, item];
    }, []);
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const item = normalizeCartItem({ product, quantity: qty });

        if (!item) return;

        set((state) => {
          const items = normalizeCartItems(state.items);
          const existing = items.find((cartItem) => cartItem.product.id === item.product.id);

          if (existing) {
            return {
              items: items.map((cartItem) =>
                cartItem.product.id === item.product.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          }

          return { items: [...items, item] };
        });
      },

      increase: (id) => {
        set((state) => ({
          items: normalizeCartItems(state.items).map((item) =>
            item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrease: (id) => {
        set((state) => ({
          items: normalizeCartItems(state.items).map((item) =>
            item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          ),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: normalizeCartItems(state.items).filter((item) => item.product.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        items: normalizeCartItems(persistedState?.items),
      }),
    }
  )
);
