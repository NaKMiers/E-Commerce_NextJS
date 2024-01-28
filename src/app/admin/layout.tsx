import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ARC-Shop Admin',
  description: 'Admin Dashboard',
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <div>Nav</div>
      <div>{children}</div>
    </div>
  )
}

export default AdminLayout
