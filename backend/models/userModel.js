const mongoose = require("mongoose");

// create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

// create model
const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
