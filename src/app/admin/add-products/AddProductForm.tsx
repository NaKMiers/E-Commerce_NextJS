'use client'

import Button from '@/components/Button'
import CategoryInput from '@/components/CategoryInput'
import CustomCheckbox from '@/components/CustomCheckbox'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import SelectColor from '@/components/SelectColor'
import TextArea from '@/components/TextArea'
import { categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export type ImageType = {
  color: string
  colorCode: string
  image: File | null
}

export type UploadedImageType = {
  color: string
  colorCode: string
  image: string
}

function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
      price: '',
    },
  })

  const category = watch('category')

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    },
    [setValue]
  )

  const addImageToState = useCallback((value: ImageType) => {
    setImages(prev => (!prev ? [value] : [...prev, value]))
  }, [])

  const removeImageToState = useCallback((value: ImageType) => {
    setImages(prev => (prev ? prev.filter(item => item.color != value.color) : prev))
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log('Product Data', data)

    // upload image to firebase
    // save product to database
  }

  useEffect(() => {
    setCustomValue('images', images)
  }, [images, setCustomValue])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  return (
    <>
      <Heading title='Add Product' center />
      <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
      <Input
        id='price'
        label='Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='brand'
        label='Brand'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox id='inStock' register={register} label='This product is in stock' />

      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>Select Category</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto'>
          {categories.map(
            ctg =>
              ctg.label !== 'All' && (
                <div className='col-span' key={ctg.label}>
                  <CategoryInput
                    label={ctg.label}
                    selected={category === ctg.label}
                    icon={ctg.icon}
                    onClick={category => setCustomValue('category', category)}
                  />
                </div>
              )
          )}
        </div>
      </div>

      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>Select the available product colors and upload their images.</div>
          <div className='text-sm'>
            You must upload an image for each of the color selceted otherwise your color selection will
            be ignored.
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {colors.map(color => (
            <SelectColor
              key={color.colorCode}
              item={color}
              isProductCreated={false}
              addImageToState={addImageToState}
              removeImageFromState={removeImageToState}
            />
          ))}
        </div>
      </div>

      <Button label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
    </>
  )
}

export default AddProductForm
