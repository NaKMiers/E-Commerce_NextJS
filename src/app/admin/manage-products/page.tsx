import { getCurrentUser } from '@/actions/getCurrentUser'
import getProducts from '@/actions/getProducts'
import Container from '@/components/Container'
import { redirect } from 'next/navigation'
import ManageProductsClient from './ManageProductsClient'

async function ManageProducts() {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if (currentUser?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='p-8'>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  )
}

export default ManageProducts
