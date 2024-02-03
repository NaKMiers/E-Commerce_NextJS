import { getCurrentUser } from '@/actions/getCurrentUser'
import getOrders from '@/actions/getOrders'
import Container from '@/components/Container'
import { redirect } from 'next/navigation'
import ManageOrdersClient from './ManageOrdersClient'

async function ManageOrders() {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if (currentUser?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='p-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  )
}

export default ManageOrders
