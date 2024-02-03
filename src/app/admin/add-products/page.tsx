import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import { redirect } from 'next/navigation'

async function AddProducts() {
  const currentUser = await getCurrentUser()

  if (currentUser?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts
