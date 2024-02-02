import { formatPrice } from '@/utils/formatPrice'
import { truncateText } from '@/utils/truncateText'
import { CartProductType } from '@prisma/client'
import Image from 'next/image'

interface OrderItemProps {
  item: CartProductType
}

function OrderItem({ item }: OrderItemProps) {
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
        <div className='relative w-[70px] aspect-square'>
          <Image src={item.selectedType.image} alt={item.name} fill className='object-contain' />
        </div>

        <div className='flex flex-col gap-1'>
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedType.color}</div>
        </div>
      </div>

      <div className='justify-self-center'>{formatPrice(item.price)}</div>
      <div className='justify-self-center'>{item.quantity}</div>
      <div className='justify-self-end font-semibold'>{formatPrice(item.price * item.quantity)}</div>
    </div>
  )
}

export default OrderItem
