const mongoose = require("mongoose");
const { ListSchema } = require("../schemas/list.schema");

const ListModel = mongoose.model("list", ListSchema);

module.exports = {
  ListModel,
};
