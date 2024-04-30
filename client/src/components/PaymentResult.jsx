import { useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { confirmPayment } from '../utils/dmart-api'

const PaymentResult = () => {
  const [message, setMessage] = useState(null)
  const stripe = useStripe()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            await handleSuccess(paymentIntent.id)
            break
          case 'processing':
            toast.info('Payment processing!')
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            toast.error('method required!')
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            toast.error('something went wrong!')
            setMessage('Something went wrong.')
            break
        }
      })
  }, [stripe])

  const handleSuccess = async (paymentId) => {
    try {
      const response = await confirmPayment(paymentId)
      toast.success(response?.data?.message)
      setMessage(response?.data?.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>PaymentResult</h1>
      <p>{message}</p>
      <Link to={'/dashboard/user'}>go to dashboard</Link>
    </div>
  )
}

export default PaymentResult
