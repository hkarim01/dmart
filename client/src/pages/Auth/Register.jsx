import React from 'react'
import SEOHeader from '../../components/layout/SEOHeader'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerUser } from '../../utils/dmart-api'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleRegistration = handleSubmit(async (data) => {
    try {
      const res = await registerUser(data)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  })

  return (
    <div className='register'>
      <SEOHeader title={'Register - dMart'} />
      <form onSubmit={handleRegistration}>
        <div className='mb-3'>
          <label htmlFor='inputName' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputName'
            {...register('name', {
              required: 'Please enter your name.',
            })}
          />
          <p className='input-error'>{errors?.name?.message}</p>
        </div>
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
          <label htmlFor='inputPassword' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='inputPassword'
            {...register('password', {
              required: 'Please enter your password.',
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
          <label htmlFor='inputPhone' className='form-label'>
            Phone
          </label>
          <input
            type='text'
            className='form-control'
            id='inputPhone'
            {...register('phone', {
              required: 'Please enter your phone.',
            })}
          />
          <p className='input-error'>{errors?.phone?.message}</p>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAddress' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAddress'
            {...register('address', {
              required: 'Please enter your address.',
            })}
          />
          <p className='input-error'>{errors?.address?.message}</p>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAnswer' className='form-label'>
            What's your favorite sports?
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
