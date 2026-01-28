
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'upi', 'paypal']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
