import stripe from 'stripe'
import { validationResult } from 'express-validator'
import Order from '../models/order.model.js'

export const paymentIntentController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ message: 'Missing amount', errors: errors.array() })
    }

    const { orderId } = req.body
    // console.log('orderId: ', orderId)
    const order = await Order.findById(orderId)
    if (!order) {
      return res
        .status(200)
        .send({ success: false, message: 'Invalid order id' })
    } else if (order.status !== 'payment pending') {
      return res.status(200).send({ success: true, message: 'Already paid' })
    }

    const stripeObject = stripe(process.env.STRIPE_SECRET_KEY)
    let paymentIntent
    if (order.paymentId) {
      paymentIntent = await stripeObject.paymentIntents.retrieve(
        order.paymentId
      )
    } else {
      paymentIntent = await stripeObject.paymentIntents.create({
        amount: order.amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
      })

      await Order.findByIdAndUpdate(order._id, { paymentId: paymentIntent.id })
    }

    // console.log('paymentIntent: ', paymentIntent)

    return res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error creating payment intent',
      error,
    })
  }
}
