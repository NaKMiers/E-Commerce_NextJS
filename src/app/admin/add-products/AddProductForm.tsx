'use client'

import Button from '@/components/Button'
import CategoryInput from '@/components/CategoryInput'
import CustomCheckbox from '@/components/CustomCheckbox'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import SelectColor from '@/components/SelectColor'
import TextArea from '@/components/TextArea'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

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
  let uploadedImages: UploadedImageType[] = useMemo(() => [], [])

  // form
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

  // watch category
  const category = watch('category')

  // set custom value for form
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

  // add image to state when users select an image
  const addImageToState = useCallback((value: ImageType) => {
    setImages(prev => (!prev ? [value] : [...prev, value]))
  }, [])

  // remove image from state when user clicks on cancel button
  const removeImageToState = useCallback((value: ImageType) => {
    setImages(prev => (prev ? prev.filter(item => item.color != value.color) : prev))
  }, [])

  // handle image uploads
  const handleImageUploads = useCallback(
    async (data: any) => {
      toast('Creating product, please wait...', { icon: '🚀' })

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                snapshot => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  console.log('Upload is ' + progress + '% done')

                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused')
                      break
                    case 'running':
                      console.log('Upload is running')
                      break
                  }
                },
                error => {
                  console.log('Error uploading image', error)
                  reject(error)
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then(downloadURL => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      })
                      console.log('File available at', downloadURL)
                      resolve()
                    })
                    .catch(err => {
                      console.log('Error getting download URL', err)
                      reject(err)
                    })
                }
              )
            })
          }
        }
      } catch (err: any) {
        setIsLoading(false)
        console.log(err)
        return toast.error('Error uploading images')
      }
    },
    [uploadedImages]
  )

  // handle save product to database
  const handleSaveProduct = useCallback(async (productData: any) => {
    try {
      const res = await axios.post('/api/product', productData)
      console.log('res:', res)

      toast.success('Product created successfully')
      setIsProductCreated(true)
    } catch (err: any) {
      console.log(err)
      toast.error('Error saving product')
      setIsProductCreated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // handle submit form when user clicks on add product button
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    // 0. check if category is selected
    setIsLoading(true)

    if (!data.category) {
      setIsLoading(false)
      return toast.error('Category is not selected')
    }

    if (!data.images || !data.images.length) {
      setIsLoading(false)
      return toast.error('No selected images')
    }

    // 1. upload image to firebase
    await handleImageUploads(data)
    const productData = { ...data, images: uploadedImages }
    console.log('productData:', productData)

    // 2. save product to database
    handleSaveProduct(productData)
  }

  // set images to form when user selects images
  useEffect(() => {
    setCustomValue('images', images)
  }, [images, setCustomValue])

  // reset form when product is created
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
