const mongoose = require("mongoose");

const { CartSchema } = require("../schemas/carts.schema");
const { ListSchema } = require("../schemas/list.schema");
const { OrderSchema } = require("../schemas/order.schema");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  list: {
    type: [ListSchema],
    default: [],
  },
  cart: {
    type: [CartSchema],
    default: [],
  },
  orders: {
    type: [OrderSchema],
    default: [],
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
