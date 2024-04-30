import React from 'react'
import SEOHeader from '../../components/layout/SEOHeader'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../utils/dmart-api'
import { useAuth } from '../../utils/context/AuthContext'
import { setItemInLocal } from '../../utils/local-storage-utils'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth, setAuth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = handleSubmit(async (data) => {
    try {
      const res = await loginUser(data)
      if (res.data.success) {
        toast.success(res.data.message)
        setAuth({ ...auth, user: res.data.user, token: res.data.token })
        setItemInLocal('auth', res.data)
        navigate(location.state || '/')
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
      <SEOHeader title={'Login - dMart'} />
      <form onSubmit={handleLogin}>
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
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password
        </button>
        <button type='submit' className='btn btn-primary ms-2'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
