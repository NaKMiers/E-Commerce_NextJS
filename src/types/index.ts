export type SafeUser = {
  createdAt: string
  updateAt: string
  emailVerified: string | null
  id: string
  name: string | null
  email: string | null
  role: Role
  image: string | null
  hashedPassword: string | null
  updatedAt: Date
} | null

type Role = 'admin' | 'user'
