import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

async function Register() {
  // get logined in user
  const currentUser = await getCurrentUser()

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  )
}

export default Register
