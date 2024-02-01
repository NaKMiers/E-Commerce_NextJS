import Container from '@/components/Container'
import ManageOrdersClient from './ManageOrdersClient'
import getOrders from '@/actions/getOrders'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

async function ManageOrders() {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  return currentUser && currentUser.role === 'admin' ? (
    <div className='p-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  ) : (
    <NullData title='Access Denied!' />
  )
}

export default ManageOrders
