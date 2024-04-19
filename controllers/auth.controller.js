import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../helpers/auth.helper.js'
import { validationResult } from 'express-validator'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ message: 'Validation error', errors: errors.array() })
    }

    const { name, email, password, phone, address, answer } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already registered, please Login',
      })
    }

    const hashedPassword = await hashPassword(password)

    const user = new User({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    })

    await user.save()

    return res.status(201).send({
      success: true,
      message: 'User registered',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    })
  }
}

export const loginController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ message: 'Invalid credentials', errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'Email is not registered',
      })
    }

    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password',
      })
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.status(200).send({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    })
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    const { email, answer, newPassword } = req.body

    const user = await User.findOne({ email, answer })

    if (!user) {
      return res.status(200).send({ success: false, message: 'User not found' })
    }

    const hashed = await hashPassword(newPassword)
    await User.findByIdAndUpdate(user._id, { password: hashed })
    return res
      .status(200)
      .send({ success: true, message: 'Password reset successful' })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const userAuthController = (req, res) => {
  res.status(200).send({ ok: true })
}
