import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    paymentId: { type: String },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: 'payment pending',
      enum: [
        'payment pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ],
    },
  },
  { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
