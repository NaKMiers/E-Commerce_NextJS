import prisma from '@/libs/prismadb'

export default async function getProductById(id?: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return product
  } catch (err: any) {
    throw new Error(err)
  }
}
