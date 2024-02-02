'use client'

import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { FieldValues, useForm } from 'react-hook-form'

function SearchBar() {
  // router
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  })

  const onSubmit = async (data: FieldValues) => {
    if (!data.searchTerm) {
      router.push('/')
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    )

    router.push(url)
    reset()
  }

  return (
    <div className='flex items-center'>
      <input
        className='p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w080'
        type='text'
        placeholder='Search...'
        autoComplete='off'
        {...register('searchTerm')}
      />
      <button
        className='bg-slate-700 hover:opacity-70 text-white p-2 rounded-r-md'
        onClick={handleSubmit(onSubmit)}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
