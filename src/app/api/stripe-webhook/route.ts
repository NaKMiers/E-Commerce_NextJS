// pages/api/webhook.js
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import prisma from '@/libs/prismadb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  console.log('STARTING WEBHOOK')

  // const buff = await buffer(req) -> this
  const buff = await req.text()
  // const sig = req.headers['stripe-signature'] -> this
  const sig = headers().get('Stripe-Signature') as string

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buff, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error Signature ${error.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'charge.succeeded': {
      const charge: any = event.data.object as Stripe.Charge

      if (typeof charge.payment_intent === 'string') {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: 'complete',
            address: {
              set: {
                country: charge.shipping?.address?.country,
                city: charge.shipping?.address?.city,
                state: charge.shipping?.address?.state,
                postalCode: charge.shipping?.address?.postal_code,
                line1: charge.shipping?.address?.line1,
                line2: charge.shipping?.address?.line1,
              },
            },
          },
        })
      }
      break
    }

    default: {
      console.log('Unhandled event type: ' + event.type)
    }
  }

  return NextResponse.json({ received: true })
}
