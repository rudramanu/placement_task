const express = require("express");
const restaurantRouter = express.Router();

const { RestaurantModel } = require("../models/restaurant.model");
const { authenticate } = require("../middleware/authenticate");

restaurantRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    const restaurant = await RestaurantModel(payload);
    await restaurant.save();
    res.send({ message: "New restaurants added" });
  } catch (error) {
    res.send({ message: "Error while addind restaurants" });
  }
});
restaurantRouter.get("/", async (req, res) => {
  const restaurants = await RestaurantModel.find();
  res.send(restaurants);
});
restaurantRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await RestaurantModel.findOne({ _id: id });
  res.send(restaurant);
});
restaurantRouter.get("/:id/menu", async (req, res) => {
  const id = req.params.id;
  const restaurant = await RestaurantModel.findOne({ _id: id });
  res.send(restaurant.menu);
});
restaurantRouter.post("/:id/menu", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      { _id: id },
      { $push: { menu: req.body } }
    );
    if (restaurant) {
      res.send({ message: "Added new menu" });
    }
  } catch (error) {
    res.send({ message: "Something went wrong while adding menu" });
  }
});

module.exports = { restaurantRouter };
