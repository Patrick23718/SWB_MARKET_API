const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },

  prenom: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },

  avatar:{
    type: String,
    required: false,
  },

  role: {
    type: Number, // 0 as default for team manager, 1 for admin
    default: 0,
    required: false,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  phone: {
    type: String,
    default: "",
    required: false,
    min: 9,
  },

  have_store:{
    type: Boolean,
    default: false,
    required: false,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);