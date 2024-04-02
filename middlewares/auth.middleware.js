import JWT from 'jsonwebtoken'
import User from '../models/user.model.js'

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({ message: 'unauthorised' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.role !== 'admin') {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized access',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({ message: 'Error: Unauthorized access' })
  }
}
