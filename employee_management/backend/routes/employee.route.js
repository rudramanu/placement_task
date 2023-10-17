const express = require("express");
const { EmployeeModel } = require("../models/employee.model");

const employeeRouter = express.Router();

employeeRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const employee = new EmployeeModel(payload);
    await employee.save();
    res.send({ message: "Employee added" });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

employeeRouter.get("/", async (req, res) => {
  try {
    const admins = await EmployeeModel.find();
    return res.send(admins);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

employeeRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await EmployeeModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ message: "Employee details updated" });
  } catch (error) {
    res.send({ message: "Something went wrong while updating employee" });
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await EmployeeModel.findByIdAndRemove({ _id: id });
    res.send({ message: "Employee deleted from database" });
  } catch (error) {
    res.send({ message: "Something went wrong while deleting employee" });
  }
});

employeeRouter.get("/pagination", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const employees = await EmployeeModel.find().skip(skip).limit(limit);
    const totalCount = await EmployeeModel.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    return res.send({
      page,
      totalPages,
      employees,
    });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

employeeRouter.get("/department/:department", async (req, res) => {
  const department = req.params.department;
  try {
    const employees = await EmployeeModel.find({ department: department });
    if (employees.length === 0) {
      return res
        .status(404)
        .send({ message: "No employees found in this department" });
    }
    return res.send(employees);
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong while fetching employees by department",
    });
  }
});

employeeRouter.get("/sorted", async (req, res) => {
  const { sort } = req.query;
  try {
    if (sort === "asc") {
      let employee = await EmployeeModel.find().sort({ salary: 1 });
      return res.send(employee);
    } else if (sort === "desc") {
      let employee = await EmployeeModel.find().sort({ salary: -1 });
      return res.send(employee);
    } else {
      return res.status(400).send({ message: "Invalid query parameter." });
    }
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

employeeRouter.get("/search/:firstName", async (req, res) => {
  const firstName = req.params.firstName;
  try {
    const employees = await EmployeeModel.find({ firstName: firstName });
    if (employees.length === 0) {
      return res
        .status(404)
        .send({ message: "No employee found with the given first name" });
    }
    return res.send(employees);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

module.exports = { employeeRouter };
