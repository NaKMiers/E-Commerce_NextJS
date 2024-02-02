'use client'

import Heading from '@/components/Heading'
import Status from '@/components/Status'
import { formatPrice } from '@/utils/formatPrice'
import { Order } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { MdAccessTimeFilled, MdDone, MdOutlineDeliveryDining } from 'react-icons/md'
import OrderItem from './OrderItem'

interface OrderDetailsProps {
  order: Order
}

function OrderDetails({ order }: OrderDetailsProps) {
  const router = useRouter()

  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
      <div className='mt-8'>
        <Heading title='Order Details' />
      </div>

      <div className=''>Order ID: {order.id}</div>

      <div className=''>
        Total Amount: <span className='font-bold'>{formatPrice(order.amount)}</span>
      </div>

      <div className='flex gap-2 items-center'>
        <div>Status: </div>
        <div>
          {order.status === 'pending' ? (
            <Status
              text='pending'
              icon={MdAccessTimeFilled}
              background='bg-slate-200'
              color='text-slate-700'
            />
          ) : (
            <Status text='completed' icon={MdDone} background='bg-green-200' color='text-green-700' />
          )}
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <div>Delivery Status: </div>
        <div>
          {order.deliveryStatus === 'pending' ? (
            <Status
              text='pending'
              icon={MdAccessTimeFilled}
              background='bg-slate-200'
              color='text-slate-700'
            />
          ) : order.deliveryStatus === 'dispatched' ? (
            <Status
              text='dispatched'
              icon={MdOutlineDeliveryDining}
              background='bg-purple-200'
              color='text-purple-700'
            />
          ) : (
            <Status text='completed' icon={MdDone} background='bg-green-200' color='text-green-700' />
          )}
        </div>
      </div>

      <div>Date: {moment(order.createdAt).fromNow()}</div>

      <div>
        <h2 className='font-semibold mt-4 mb-2'>Products ordered</h2>
        <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
          <div className='col-span-2 justify-self-start'>PRODUCT</div>
          <div className='justify-self-center'>PRICE</div>
          <div className='justify-self-center'>QUANTITY</div>
          <div className='justify-self-end'>TOTAL</div>
        </div>
        {order.products?.map(item => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default OrderDetails
