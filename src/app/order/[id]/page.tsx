import getOrderById from '@/actions/getOrderById'
import Container from '@/components/Container'
import OrderDetails from './OrderDetails'
import NullData from '@/components/NullData'

interface Params {
  id?: string
}

async function Order({ params }: { params: Params }) {
  const order = await getOrderById(params.id)

  return order ? (
    <div className='p-8'>
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  ) : (
    <NullData title='No order' />
  )
}

export default Order
