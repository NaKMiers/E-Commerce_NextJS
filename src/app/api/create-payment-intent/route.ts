import { products } from './../../../utils/products'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import { CartProductType } from '@/app/product/[id]/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const calculateOrderAmount = (items: CartProductType[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  // If user is not logged in
  if (!currentUser) {
    return NextResponse.json({ error: 'You must be logged in to make a purchase' }, { status: 401 })
  }

  const body = await req.json()
  const { items, paymentIntentId } = body
  const total = calculateOrderAmount(items)

  // Update Order
  if (paymentIntentId) {
    console.log('Update Order')

    // get current payment intent
    const currentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // check whether current intent exists
    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: total,
      })

      // update order
      const [existingOrder, updatedOrder] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId },
        }),
        prisma.order.update({
          where: { paymentIntentId },
          data: {
            amount: total,
            products: items,
          },
        }),
      ])

      if (!existingOrder) {
        return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 })
      }

      return NextResponse.json({ paymentIntent: updatedIntent })
    }
  }
  // Create Order
  else {
    console.log('Create Order')

    // create stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: 'usd',
      status: 'pending',
      deliveryStatus: 'pending',
      paymentIntentId,
      products: items,
    }

    // create order
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ paymentIntent })
  }
}
