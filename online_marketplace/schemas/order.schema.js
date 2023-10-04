const mongoose = require("mongoose");
const { CartSchema } = require("./carts.schema");

const OrderSchema = mongoose.Schema({
  user: { type: String, required: true },
  products: { type: [CartSchema], required: true },
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },

  orderStatus: {
    type: String,
    enum: [
      "inprocess",
      "declined",
      "placed",
      "delivered",
      "onroad",
      "cancelled",
    ],
    default: "placed",
  },
});

module.exports = { OrderSchema };
