const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  if (!name || !email || !password || address || !phoneNumber) {
    return res.status(409).send({ message: "Please provide all fields" });
  }
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .send({ message: "This email is already registered" });
    }
    bcrypt.hash(password, 3, async (err, hashedPass) => {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      try {
        const user = new UserModel({
          name,
          email,
          password: hashedPass,
          address,
          phoneNumber,
        });
        await user.save();
        res.send({ message: "User Registered Sucessfully" });
      } catch (error) {
        return res.status(404).send({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(409)
      .send({ message: "Provide email and password to login" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      if (result) {
        var token = jwt.sign({ userId: user._id, email }, process.env.key);
        res.send({
          message: "Login Successful",
          token,
          name: user.name,
        });
      } else {
        return res.status(403).send({ message: "Wrong Credentials" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  userRouter,
};
