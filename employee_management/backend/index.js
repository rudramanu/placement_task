const express = require("express");
const { connection } = require("./configs/db");

const { adminRouter } = require("./routes/admin.route");
const { employeeRouter } = require("./routes/employee.route");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Basic endpoint working");
});
app.use("/admin", adminRouter);
app.use("/employee", employeeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Established connection with the Database");
  } catch (error) {
    console.log("Unable to establish a connection with the database server");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
