import AdminNav from '@/components/AdminNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ARC-Shop Admin',
  description: 'Admin Dashboard',
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <AdminNav />
      <div>{children}</div>
    </div>
  )
}

export default AdminLayout
