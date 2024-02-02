'use client'

import ActionBtn from '@/components/ActionBtn'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import { formatPrice } from '@/utils/formatPrice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Order, User } from '@prisma/client'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'

type ExtendedOrder = Order & {
  user: User
}

interface OrdersClientProps {
  orders: ExtendedOrder[]
}

function OrdersClient({ orders }: OrdersClientProps) {
  const router = useRouter()

  // create colums for the data grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Customer Name', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount(USD)',
      width: 130,
      renderCell: params => <div className='font-bold text-slate-800'>{params.row.amount}</div>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: ({ row }) => (
        <div>
          {row.status === 'pending' ? (
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
      ),
    },
    {
      field: 'deliveryStatus',
      headerName: 'Deliver Status',
      width: 130,
      renderCell: ({ row }) => (
        <div>
          {row.deliveryStatus === 'pending' ? (
            <Status
              text='pending'
              icon={MdAccessTimeFilled}
              background='bg-slate-200'
              color='text-slate-700'
            />
          ) : row.deliveryStatus === 'dispatched' ? (
            <Status
              text='Dispatched'
              icon={MdDeliveryDining}
              background='bg-purple-200'
              color='text-purple-700'
            />
          ) : (
            <Status text='Delivery' icon={MdDone} background='bg-green-200' color='text-green-700' />
          )}
        </div>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 130,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: ({ row }) => (
        <div className='flex justify-start gap-4 w-full'>
          <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/order/${row.id}`)} />
        </div>
      ),
    },
  ]

  // create rows for the data grid
  let rows: any = []

  // attach the orders to the rows
  if (orders) {
    rows = orders.map(order => ({
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount / 100),
      status: order.status,
      createdAt: moment(order.createdAt).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }))
  }

  return (
    <div>
      <div className='mb-4 max-w-[1150px] m-auto text-xl'>
        <Heading title='Your Orders' center />
      </div>
      <div className='h-[600px] w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[1, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default OrdersClient
