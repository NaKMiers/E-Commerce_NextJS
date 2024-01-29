import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

async function AddProducts() {
  const currentUser = await getCurrentUser()

  return currentUser && currentUser.role === 'admin' ? (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  ) : (
    <NullData title='Access Denied!' />
  )
}

export default AddProducts
