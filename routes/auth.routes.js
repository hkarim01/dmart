import express from 'express'
import {
  registerController,
  loginController,
  userAuthController,
  forgotPasswordController,
  updateProfileController,
} from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post(
  '/register',
  [
    body('name').isLength({ min: 3, max: 50 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 30 }),
    body('phone').isLength({ min: 11, max: 12 }),
    body('address').notEmpty(),
    body('answer').notEmpty(),
  ],
  registerController
)

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 8, max: 30 })],
  loginController
)

router.post(
  '/forgot-password',
  [
    body('email').isEmail(),
    body('answer').notEmpty(),
    body('newPassword').isLength({ min: 8, max: 30 }),
  ],
  forgotPasswordController
)

router.get('/user-auth', requireSignIn, userAuthController)

router.get('/admin-auth', requireSignIn, isAdmin, userAuthController)

router.put('/profile', requireSignIn, updateProfileController)

export default router
