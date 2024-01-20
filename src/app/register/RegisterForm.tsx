'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import Link from 'next/link'
import { useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)
    console.log(data)
  }

  return (
    <>
      <Heading title='Sign Up For ARC Shop' />

      <Button label='Sign Up With Google' icon={AiOutlineGoogle} outline handleClick={() => {}} />

      <hr className='bg-slate-300 w-full h-px' />

      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='text'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='email'
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />

      <Button label={isLoading ? 'Loading' : 'Sign Up'} handleClick={handleSubmit(onSubmit)} />

      <p className='text-sm'>
        Already have an account?{' '}
        <Link className='underline' href='/login'>
          Login
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
