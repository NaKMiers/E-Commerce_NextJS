'use client'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import { useCallback, useEffect, useState } from 'react'
import SelectImage from './SelectImage'
import Button from './Button'

interface SelectColorProps {
  item: ImageType
  isProductCreated: boolean
  addImageToState: (value: ImageType) => void
  removeImageFromState: (value: ImageType) => void
}

function SelectColor({
  item,
  isProductCreated,
  addImageToState,
  removeImageFromState,
}: SelectColorProps) {
  const [isSelected, setIsSelected] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false)
      setFile(null)
    }
  }, [isProductCreated])

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value)
      addImageToState({ ...item, image: value })
    },
    [addImageToState, item]
  )

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked)

      if (!e.target.checked) {
        setFile(null)
        removeImageFromState(item)
      }
    },
    [item, removeImageFromState]
  )

  return (
    <div className='grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2'>
      <div className='flex gap-2 items-center h-[60px]'>
        <input
          className='cursor-pointer'
          id={item.color}
          type='checkbox'
          checked={isSelected}
          onChange={handleCheck}
        />
        <label className='font-medium cursor-pointer' htmlFor={item.color}>
          {item.color}
        </label>
      </div>

      {isSelected && !file && (
        <div className='col-span-2 text-center'>
          <SelectImage item={item} handleFileChange={handleFileChange} />
        </div>
      )}

      {file && (
        <div className='flex gap-2 text-sm col-span-2 items-center justify-between'>
          <p>{file?.name}</p>
          <div className='w-[70px]'>
            <Button
              label='Cancel'
              small
              outline
              onClick={() => {
                setFile(null)
                removeImageFromState(item)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectColor
