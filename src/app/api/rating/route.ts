import { getCurrentUser } from '@/actions/getCurrentUser'
import { Order, Review } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const { comment, rating, product, userId } = body
  console.log('body: ', body)

  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }

    // only allow user to review if the order is delivered
    const deliveredOrder = currentUser?.orders.some((order: Order) =>
      order.products.find(item => item.id === product.id && order.deliveryStatus === 'delivered')
    )

    // check if user already reviewed the product
    const userReview = product?.reviews.find((review: Review) => review.userId === currentUser.id)

    console.log('deliveredOrder: ', deliveredOrder)
    console.log('userReview: ', userReview)

    if (!deliveredOrder || userReview) {
      return NextResponse.error()
    }

    const reivew = await prisma?.review.create({
      data: {
        comment,
        rating,
        productId: product.id,
        userId,
      },
    })

    return NextResponse.json(reivew)
  } catch (err: any) {
    throw new Error(err.message)
  }
}
