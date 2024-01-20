import Container from '@/components/Container'
import { products } from '@/utils/products'
import ListRating from './ListRating'
import ProductDetails from './ProductDetails'

interface Params {
  id?: string
}

const Product = ({ params }: { params: Params }) => {
  const product = products.find(item => item.id === params.id)

  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
        <div className='fle flex-col mt-20 gap-4'>
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Product
