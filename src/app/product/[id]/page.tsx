import Container from '@/components/Container'
import { products } from '@/utils/products'
import ListRating from './ListRating'
import ProductDetails from './ProductDetails'
import getProductById from '@/actions/getProductById'
import NullData from '@/components/NullData'
import AddRating from './AddRating'
import { getCurrentUser } from '@/actions/getCurrentUser'

interface Params {
  id?: string
}

async function Product({ params }: { params: Params }) {
  const currentUser = await getCurrentUser()
  const product = await getProductById(params.id)

  return product ? (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
        <div className='flex flex-col mt-20 gap-4'>
          <AddRating product={product} currentUser={currentUser} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  ) : (
    <NullData title='Product does not exist.' />
  )
}

export default Product
