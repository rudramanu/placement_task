const express = require("express");
const { ProductModel } = require("../models/product.model");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res.send(data);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send({ message: "Product added" });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

module.exports = {
  productRouter,
};
