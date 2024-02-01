import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role != 'admin') {
    return NextResponse.error()
  }

  // get data from request body
  const { id, deliveryStatus } = await req.json()

  const order = await prisma.order.update({
    where: { id },
    data: { deliveryStatus },
  })

  return NextResponse.json(order)
}
