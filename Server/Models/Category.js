const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    status: String,
  });