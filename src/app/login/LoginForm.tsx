'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import Link from 'next/link'
import { useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
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
      <Heading title='Sign In For ARC Shop' />
      <Button label='Continue With Google' icon={AiOutlineGoogle} outline handleClick={() => {}} />
      <hr className='bg-slate-300 w-full h-px' />
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
      <Button label={isLoading ? 'Loading' : 'Login'} handleClick={handleSubmit(onSubmit)} />
      <p className='text-sm'>
        Do not have an account?{' '}
        <Link className='underline' href='/register'>
          Sign Up
        </Link>
      </p>
      X
    </>
  )
}

export default LoginForm
