const Product = require('../models/productModel');
const Comment = require('../models/commentModel');
const { validationResult } = require('express-validator');

// Get all products with their comments
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    
    // Get comments for all products
    const productsWithComments = await Promise.all(
      products.map(async (product) => {
        const comments = await Comment.find({ productId: product._id }).lean();
        return {
          ...product,
          id: product._id, // Add id field for frontend compatibility
          comments
        };
      })
    );
    
    res.json(productsWithComments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product with comments
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const comments = await Comment.find({ productId: product._id }).lean();
    
    res.json({
      ...product,
      id: product._id, // Add id field for frontend compatibility
      comments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    
    res.status(201).json({
      ...savedProduct.toObject(),
      id: savedProduct._id, // Add id field for frontend compatibility
      comments: []
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const comments = await Comment.find({ productId: updatedProduct._id }).lean();
    
    res.json({
      ...updatedProduct,
      id: updatedProduct._id, // Add id field for frontend compatibility
      comments
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Delete product and its comments
    await Promise.all([
      Product.findByIdAndDelete(req.params.id),
      Comment.deleteMany({ productId: req.params.id })
    ]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};