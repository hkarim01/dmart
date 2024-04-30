import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js'
import {
  myOrdersController,
  orderDetailsController,
  createOrderController,
  confirmPaymentController,
  updateOrderStatusController,
  allOrdersController,
} from '../controllers/order.controller.js'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/create-order',
  requireSignIn,
  [
    body('products').notEmpty(),
    body('buyer').notEmpty(),
    body('amount').notEmpty(),
  ],
  createOrderController
)

router.put('/confirm-payment/:id', requireSignIn, confirmPaymentController)

router.get('/my-orders', requireSignIn, myOrdersController)
router.get('/order-details/:id', requireSignIn, orderDetailsController)
router.get('/all-orders', requireSignIn, isAdmin, allOrdersController)
router.put(
  '/update-status/:id',
  requireSignIn,
  isAdmin,
  body('status').notEmpty(),
  updateOrderStatusController
)

export default router
