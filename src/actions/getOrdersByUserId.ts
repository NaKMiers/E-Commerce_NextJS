import prisma from '@/libs/prismadb'

export default async function getOrdersByUserId(userId?: string) {
  try {
    const order = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return order
  } catch (err: any) {
    throw new Error(err)
  }
}
