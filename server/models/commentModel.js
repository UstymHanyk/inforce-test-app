const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  description: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);