/** @format */

'use client'

import { IconType } from 'react-icons'

interface CategoryInputProps {
  selected?: boolean
  label: string
  icon: IconType
  onClick(value: string): void
}

function CategoryInput({ selected, label, icon: Icon, onClick }: CategoryInputProps) {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
        selected ? 'border-slate-500' : 'border-slate-200'
      }`}
      onClick={() => onClick(label)}>
      <Icon size={30} />
      <div className='font-medium'>{label}</div>
    </div>
  )
}

export default CategoryInput
