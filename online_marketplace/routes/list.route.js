const express = require("express");
const { ProductModel } = require("../models/product.model");
const { UserModel } = require("../models/user.model");
const { authenticate } = require("../middlewares/authentication");

const listRouter = express.Router();

listRouter.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await UserModel.findOne({ userId });
    const list = user.list;
    res.send(list);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

listRouter.get("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).send({ message: "Login to continue" });
    }
    const list = user.list;
    console.log(list);
    if (list.some((el) => el.productId === productId)) {
      return res.send({ message: "Product is present in cart" });
    }
    res.status(409).send({ message: "Product is not in cart" });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
});

listRouter.post("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const list = user.list;

  try {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          list: {
            productId,
            quantity: 1,
            price: product.price,
          },
        },
      }
    );
    res.send({ message: "Product added to list" });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

listRouter.delete("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const list = user.list;
  if (list.some((el) => el.productId == productId)) {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { list: { productId } },
        }
      );
      res.send({ message: `Product with id ${productId} removed from list` });
    } catch (error) {
      return res.status(501).send({ message: error.message });
    }
  } else {
    return res.status(404).send({ message: "Product not found in list" });
  }
});

module.exports = {
  listRouter,
};
