'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import queryString from 'query-string'

interface CategoryProps {
  label: string
  icon: IconType
  selected?: boolean
}

function Category({ label, icon: Icon, selected }: CategoryProps) {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if (label === 'All') {
      router.push('/')
    } else {
      let curQuery = {}

      if (params) {
        curQuery = queryString.parse(params.toString())
      }

      const updatedQuery = { ...curQuery, category: label }

      const url = queryString.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true })

      router.push(url)
    }
  }, [label, router, params])

  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'
      }`}
      onClick={handleClick}>
      <Icon size={20} />
      <div className='font-medium text-sm'></div>
    </div>
  )
}

export default Category
