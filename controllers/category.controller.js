import slugify from 'slugify'
import Category from '../models/category.model.js'
import { validationResult } from 'express-validator'

export const categoriesController = async (req, res) => {
  try {
    let categories = []
    const { slug } = req.params

    if (slug) {
      categories = await Category.findOne({ slug })
    } else {
      categories = await Category.find()
    }

    if (!categories) {
      return res
        .status(200)
        .send({ success: true, message: 'No category found' })
    }

    return res
      .status(200)
      .send({ success: true, message: 'All Categories list', categories })
  } catch (error) {
    console.log(error)
    return res.status(200).send({
      success: false,
      message: 'Error in fetching categories',
      error,
    })
  }
}

export const createCategoryController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ message: 'Name is required field', errors: errors.array() })
    }

    const { name } = req.body

    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: 'Category already exist' })
    }

    const category = await new Category({ name, slug: slugify(name) }).save()
    return res
      .status(201)
      .send({ success: true, message: 'new category created', category })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in creating category',
      error,
    })
  }
}

export const updateCategoryController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ message: 'Name is required field', errors: errors.array() })
    }

    const { name } = req.body
    const { id } = req.params

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    )

    if (!category) {
      return res.status(200).send({
        success: false,
        message: 'Invalid id',
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Category updated successfully',
      category,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Error in updating category', error })
  }
}

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    await Category.findByIdAndDelete(id)
    res
      .status(200)
      .send({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Error in deleting category', error })
  }
}
