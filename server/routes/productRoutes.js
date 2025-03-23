const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');

// Validation middleware
const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('imageUrl').notEmpty().withMessage('Image URL is required'),
  body('count').isNumeric().withMessage('Count must be a number'),
  body('size.width').isNumeric().withMessage('Width must be a number'),
  body('size.height').isNumeric().withMessage('Height must be a number'),
  body('weight').notEmpty().withMessage('Weight is required')
];

// Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
