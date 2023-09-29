const express = require("express");
const orderRouter = express.Router();

const { OrderModel } = require("../models/order.model");
const { RestaurantModel } = require("../models/restaurant.model");

orderRouter.post("/", async (req, res) => {
  let payload = req.body;

  try {
    let order = await OrderModel(payload);
    await order.save();
    res.send({ message: "Order created" });
  } catch (error) {
    res.send({ message: "Getting error while ordering" });
  }
});
orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let order = await OrderModel.findById(id);
    res.send({ message: "here is your Order", order });
  } catch (error) {
    res.send({ message: "Something went wrong while getting order" });
  }
});
orderRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    let order = await OrderModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ message: "order updated" });
  } catch (error) {
    res.send({ message: "Something went wrong while updating order" });
  }
});

module.exports = { orderRouter };
