import Container from '@/components/Container'
import React from 'react'
import CartClient from './CartClient'

const Cart = () => {
  return (
    <div className='pt-8'>
      <Container>
        <CartClient />
      </Container>
    </div>
  )
}

export default Cart
