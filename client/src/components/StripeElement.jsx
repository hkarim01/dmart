import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { createPaymentIntent } from '../utils/dmart-api'
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function StripeElement() {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    if (location.pathname.includes('/dashboard/checkout/payment-details')) {
      createPaymentIntent(orderId).then(({ data }) => {
        if (data?.success) {
          setClientSecret(data?.clientSecret)
        } else {
          console.log(data?.message)
          toast.error(data?.message)
          navigate('/dashboard/user/orders')
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    appearance,
  }

  if (clientSecret) {
    options.clientSecret = clientSecret
  }

  return (
    <div className='w-75'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <Outlet />
        </Elements>
      )}
    </div>
  )
}
