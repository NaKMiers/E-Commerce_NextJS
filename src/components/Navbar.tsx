import Container from '@/components/Container'
import Link from 'next/link'
import { Redressed } from 'next/font/google'
import CartCount from './CartCount'
import UserMenu from './UserMenu'
import { getCurrentUser } from '@/actions/getCurrentUser'

const dedressed = Redressed({ subsets: ['latin'], weight: ['400'] })

async function Navbar() {
  const currentUser = await getCurrentUser()
  console.log(123123)
  console.log(currentUser)

  return (
    <div className='sticky top-0 w0full bg-slate-200 z-30 shodow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md-gap-0'>
            <Link href='/' className={`${dedressed.className}} font-bold text-2xl`}>
              ARC Shop
            </Link>
            <div className='hidden md:block'>Search</div>
            <div className='flex items-center gap-8 md:gp'>
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
