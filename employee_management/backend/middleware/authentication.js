const { BlacklistModel } = require("../models/blacklist.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }
  jwt.verify(token, process.env.key, async function (err, decoded) {
    if (err) {
      return res.status(404).send({ message: err.message });
    }
    console.log(decoded);
    req.body.adminId = decoded.adminId;

    try {
      const Blacklist = await BlacklistModel.findOne({ token });
      if (Blacklist) {
        return res.status(401).send({ message: "Login Again" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
    next();
  });
};

module.exports = {
  authentication,
};
