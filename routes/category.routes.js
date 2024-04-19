import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js'
import {
  categoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from '../controllers/category.controller.js'
import { body } from 'express-validator'

const router = express.Router()

router.get('/:slug?', categoriesController)

router.post(
  '/create-category',
  body('name').notEmpty(),
  requireSignIn,
  isAdmin,
  createCategoryController
)

router.put(
  '/update-category/:id',
  body('name').notEmpty(),
  requireSignIn,
  isAdmin,
  updateCategoryController
)

router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryController
)

export default router
