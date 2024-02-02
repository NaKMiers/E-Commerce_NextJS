'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import { SafeUser } from '@/types'
import { Rating } from '@mui/material'
import { Order, Product, Review } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AddRatingProps {
  product: Product & {
    reviews: Review[]
  }
  currentUser:
    | (SafeUser & {
        orders: Order[]
      })
    | null
}

function AddRating({ product, currentUser }: AddRatingProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
  })

  // set custom value
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)

    if (data.rating === 0) {
      return toast.error('Please rate the product.')
    }

    const ratingData = { ...data, userId: currentUser?.id, product: product }

    try {
      const res = await axios.post('/api/rating', ratingData)
      console.log('res: ', res.data)

      toast.success('Product rated successfully.')
      router.refresh()
      reset()
    } catch (err: any) {
      console.log(err)
      toast.error('Failed to rate the product.')
    } finally {
      setIsLoading(false)
    }
  }

  // only allow to rate if the product is delivered
  const deliveredOrder = currentUser?.orders.some((order: Order) =>
    order.products.find(item => item.id === product.id && order.deliveryStatus === 'delivered')
  )

  // check if the user has already rated the product
  const userReview = product?.reviews.find((review: Review) => review.userId === currentUser?.id)

  return (
    deliveredOrder &&
    !userReview && (
      <div className='flex flex-col gap-2 max-w-[500px]'>
        <Heading title='Rate this product' />
        <Rating
          onChange={(_, newValue) => {
            setCustomValue('rating', newValue)
          }}
        />
        <Input
          id='comment'
          label='Comment'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button label={isLoading ? 'Loading...' : 'Rate Product'} onClick={handleSubmit(onSubmit)} />
      </div>
    )
  )
}

export default AddRating
