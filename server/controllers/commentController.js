const Comment = require('../models/commentModel');
const Product = require('../models/productModel');
const { validationResult } = require('express-validator');

// Create a new comment
exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if product exists
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    
    res.status(201).json({
      ...savedComment.toObject(),
      id: savedComment._id // Add id field for frontend compatibility
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a product
exports.getProductComments = async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.productId }).lean();
    
    // Add id field for frontend compatibility
    const formattedComments = comments.map(comment => ({
      ...comment,
      id: comment._id
    }));
    
    res.json(formattedComments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
