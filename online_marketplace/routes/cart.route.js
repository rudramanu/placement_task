const express = require("express");
const { ProductModel } = require("../models/product.model");
const { UserModel } = require("../models/user.model");
const { authenticate } = require("../middlewares/authentication");

const cartRouter = express.Router();

cartRouter.post("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const cart = user.cart;

  try {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cart: {
            productId,
            quantity: 1,
            price: product.price,
          },
        },
      }
    );
    res.send({ message: "Product added to cart" });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

cartRouter.delete("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const cart = user.cart;
  if (cart.some((el) => el.productId == productId)) {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { cart: { productId } },
        }
      );
      res.send({ message: `Product with id ${productId} removed from cart` });
    } catch (error) {
      return res.status(501).send({ message: error.message });
    }
  } else {
    return res.status(404).send({ message: "Product not found in list" });
  }
});

module.exports = {
  cartRouter,
};
