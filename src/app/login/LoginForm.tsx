'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import { SafeUser } from '@/types'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillFacebook, AiOutlineGoogle, AiFillGithub, AiFillApple } from 'react-icons/ai'

interface LoginFormProps {
  currentUser: SafeUser | null
}

function LoginForm({ currentUser }: LoginFormProps) {
  // Router
  const router = useRouter()

  // Form
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

  // Loading
  const [isLoading, setIsLoading] = useState(false)

  // redirect if user is logged in
  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }, [currentUser, router])

  // Submit
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)

    try {
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
      <Heading title='Sign In For ARC Shop' />

      <Button
        label='Continue With Google'
        icon={AiOutlineGoogle}
        outline
        onClick={() => signIn('google')}
      />
      {/* <Button
        label='Continue With Facebook'
        icon={AiFillFacebook}
        outline
        onClick={() => signIn('facebook')}
      />
      <Button
        label='Continue With Apple'
        icon={AiFillApple}
        outline
        onClick={() => signIn('apple')}
      /> */}
      <Button
        label='Continue With Github'
        icon={AiFillGithub}
        outline
        onClick={() => signIn('github')}
      />

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
      <Button label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)} />
      <p className='text-sm'>
        Do not have an account?{' '}
        <Link className='underline' href='/register'>
          Sign Up
        </Link>
      </p>
    </>
  ) : (
    <p>Logined in. Redirecting...</p>
  )
}

export default LoginForm
