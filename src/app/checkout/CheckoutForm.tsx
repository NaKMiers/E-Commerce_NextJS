'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface CheckoutFormProps {
  clientSecret: string
  handleSetPaymentSuccess: (paymentSuccess: boolean) => void
}

function CheckoutForm({ clientSecret, handleSetPaymentSuccess }: CheckoutFormProps) {
  const { cartTotal, handleClearCart, handleSetPaymentIntent } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }
    if (!clientSecret) {
      return
    }

    handleSetPaymentSuccess(false)
  }, [clientSecret, handleSetPaymentSuccess, stripe])

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    // send payment method to stripe and check if there are fail or success
    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Payment successful!')

          handleClearCart()
          handleSetPaymentSuccess(true)
          handleSetPaymentIntent(null)
        }

        setIsLoading(false)
      })
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <div className='mb-6'>
        <Heading title='Enter your details to complete checkout' />
      </div>

      <h2 className='font-semibold mt-2 mb-2'>Address Information</h2>
      <AddressElement options={{ mode: 'shipping', allowedCountries: ['US', 'KE'] }} />

      <h2 className='font-semibold mt-2 mb-2'>Payment Information</h2>
      <PaymentElement id='payment-element' options={{ layout: 'accordion' }} />

      <div className='py-4 text-center text-slate text-xl font-bold'>
        Total: {formatPrice(cartTotal)}
      </div>

      <Button
        label={isLoading ? 'Processing' : 'Pay now'}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  )
}

export default CheckoutForm
