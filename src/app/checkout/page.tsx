import FormWrap from '@/components/FormWrap'
import React from 'react'
import CheckoutClient from './CheckoutClient'
import Container from '@/components/Container'

function Checkout() {
  return (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  )
}

export default Checkout
