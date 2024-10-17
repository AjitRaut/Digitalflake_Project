const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  categorySeq: { type: Number, default: 0 },
  subcategorySeq: { type: Number, default: 0 },
  productSeq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
