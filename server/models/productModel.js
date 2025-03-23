const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const ProductSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, required: true },
  size: { type: SizeSchema, required: true },
  weight: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);