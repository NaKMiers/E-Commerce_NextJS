import Container from '@/components/Container'
import ManageProductsClient from './ManageProductsClient'
import getProducts from '@/actions/getProducts'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

async function ManageProducts() {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  return currentUser && currentUser.role === 'admin' ? (
    <div className='p-8'>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  ) : (
    <NullData title='Access Denied!' />
  )
}

export default ManageProducts
