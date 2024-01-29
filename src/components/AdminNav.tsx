'use client'

import Link from 'next/link'
import Container from './Container'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'
import AdminNavItem from './AdminNavItem'
import { usePathname } from 'next/navigation'

function AdminNav() {
  const pathname = usePathname()

  return (
    <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
      <Container>
        <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap'>
          <Link href='/admin'>
            <AdminNavItem icon={MdDashboard} label='Summary' selected={pathname === '/admin'} />
          </Link>
          <Link href='/admin/add-products'>
            <AdminNavItem
              icon={MdLibraryAdd}
              label='Add Products'
              selected={pathname === '/admin/add-products'}
            />
          </Link>
          <Link href='/admin/manage-products'>
            <AdminNavItem
              icon={MdDns}
              label='Manage Products'
              selected={pathname === '/admin/manage-products'}
            />
          </Link>
          <Link href='/admin/manage-orders'>
            <AdminNavItem
              icon={MdFormatListBulleted}
              label='Manage Orders'
              selected={pathname === '/admin/manage-orders'}
            />
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default AdminNav
