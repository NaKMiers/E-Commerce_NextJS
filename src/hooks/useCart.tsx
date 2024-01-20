import { CartProductType } from '@/app/product/[id]/ProductDetails'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type CartContextType = {
  cartTotalQuantity: number
  cartTotal: number
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveProductFromCart: (item: CartProductType) => void
  handleCartQuantityChange: (item: CartProductType, value: number) => void
  handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
  [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

  // add new cart item
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts(prev => {
      const updatedCart = prev ? [...prev, product] : [product]
      localStorage.setItem('arcCart', JSON.stringify(updatedCart))
      toast.success('Product added to cart')

      return updatedCart
    })
  }, [])

  // remove cart item
  const handleRemoveProductFromCart = useCallback(
    (cartItem: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(item => item.id !== cartItem.id)

        setCartProducts(filteredProducts)

        localStorage.setItem('arcCart', JSON.stringify(filteredProducts))
        toast.success(cartItem.name + ' removed')
      }
    },
    [cartProducts]
  )

  // change cart quantity
  const handleCartQuantityChange = useCallback(
    (cartItem: CartProductType, value: number) => {
      let updatedCart

      if (value >= 1 && cartItem.quantity >= 99) {
        return toast.error('Max quantity reached')
      } else if (value < 1 && cartItem.quantity <= 1) {
        return toast.error('Min quantity reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(cartProduct => cartProduct.id === cartItem.id)

        if (existingIndex != -1) {
          updatedCart[existingIndex].quantity += value
        }

        setCartProducts(updatedCart)
        localStorage.setItem('arcCart', JSON.stringify(updatedCart))
      }
    },
    [cartProducts]
  )

  // clear cart
  const handleClearCart = useCallback(() => {
    setCartProducts(null)
    setCartTotalQuantity(0)

    toast.success('Cart cleared')
    localStorage.setItem('arcCart', JSON.stringify([]))
  }, [])

  // initialize cart from local storage
  useEffect(() => {
    const cProducts: CartProductType[] | null = JSON.parse(
      localStorage.getItem('arcCart') || 'null'
    )

    setCartProducts(cProducts)
  }, [])

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, quantity } = cartProducts?.reduce(
          (acc, item) => ({
            total: acc.total + item.price * item.quantity,
            quantity: acc.quantity + item.quantity,
          }),
          { total: 0, quantity: 0 }
        )

        setCartTotalQuantity(quantity)
        setCartTotal(total)
      }
    }
    getTotals()
  }, [cartProducts])

  // use cart value
  const value = {
    cartTotalQuantity,
    cartTotal,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityChange,
    handleClearCart,
  }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider')
  }

  return context
}
