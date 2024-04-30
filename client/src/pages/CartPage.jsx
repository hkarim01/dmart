import React from 'react'
import { useCart } from '../utils/context/CartContext'
import { useAuth } from '../utils/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../utils/dmart-api'
import toast from 'react-hot-toast'
import { deleteItemFromLocal } from '../utils/local-storage-utils'

const CartPage = () => {
  const { auth } = useAuth()
  const { cart, removeCartItem, totalPrice } = useCart()
  const navigate = useNavigate()

  const amountInUSDString = () =>
    totalPrice().toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  const handleCheckout = async () => {
    try {
      const orderProducts = cart.reduce((ids, product) => {
        ids.push(product._id)
        return ids
      }, [])

      const orderData = {
        products: orderProducts,
        buyer: auth?.user?._id,
        amount: totalPrice(),
      }

      const response = await createOrder(orderData)

      if (response?.data?.success) {
        deleteItemFromLocal('cart')
        navigate(
          `/dashboard/checkout/payment-details/${response.data.order?._id}`
        )
      } else {
        toast.error('Error creating the order, please try again')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center bg-light p-2 mb-1'>
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className='text-center'>
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? '' : 'please login to checkout'
                }`
              : ' Your Cart Is Empty'}
          </h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          {cart?.map((p, index) => (
            <div
              key={`${index}_${p._id}`}
              className='row mb-2 p-3 card flex-row'
            >
              <div className='col-md-4'>
                <img
                  src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                  width='100px'
                  height={'100px'}
                />
              </div>
              <div className='col-md-8'>
                <p>{p.name}</p>
                <p>{p.description.substring(0, 30)}</p>
                <p>Price : {p.price}</p>
                <button
                  className='btn btn-danger'
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='col-md-4 text-center'>
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {amountInUSDString()} </h4>
          {auth?.user?.address ? (
            <>
              <div className='mb-3'>
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className='btn btn-outline-warning'
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
                <button
                  className='btn btn-outline-warning'
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                {/* <Link to={'/dashboard/checkout/payment-details'}>Checkout</Link> */}
              </div>
            </>
          ) : (
            <div className='mb-3'>
              {auth?.token ? (
                <button
                  className='btn btn-outline-warning'
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className='btn btn-outline-warning'
                  onClick={() =>
                    navigate('/login', {
                      state: '/cart',
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
