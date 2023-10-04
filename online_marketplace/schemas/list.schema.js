const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: String },
});

module.exports = {
  ListSchema,
};
