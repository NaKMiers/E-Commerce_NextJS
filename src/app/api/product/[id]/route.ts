import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import { getCurrentUser } from '@/actions/getCurrentUser'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role != 'admin') {
    return NextResponse.error()
  }

  const product = await prisma.product.delete({
    where: { id: params.id },
  })

  return NextResponse.json(product)
}
