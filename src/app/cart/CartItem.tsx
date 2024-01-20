import SetQuantity from '@/components/SetQuantity'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import { truncateText } from '@/utils/truncateText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CartItemProps {
  item: any
}

function CartItem({ item }: CartItemProps) {
  const { handleRemoveProductFromCart, handleCartQuantityChange } = useCart()

  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
        <Link href={`product/${item.id}`}>
          <div className='relative w-[70px] aspect-square'>
            <Image src={item.selectedType.image} alt={item.name} fill className='object-contain' />
          </div>
        </Link>

        <div className='flex flex-col justify-between'>
          <Link href={`product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedType.color}</div>
          <div className='w-[70px]'>
            <button
              className='text-slate-500 underline'
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className='justify-self-center'>{formatPrice(item.price)}</div>
      <div className='justify-self-center'>
        <SetQuantity
          cartProduct={item}
          handleQuantityChange={value => handleCartQuantityChange(item, value)}
        />
      </div>
      <div className='justify-self-end font-semibold'>
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default CartItem
