import express from 'express'
import { requireSignIn } from '../middlewares/auth.middleware.js'
import { paymentIntentController } from '../controllers/paymentIntent.controller.js'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/create-payment-intent',
  requireSignIn,
  body('orderId').notEmpty(),
  paymentIntentController
)

export default router
