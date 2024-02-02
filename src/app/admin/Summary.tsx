'use client'

import Heading from '@/components/Heading'
import { formatNumber } from '@/utils/formatNumber'
import { formatPrice } from '@/utils/formatPrice'
import { Order, Product, User } from 'prisma/prisma-client'
import { useEffect, useState } from 'react'

interface SummaryProps {
  orders: Order[]
  products: Product[]
  users: User[]
}

type SummaryData = {
  [key: string]: {
    label: string
    digit: number
  }
}

function Summary({ orders, products, users }: SummaryProps) {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    sale: {
      label: 'Total Sale',
      digit: 0,
    },
    products: {
      label: 'Total Products',
      digit: 0,
    },
    orders: {
      label: 'Total Orders',
      digit: 0,
    },
    paidOrders: {
      label: 'Paid Orders',
      digit: 0,
    },
    unpaidOrders: {
      label: 'Unpaid Orders',
      digit: 0,
    },
    users: {
      label: 'Total Users',
      digit: 0,
    },
  })

  useEffect(() => {
    setSummaryData(prev => ({
      ...prev,
      sale: {
        ...prev.sale,
        digit: orders.reduce(
          (acc, order) => (order.status === 'complete' ? acc + order.amount : acc),
          0
        ),
      },
      products: {
        ...prev.products,
        digit: products.length,
      },
      orders: {
        ...prev.orders,
        digit: orders.length,
      },
      paidOrders: {
        ...prev.paidOrders,
        digit: orders.filter(order => order.status === 'complete').length,
      },
      unpaidOrders: {
        ...prev.unpaidOrders,
        digit: orders.filter(order => order.status !== 'complete').length,
      },
      users: {
        ...prev.users,
        digit: users.length,
      },
    }))
  }, [orders, products.length, users.length])

  return (
    <div className='max-w-[1150px] m-auto'>
      <div className='mb-4 mt-8'>
        <Heading title='Stats' center />
      </div>

      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {Object.keys(summaryData).map(key => (
          <div className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition' key={key}>
            <div className='text-xl md:text-4xl font-bold'>
              {summaryData[key].label === 'Total Sale' ? (
                <>{formatPrice(summaryData[key].digit)}</>
              ) : (
                <>{formatNumber(summaryData[key].digit)}</>
              )}
            </div>
            <div>{summaryData[key].label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Summary
