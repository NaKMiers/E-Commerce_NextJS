import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { getCurrentUser } from '@/actions/getCurrentUser'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'ARC-Shop',
  description: 'Ecommerce App From Anpha Right Choice',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />

        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
