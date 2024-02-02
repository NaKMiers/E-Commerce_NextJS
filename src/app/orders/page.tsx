import Container from '@/components/Container'
import OrderClient from './OrderClient'
import getOrders from '@/actions/getOrders'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import getOrdersByUserId from '@/actions/getOrdersByUserId'

async function Orders() {
  const currentUser = await getCurrentUser()

  let orders
  if (currentUser) {
    orders = await getOrdersByUserId(currentUser.id)
  }

  return currentUser ? (
    orders ? (
      <div className='p-8'>
        <Container>
          <OrderClient orders={orders} />
        </Container>
      </div>
    ) : (
      <NullData title='No orders yet!' />
    )
  ) : (
    <NullData title='Access Denied!' />
  )
}

export default Orders
