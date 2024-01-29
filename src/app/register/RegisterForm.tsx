'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import { SafeUser } from '@/types'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineGoogle } from 'react-icons/ai'

interface ResgisterFromProps {
  currentUser: SafeUser | null
}

function RegisterForm({ currentUser }: ResgisterFromProps) {
  // Router
  const router = useRouter()

  // Form
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

  // Loading state
  const [isLoading, setIsLoading] = useState(false)

  // redirect if user is logged in
  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }, [currentUser, router])

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/auth/register', data)

      // notify user
      toast.success('Account created')

      // login user
      const callback = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (callback?.ok) {
        router.push('/')
        toast.success('Logged in')
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    } catch (err: any) {
      toast.error(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return !currentUser ? (
    <>
      <Heading title='Sign Up For ARC Shop' />

      <Button
        label='Continue With Google'
        icon={AiOutlineGoogle}
        outline
        onClick={() => signIn('google')}
      />

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

      <Button label={isLoading ? 'Loading' : 'Sign Up'} onClick={handleSubmit(onSubmit)} />

      <p className='text-sm'>
        Already have an account?{' '}
        <Link className='underline' href='/login'>
          Login
        </Link>
      </p>
    </>
  ) : (
    <p>Logined in. Redirecting...</p>
  )
}

export default RegisterForm
