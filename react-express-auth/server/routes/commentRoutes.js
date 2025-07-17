const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET all comments
router.get('/', commentController.getAllComments);

// GET comment by ID
router.get('/:id', commentController.getCommentById);

// GET all comments for a specific case
router.get('/case/:case_id', commentController.getCommentsByCaseId);

// POST new comment
router.post('/', commentController.createComment);

// PUT (update) a comment
router.put('/:id', commentController.updateComment);

// DELETE a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
