'use client'

import { categories } from '@/utils/categories'
import Container from './Container'
import Category from './Category'
import { usePathname, useSearchParams } from 'next/navigation'

function Categories() {
  const params = useSearchParams()
  const pathname = usePathname()
  const category = params.get('category')

  return (
    pathname === '/' && (
      <div className='bg-white'>
        <Container>
          <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
            {categories.map(item => (
              <Category
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label || (!category && item.label === 'All')}
              />
            ))}
          </div>
        </Container>
      </div>
    )
  )
}

export default Categories
