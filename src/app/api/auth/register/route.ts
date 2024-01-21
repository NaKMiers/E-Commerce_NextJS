import brcypt, { genSalt } from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // get data from request body
  const { name, email, password } = await request.json()

  // check if user exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  })

  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  // hashed password
  const salt = await genSalt(10)
  const hashedPassword = await brcypt.hash(password, salt)

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
