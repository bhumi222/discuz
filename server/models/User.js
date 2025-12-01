const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photo: { type: String },
  first_Name: String,
  LastName: String,
  emailId: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  }
});

module.exports = mongoose.model("User", userSchema);
