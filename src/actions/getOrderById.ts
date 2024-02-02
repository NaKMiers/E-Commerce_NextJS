import prisma from '@/libs/prismadb'

export default async function getOrderById(id?: string) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  } catch (err: any) {
    throw new Error(err)
  }
}
