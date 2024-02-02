'use client'

import ActionBtn from '@/components/ActionBtn'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import firebaseApp from '@/libs/firebase'
import { formatPrice } from '@/utils/formatPrice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Order, User } from '@prisma/client'
import axios from 'axios'
import { getStorage } from 'firebase/storage'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'

type ExtendedOrder = Order & {
  user: User
}

interface ManageOrdersClientProps {
  orders: ExtendedOrder[]
}

function ManageOrdersClient({ orders }: ManageOrdersClientProps) {
  const router = useRouter()
  const storage = getStorage(firebaseApp)

  const [togglingStock, setTogglingStock] = useState<string[]>([])

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
            <Status text='Delivered' icon={MdDone} background='bg-green-200' color='text-green-700' />
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
        <div className='flex justify-center gap-4 w-full'>
          <ActionBtn icon={MdDeliveryDining} onClick={() => handleDispatch(row.id)} />
          <ActionBtn icon={MdDone} onClick={() => handleDeliver(row.id)} />
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

  // handle dispatch
  const handleDispatch = useCallback(
    async (id: string) => {
      try {
        const res = await axios.put(`/api/order`, { id, deliveryStatus: 'dispatched' })
        console.log('res: ', res.data)

        toast.success('Ordere Dispatched')
        router.refresh()
      } catch (err: any) {
        console.log(err)
        toast.error('Ordere Dispatch Error')
      }
    },
    [router]
  )

  // handle deliver
  const handleDeliver = useCallback(
    async (id: string) => {
      try {
        const res = await axios.put(`/api/order`, { id, deliveryStatus: 'delivered' })
        console.log('res: ', res.data)

        toast.success('Ordere Delivered')
        router.refresh()
      } catch (err: any) {
        console.log(err)
        toast.error('Ordere Deliver Error')
      }
    },
    [router]
  )

  return (
    <div>
      <div className='mb-4 max-w-[1150px] m-auto text-xl'>
        <Heading title='Manage Orders' center />
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

export default ManageOrdersClient
