'use client'

import ActionBtn from '@/components/ActionBtn'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import firebaseApp from '@/libs/firebase'
import { formatPrice } from '@/utils/formatPrice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Product } from '@prisma/client'
import axios from 'axios'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md'

interface ManageProductsClientProps {
  products: Product[]
}

function ManageProductsClient({ products }: ManageProductsClientProps) {
  const router = useRouter()
  const storage = getStorage(firebaseApp)

  const [togglingStock, setTogglingStock] = useState<string[]>([])

  // create colums for the data grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: params => <div className='font-bold text-slate-800'>{params.row.price}</div>,
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 120,
      renderCell: ({ row }) => (
        <div>
          {row.inStock ? (
            <Status text='in stock' icon={MdDone} background='bg-teal-200' color='text-teal-700' />
          ) : (
            <Status text='out of stock' icon={MdClose} background='bg-rose-200' color='text-rose-700' />
          )}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: ({ row }) => (
        <div className='flex justify-center gap-4 w-full'>
          <ActionBtn
            icon={MdCached}
            isToggling={togglingStock.includes(row.id)}
            onClick={() => handleToggleStock(row.id, row.inStock)}
          />
          <ActionBtn icon={MdDelete} onClick={() => handleDeleteProduct(row.id, row.images)} />
          <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/product/${row.id}`)} />
        </div>
      ),
    },
    { field: 'images', headerName: 'Images', width: 100 },
  ]

  // create rows for the data grid
  let rows: any = []

  // attach the products to the rows
  if (products) {
    rows = products.map(product => ({
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
    }))
  }

  // handle toggle stock
  const handleToggleStock = useCallback(
    async (id: string, inStock: boolean) => {
      setTogglingStock(prev => [...prev, id])

      try {
        const res = await axios.put('/api/product', { id, inStock: !inStock })
        console.log('res: ', res.data)
        toast.success('Stock Toggled')
        router.refresh()
      } catch (err: any) {
        toast.error('Toggle Stock Error')
        console.log(err)
      } finally {
        setTogglingStock(prev => prev.filter(item => item !== id))
      }
    },
    [router]
  )

  const handleDeleteProduct = useCallback(
    async (id: string, images: any[]) => {
      toast('Deleting product, please wait...', {
        icon: '🗑️',
        duration: 3000,
      })

      try {
        // delete images from storage
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image)

            await deleteObject(imageRef)
            console.log('Image Deleted: ', item.image)
          }
        }

        // delete product from database
        const res = await axios.delete(`/api/product/${id}`)
        console.log('res: ', res.data)
        toast.success('Product Deleted')
        router.refresh()
      } catch (err: any) {
        console.log(err)
        toast.error('Delete Product Error')
      }
    },
    [storage, router]
  )

  return (
    <div>
      <div className='mb-4 max-w-[1150px] m-auto text-xl'>
        <Heading title='Manage Products' center />
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

export default ManageProductsClient
