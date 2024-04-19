import express from 'express'
import {
  createProductController,
  updateProductController,
  deleteProductController,
  productPhotoController,
  productsController,
} from '../controllers/product.controller.js'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js'
import { body } from 'express-validator'
import { mutlerPhotoUpload } from '../middlewares/mutler.middleware.js'

const router = express.Router()

router.get('/:slug?', productsController)

router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  mutlerPhotoUpload,
  [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty(),
    body('category').notEmpty(),
    body('quantity').notEmpty(),
  ],
  createProductController
)

router.put(
  '/update-product/:pid',
  requireSignIn,
  isAdmin,
  mutlerPhotoUpload,
  [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty(),
    body('category').notEmpty(),
    body('quantity').notEmpty(),
  ],
  updateProductController
)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', deleteProductController)

export default router
