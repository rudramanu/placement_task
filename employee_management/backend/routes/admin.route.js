const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { AdminModel } = require("../models/admin.model");
const { authentication } = require("../middleware/authentication");
const { BlacklistModel } = require("../models/blacklist.model");

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(409).send({ message: "Please provide all fields" });
  }
  try {
    const adminExists = await AdminModel.findOne({ email });
    if (adminExists) {
      return res
        .status(409)
        .send({ message: "This email is already registered" });
    }
    bcrypt.hash(password, 3, async (err, hashedPass) => {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      try {
        const admin = new AdminModel({
          email,
          password: hashedPass,
        });
        await admin.save();
        res.send({ message: "Admin Registered Sucessfully" });
      } catch (error) {
        return res.status(404).send({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(409)
      .send({ message: "Provide email and password to login" });
  }
  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    bcrypt.compare(password, admin.password, async function (err, result) {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      if (result) {
        var token = jwt.sign({ adminId: admin._id, email }, process.env.key);
        res.send({ message: "Login Successful", token });
      } else {
        return res.status(403).send({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

adminRouter.post("/logout", authentication, async (req, res) => {
  const token = req.headers.authorization;
  try {
    const tokens = new BlacklistModel({ token });
    await tokens.save();
    res.send({ message: "Logout Sucessfull" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = { adminRouter };
