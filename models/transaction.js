const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  CheckoutRequestID: {
    type: String,
    required: false // Make this optional for PayPal transactions
  },
  ResultCode: {
    type: Number,
    required: false // Make this optional for PayPal transactions
  },
  ResultDesc: {
    type: String,
    required: false // Make this optional for PayPal transactions
  },
  Amount: {
    type: Number,
    required: true
  },
  MpesaReceiptNumber: {
    type: String,
    required: false // Make this optional for PayPal transactions
  },
  Balance: {
    type: String,
    required: false
  },
  TransactionDate: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: false // Make this optional for PayPal transactions
  },
  paypalDetails: {
    type: Object, // Store PayPal transaction details
    required: false
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

