const express = require("express");
const { connection } = require("./configs/db");
// const { userRouter } = require("./routes/user.route");
// const { restaurantRouter } = require("./routes/restaurant.route");
// const { orderRouter } = require("./routes/order.route");
// const { authenticate } = require("./middleware/authenticate");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use("/home", (req, res) => {
  res.send("working");
});
// app.use("/", userRouter);
// app.use("/restaurants", restaurantRouter);
// app.use("/orders", authenticate, orderRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting with Database");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
