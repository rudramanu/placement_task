const mongoose = require("mongoose");

const BlacklistSchema = mongoose.Schema({
  token: { type: String },
});

const BlacklistModel = mongoose.model("blacklist", BlacklistSchema);

module.exports = {
  BlacklistModel,
};
