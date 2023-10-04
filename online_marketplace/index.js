const express = require("express");
const { connection } = require("./configs/db");

const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
require("dotenv").config();

app.use("/home", (req, res) => {
  res.send("APIs are working");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting to Database");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
