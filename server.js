import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectToDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/category.routes.js'
import productRoutes from './routes/product.routes.js'
import checkoutRoutes from './routes/checkout.routes.js'
import orderRoutes from './routes/order.routes.js'
import cors from 'cors'

dotenv.config()
connectToDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/checkout', checkoutRoutes)
app.use('/api/v1/orders', orderRoutes)

app.get('', (req, res) => {
  res.status(200).json({ message: 'Hello World! welcome to dMart' })
})

// app.post(
//   '/api/v1/create-payment-intent',
//   requireSignIn,
//   paymentIntentController
// )

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('App started on', port)
})
