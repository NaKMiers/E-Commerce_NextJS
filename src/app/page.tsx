export const revalidate = 0

import getProducts, { IProductParams } from '@/actions/getProducts'
import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import NullData from '@/components/NullData'
import ProductCard from '@/components/ProductCard'

interface HomeProps {
  searchParams: IProductParams
}

async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams)

  // shuffle products
  products.sort(() => Math.random() - 0.5)

  return products.length ? (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-sm-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {products.map((product: any) => (
            <ProductCard data={product} key={product.id} />
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <NullData title='No products found. Click "All" to cleaer filters' />
  )
}

export default Home
