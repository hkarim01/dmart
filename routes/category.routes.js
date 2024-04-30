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

router.get('/:slug?', categoriesController)

export default router
