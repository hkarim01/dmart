import express from 'express'
import {
  registerController,
  loginController,
} from '../controllers/auth.controller.js'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/register',
  [
    body('name').isLength({ min: 3, max: 50 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 50 }),
    body('phone').isLength({ min: 11, max: 12 }),
    body('address').notEmpty(),
  ],
  registerController
)

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 8, max: 50 })],
  loginController
)

export default router
