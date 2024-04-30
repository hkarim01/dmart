import { useState, useContext, createContext, useEffect } from 'react'
import { fetchItemFromLocal, setItemInLocal } from '../local-storage-utils'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    let existingCartItem = fetchItemFromLocal('cart')
    if (existingCartItem) setCart(existingCartItem)
  }, [])

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      setItemInLocal('cart', myCart)
    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice = () => {
    try {
      const total = cart?.reduce((sum, item) => {
        return sum + item.price
      }, 0)

      return total
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, removeCartItem, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
