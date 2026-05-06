import create from 'zustand'

// Minimal cart store with similar API to previous Context
export const useCartStore = create(set => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (product, qty = 1) => set(state => {
    const found = state.items.find(i => i.product.id === product.id)
    if (found) return { items: state.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i) }
    return { items: [...state.items, { product, quantity: qty }] }
  }),
  removeItem: (id) => set(state => ({ items: state.items.filter(i => i.product.id !== id) })),
  increase: (id) => set(state => ({ items: state.items.map(i => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i) })),
  decrease: (id) => set(state => ({ items: state.items.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i) })),
  clear: () => set({ items: [] }),
  subtotal: (state) => state.items.reduce((s, i) => s + ((i.product.price || 0) * (1 - (i.product.discount || 0) / 100)) * (i.quantity || 0), 0)
}))

// Persist to localStorage (simple, client-only)
if (typeof window !== 'undefined') {
  const localKey = 'cart'
  const stored = localStorage.getItem(localKey)
  if (stored) {
    try { useCartStore.setState({ items: JSON.parse(stored) }) } catch(e){}
  }
  useCartStore.subscribe(state => {
    try{ localStorage.setItem(localKey, JSON.stringify(state.items)) }catch(e){}
  })
}
