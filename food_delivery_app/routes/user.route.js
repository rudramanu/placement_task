const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authenticate } = require("../middleware/authenticate");
const { UserModel } = require("../models/user.model");

userRouter.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  let check_existence = await UserModel.findOne({ email });
  if (check_existence) {
    return res.send({ message: "User Already Present" });
  }
  try {
    bcrypt.hash(password, 3, async (err, encrypted) => {
      if (err) {
        res.send({ message: "Getting Error" });
      } else {
        const user = new UserModel({
          name,
          email,
          password: encrypted,
          address,
        });
        await user.save();
        res.send({ message: "User Registered" });
      }
    });
  } catch (error) {
    res.send({ message: "Error while registering" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hashed_password = user?.password;
    bcrypt.compare(password, hashed_password, (err, result) => {
      if (err) {
        res.send({ message: "Wrong credentials" });
      } else if (result) {
        const token = jwt.sign({ userID: user._id }, process.env.key);
        res.send({ message: "Logged in successfully", name: user.name, token });
      } else {
        res.send({ message: "Wrong credentials" });
      }
    });
  } catch (error) {
    res.send({ message: "User not found" });
  }
});

userRouter.patch("/user/:id/reset", authenticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: id });
    // console.log(req.body);
    if (user._id == req.body.userID) {
      bcrypt.hash(payload.password, 3, async (err, encrypted) => {
        if (err) {
          res.send({
            message: "Something went wrong while reseting your password",
          });
        } else {
          await UserModel.findByIdAndUpdate(
            { _id: id },
            { password: encrypted }
          );
          res.send({ message: "Password reset successful" });
        }
      });
    } else {
      res.send({
        message: "Not Authorize to reset the someone's else password",
      });
    }
  } catch (error) {
    res.send({ message: "You are not Authorize" });
  }
});

module.exports = { userRouter };
