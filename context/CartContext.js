"use client"
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function safeLocalStorageGet(key){
  try{
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }catch(e){
    return null
  }
}

function safeLocalStorageSet(key, value){
  try{
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  }catch(e){
    // ignore storage errors
  }
}

export function CartProvider({ children }){
  const [items, setItems] = useState([])

  useEffect(()=>{
    const raw = safeLocalStorageGet('cart')
    if (raw){
      try{ setItems(JSON.parse(raw)) }catch(e){ setItems([]) }
    }
  },[])

  useEffect(()=>{
    safeLocalStorageSet('cart', JSON.stringify(items))
  },[items])

  function addItem(product, qty=1){
    setItems(prev=>{
      const found = prev.find(i=> i.product.id===product.id)
      if (found) return prev.map(i=> i.product.id===product.id ? {...i, quantity: i.quantity+qty } : i)
      return [...prev, { product, quantity: qty }]
    })
  }

  function remove(id){ setItems(prev=> prev.filter(i=> i.product.id!==id)) }
  function increase(id){ setItems(prev=> prev.map(i=> i.product.id===id? {...i, quantity: i.quantity+1}:i)) }
  function decrease(id){ setItems(prev=> prev.map(i=> i.product.id===id? {...i, quantity: Math.max(1,i.quantity-1)}:i)) }
  function clear(){ setItems([]) }

  const total = useMemo(()=> items.reduce((s,i)=> s + ((i.product.price||0) * (1 - (i.product.discount||0)/100)) * (i.quantity||0), 0), [items])

  const value = useMemo(()=> ({ items, addItem, remove, increase, decrease, clear, total }), [items, total])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
