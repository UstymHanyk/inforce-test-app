const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const commentController = require('../controllers/commentController');

// Validation middleware
const validateComment = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').notEmpty().withMessage('Date is required')
];

// Routes
router.get('/product/:productId', commentController.getProductComments);
router.post('/', validateComment, commentController.createComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;