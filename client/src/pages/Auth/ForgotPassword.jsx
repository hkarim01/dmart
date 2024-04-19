import React from 'react'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '../../utils/dmart-api'
import SEOHeader from '../../components/layout/SEOHeader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleForgotPassword = handleSubmit(async (data) => {
    try {
      const res = await forgotPassword(data)
      if (res.data?.success) {
        toast.success(res.data?.message)
        navigate('/login')
      } else {
        toast.error(res.data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  })

  return (
    <div className='register'>
      <SEOHeader title={'Forgot Password - dMart'} />
      <form onSubmit={handleForgotPassword}>
        <div className='mb-3'>
          <label htmlFor='inputEmail' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            {...register('email', {
              required: 'Please enter your email.',
            })}
          />
          <p className='input-error'>{errors?.email?.message}</p>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputNewPassword' className='form-label'>
            New Password
          </label>
          <input
            type='password'
            className='form-control'
            id='inputNewPassword'
            {...register('newPassword', {
              required: 'Please enter new password.',
              minLength: {
                value: 8,
                message: 'Password should be minimum 8 characters',
              },
              maxLength: {
                value: 30,
                message: 'Password should be maximum 30 characters',
              },
            })}
          />
          <p className='input-error'>{errors?.password?.message}</p>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAnswer' className='form-label'>
            What's your favorite sports
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAnswer'
            {...register('answer', {
              required: 'please answer the security question',
            })}
          />
          <p className='input-error'>{errors?.answer?.message}</p>
        </div>

        <button type='submit' className='btn btn-primary ms-2'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
