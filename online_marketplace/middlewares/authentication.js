const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.key);
    if (decoded) {
      req.body.userId = decoded.userId;
      req.body.email = decoded.email;
      next();
    } else {
      res.send({ message: "Please login first" });
    }
  } else {
    res.send({ message: "Please login first" });
  }
};

module.exports = { authenticate };
