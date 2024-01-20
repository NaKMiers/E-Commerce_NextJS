'use client'

import Button from '@/components/Button'
import ProductImage from '@/components/ProductImage'
import SetColor from '@/components/SetColor'
import SetQuantity from '@/components/SetQuantity'
import { useCart } from '@/hooks/useCart'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'

interface ProductDetails {
  product: any
}

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />
}

export type CartProductType = {
  id: string
  name: string
  price: number
  quantity: number
  brand: string
  description: number
  selectedType: SelectedType
}

export type SelectedType = {
  color: string
  colorCode: string
  image: string
}

const ProductDetails: React.FC<ProductDetails> = ({ product }) => {
  // cart context
  const { handleAddProductToCart, cartProducts } = useCart()
  const router = useRouter()

  const [isProductInCart, setIsProductInCart] = useState<boolean>(false)
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    brand: product.brand,
    description: product.description,
    selectedType: { ...product.images[0] },
  })

  // handle color select
  const handleColorSelect = useCallback((value: SelectedType) => {
    setCartProduct(prev => ({ ...prev, selectedType: value }))
  }, [])

  // handle quantity change
  const handleQuantityChange = useCallback(
    (value: number) => {
      const val =
        cartProduct.quantity + value <= 1
          ? 1
          : cartProduct.quantity + value > 99
          ? 99
          : cartProduct.quantity + value
      setCartProduct(prev => ({ ...prev, quantity: val }))
    },
    [cartProduct.quantity]
  )

  useEffect(() => {
    setIsProductInCart(false)

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(cartProduct => cartProduct.id === product.id)

      if (existingIndex !== -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts, product.id])

  // calculate product rating
  const productRating =
    product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
      product.reviews.length || 0

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />

      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} readOnly />
          <div className='flex items-center gap-2'>{product.reviews.length} reviews</div>
        </div>

        <Horizontal />

        <div className='text-justify'>{product.description}</div>

        <Horizontal />

        <div>
          <span className='font-semibold'>CATEGORY:</span> <span>{product.category}</span>
        </div>
        <div>
          <span className='font-semibold'>BRAND:</span> <span>{product.brand}</span>
        </div>
        <div>
          <span className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
            {product.inStock ? 'In Stock' : 'Out of stock'}
          </span>
        </div>

        <Horizontal />

        {isProductInCart ? (
          <>
            <p className='flex items-center gap-1 text-slate-500 mb-2'>
              <MdCheckCircle className='text-teal-400' size={20} />
              <span>Product added to cart</span>
            </p>
            <div className='max-w-[300px]'>
              <Button label='View Cart' handleClick={() => router.push('/cart')} />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />

            <Horizontal />

            <SetQuantity cartProduct={cartProduct} handleQuantityChange={handleQuantityChange} />

            <Horizontal />

            <div className='max-w-[300px]'>
              <Button label='Add To Cart' handleClick={() => handleAddProductToCart(cartProduct)} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
