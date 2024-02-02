'use client'

import { useCart } from '@/hooks/useCart'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutForm from './CheckoutForm'
import Button from '@/components/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutClient() {
  const router = useRouter()
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post('/api/create-payment-intent', {
          items: cartProducts,
          paymentIntentId: paymentIntent,
        })

        setLoading(false)
        // router.push('/login')

        setClientSecret(res.data.paymentIntent.client_secret)
        handleSetPaymentIntent(res.data.paymentIntent.id)
      } catch (err: any) {
        console.log(err)
        setError(true)
        toast.error('Something went wrong, please try again.')
      }

      setLoading(false)
    }

    // create a payment intent as soon as the page loaded
    if (cartProducts) {
      setLoading(true)
      setError(false)

      createPaymentIntent()
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)
  }, [])

  return (
    <div className='w-full'>
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
      )}

      {loading && <div className='text-center'>Loading Checkout...</div>}

      {error && <div className='text-center text-rose-500'>Something went wrong...</div>}

      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
          <div className='text-teal-500 text-center'>Payment Success</div>
          <div className='max-w-[220px] w-full'>
            <Button label='View Your Orders' onClick={() => router.push('/orders')} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutClient
