const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = {
  ProductModel,
};
