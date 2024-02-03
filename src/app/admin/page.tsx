import getProducts from '@/actions/getProducts'
import Summary from './Summary'
import getOrders from '@/actions/getOrders'
import { getUsers } from '@/actions/getUsers'
import Container from '@/components/Container'
import BarGraph from './BarGraph'
import getGraphData from '@/actions/getGraphData'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'

async function Admin() {
  const currentUser = await getCurrentUser()
  const products = await getProducts({ category: null })
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()

  if (currentUser?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='pt-8'>
      <Container>
        <Summary orders={orders} products={products} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px]'>
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  )
}

export default Admin
