const mongoose = require("mongoose");
const validator = require("validator");

const Devotee = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "name should be more than two characters"],
    maxLength: [30, "name should be less than 30 characters"],
    trim: true,
    required: [true, "please enter your name "],
    unique: true,
  },
  email: {
    type: String,
    maxLength: [60, "email cannot be more than 60 characters"],
    validate: [validator.isEmail, "You entered an invalid email"],
  },
  whatsappNo: {
    type: Number,
    maxLength: 1000000000,
    minLength: 1000000000000000,
    required: [true, "what is your whatsapp number?"],
  },
  age: {
    type: Number,
    required: [true, "please enter your age"],
  },
  roundsChanting: {
    type: Number,
    default: 0,
  },
  country: String,
  city: String,
  role: {
    type: String,
    default: "shishya",
  },
  mentor: String,
  language: String,
  gender: String,
  description: {
    type: String,
    maxLength: 400,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Devotee", Devotee);
