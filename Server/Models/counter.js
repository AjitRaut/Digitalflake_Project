// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
