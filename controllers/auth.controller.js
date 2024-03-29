import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../helpers/auth.helper.js'
import { validationResult } from 'express-validator'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Validation error', errors: errors.array() })
    }

    const { name, email, password, phone, address } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: 'Already registered, please Login',
      })
    }

    const hashedPassword = await hashPassword(password)

    const user = new User({
      name,
      email,
      phone,
      address,
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
        .status(400)
        .json({ message: 'Invalid credentials', errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({
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
      message: 'Login successfull',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    })
  }
}
