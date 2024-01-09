import Container from '@/components/Container'
import ProductDetails from './ProductDetails'
import { product } from '@/utils/product'

interface Params {
  id?: string
}

const Product = ({ params }: { params: Params }) => {
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  )
}

export default Product
