import { validationResult } from 'express-validator'
import Product from '../models/product.model.js'
import slugify from 'slugify'
import fs from 'fs'

export const productsController = async (req, res) => {
  try {
    const { slug } = req.params
    let products = []
    if (slug) {
      products = await Product.findOne({ slug })
        .populate('category')
        .select('-photo')
    } else {
      products = await Product.find({})
        .populate('category')
        .select('-photo')
        .limit(12)
        .sort({ createdAt: -1 })
    }

    if (!products) {
      return res.status(200).send({
        success: true,
        message: 'No product found',
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Requested products list',
      products,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Error in fetching products', error })
  }
}

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body
    const photo = req.file

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    if (!photo) {
      return res
        .status(200)
        .send({ success: false, message: 'Image is required' })
    }

    const photoData = fs.readFileSync(photo.path)
    const photoType = photo.mimetype

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      photo: {
        data: photoData,
        contentType: photoType,
      },
      slug: slugify(name),
    })

    await product.save()
    res.status(201).send({
      success: true,
      message: 'Product Created Successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Error in creating product', error })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params
    console.log('pid: ', pid)
    const { name, description, price, category, quantity, shipping } = req.body
    const photo = req.file

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    const updateData = {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      slug: slugify(name),
      ...(photo && {
        photo: {
          data: fs.readFileSync(photo.path),
          contentType: photo.mimetype,
        },
      }),
    }

    const product = await Product.findByIdAndUpdate(pid, updateData, {
      new: true,
    })

    res.status(200).send({
      success: true,
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Error in updating product', error })
  }
}

export const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select('photo')
    const { photo } = product
    if (photo.data) {
      res.set('Content-Type', photo.contentType)
      return res.status(200).send(photo.data)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in fetching product photo',
      error,
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params
    await Product.findByIdAndDelete(pid).select('-photo')
    return res
      .status(200)
      .send({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in deleting the product',
      error,
    })
  }
}
