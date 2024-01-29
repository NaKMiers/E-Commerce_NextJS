'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

interface CustomerCheckboxProps {
  id: string
  label: string
  disabled?: boolean
  register: UseFormRegister<FieldValues>
}

function CustomCheckbox({ id, label, disabled = false, register }: CustomerCheckboxProps) {
  return (
    <div className='w-full flex flex-row gap-2 items-center'>
      <input
        id={id}
        placeholder=''
        disabled={disabled}
        type='checkbox'
        {...register(id)}
        className='cursor-pointer'
      />

      <label className='font-medium cursor-pointer' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default CustomCheckbox
