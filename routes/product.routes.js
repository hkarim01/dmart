import express from 'express'
import {
  createProductController,
  updateProductController,
  deleteProductController,
  productPhotoController,
  productsController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
} from '../controllers/product.controller.js'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js'
import { body } from 'express-validator'
import { mutlerPhotoUpload } from '../middlewares/mutler.middleware.js'

const router = express.Router()

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

router.post('/product-filters', productFiltersController)

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

router.get('/:slug?', productsController)

router.get('/search/:keyword', searchProductController)

router.get('/related-product/:pid/:cid', realtedProductController)

router.get('/product-category/:slug', productCategoryController)

export default router
