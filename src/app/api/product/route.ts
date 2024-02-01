import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role != 'admin') {
    return NextResponse.error()
  }

  // get data from request body
  const { name, description, price, brand, category, inStock, images } = await req.json()

  // create product
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  })

  return NextResponse.json(product)
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role != 'admin') {
    return NextResponse.error()
  }

  // get data from request body
  const { id, inStock } = await req.json()

  const product = await prisma.product.update({
    where: { id },
    data: { inStock },
  })

  return NextResponse.json(product)
}
