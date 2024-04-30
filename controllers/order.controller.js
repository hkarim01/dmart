import { validationResult } from 'express-validator'
import Order from '../models/order.model.js'

export const createOrderController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ message: 'Missing order data', errors: errors.array() })
    }

    const { products, buyer, amount } = req.body
    const order = new Order({ products, buyer, amount })
    await order.save()

    return res.status(201).send({
      success: true,
      message: 'Order created successfully',
      order,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in creating the order',
      error,
    })
  }
}

export const myOrdersController = async (req, res) => {
  try {
    const { _id } = req.user
    const orders = await Order.find({ buyer: _id })
      .populate('products', '-photo')
      .populate('buyer', 'name')

    return res.status(200).send({ success: true, orders })
    // console.log(_id)
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Failed to get orders',
      error,
    })
  }
}

export const allOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('products', '-photo')
      .populate('buyer', 'name')

    return res.status(200).send({ success: true, orders })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Failed load all orders',
      error,
    })
  }
}

// TODO: complete this funtionality
export const orderDetailsController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Failed to get order details',
      error,
    })
  }
}

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

    if (!order) {
      return res.status(200).send({
        success: false,
        message: 'Order not found',
      })
    }

    return res.status(200).send({
      success: true,
      order,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Failed to update order status',
      error,
    })
  }
}

export const confirmPaymentController = async (req, res) => {
  try {
    const { id } = req.params

    const order = await Order.findOneAndUpdate(
      { paymentId: id },
      { status: 'processing' },
      { new: true }
    )

    if (!order) {
      return res.status(200).send({
        success: false,
        message: 'Order not found',
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Payment confirmed',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error updating the order payment',
      error,
    })
  }
}
