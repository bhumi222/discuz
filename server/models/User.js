const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_Name: {
  type: String, 
  required: true },

  LastName: { 
  type: String, 
  required: true },

  emailId: { 
  type: String, 
  required: true, 
  unique: true },

  password: { 
  type: String, 
  required: true }
  
});

module.exports = mongoose.model("User", userSchema);
