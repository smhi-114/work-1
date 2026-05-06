import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '../context/CartContext'

function TestConsumer(){
  const { items, addItem, remove, increase, decrease, clear, total } = useCart()
  return (
    <div>
      <div data-testid="count">{items.length}</div>
      <div data-testid="total">{total}</div>
      <button onClick={()=> addItem({ id: 'p1', title: 'P1', price: 10, discount: 0 }, 1)}>add</button>
      <button onClick={()=> increase('p1')}>inc</button>
      <button onClick={()=> decrease('p1')}>dec</button>
      <button onClick={()=> remove('p1')}>remove</button>
      <button onClick={()=> clear()}>clear</button>
    </div>
  )
}

describe('CartContext', ()=>{
  beforeEach(()=>{
    // clear localStorage to isolate tests
    try{ localStorage.removeItem('cart') }catch(e){}
  })

  test('adds an item to cart and calculates total', async ()=>{
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    )

    const addBtn = screen.getByText('add')
    await userEvent.click(addBtn)

    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('10')
  })

  test('increase and decrease quantity', async ()=>{
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('add'))
    await userEvent.click(screen.getByText('inc'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    // quantity increased to 2 => total 20
    expect(screen.getByTestId('total').textContent).toBe('20')

    await userEvent.click(screen.getByText('dec'))
    expect(screen.getByTestId('total').textContent).toBe('10')
  })

  test('remove and clear', async ()=>{
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('add'))
    expect(screen.getByTestId('count').textContent).toBe('1')

    await userEvent.click(screen.getByText('remove'))
    expect(screen.getByTestId('count').textContent).toBe('0')

    await userEvent.click(screen.getByText('add'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    await userEvent.click(screen.getByText('clear'))
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
