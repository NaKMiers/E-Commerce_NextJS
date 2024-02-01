'use client'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface SelectImageProps {
  item?: ImageType
  handleFileChange(value: File): void
}

function SelectImage({ item, handleFileChange }: SelectImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        handleFileChange(acceptedFiles[0])
      }
    },
    [handleFileChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'] },
  })

  return (
    <div
      className='border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center'
      {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>+ {item?.color} Image</p>}
    </div>
  )
}

export default SelectImage
