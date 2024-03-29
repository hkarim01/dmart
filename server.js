import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectToDB from './config/db.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
connectToDB()

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)

app.get('', (req, res) => {
  res.status(200).json({ message: 'Hello World! welcome to dMart' })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('App started on', port)
})
