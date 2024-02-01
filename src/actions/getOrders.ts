import prisma from '@/libs/prismadb'

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return orders
  } catch (err: any) {
    throw new Error(err)
  }
}
