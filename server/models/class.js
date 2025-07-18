const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: String,
  teacher: String,
  schedule: String,
});

module.exports = mongoose.model("Class", classSchema);

