'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import CartItem from './CartItem'
import { formatPrice } from '@/utils/formatPrice'

function CartClient() {
  const { cartProducts, cartTotal, handleClearCart } = useCart()

  return cartProducts && cartProducts.length ? (
    <div>
      <Heading title='Shopping Cart' center />
      <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
        <div className='col-span-2 justify-self-start'>PRODUCT</div>
        <div className='justify-self-center'>PRICE</div>
        <div className='justify-self-center'>QUANTITY</div>
        <div className='justify-self-end'>TOTAL</div>
      </div>

      <div>
        {cartProducts?.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
        <div className='w-[90px]'>
          <Button label='Clear Cart' outline small onClick={handleClearCart} />
        </div>
        <div className='text-sm flex flex-col gap-1 items-start'>
          <div className='flex justify-between w-full text-base font-semibold'>
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <p className='text-slate-500'>Taxes & Shipping calculate at checkout</p>

          <Button label='Checkout' onClick={() => {}} />
          <Link href='/' className='flex items-center gap-1 text-slate-500 mt-2'>
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center'>
      <div className='text-2xl'>Your Cart Is Empty</div>

      <div>
        <Link href='/' className='flex items-center gap-1 text-slate-500 mt-2'>
          <MdArrowBack />
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  )
}

export default CartClient
