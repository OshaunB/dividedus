const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
// When someone makes a GET request to /api/comments,
// this route will run the getAllComments controller function.
// Because this file is used with app.use("/api/comments", commentRoutes),
// this `'/'` path refers to the full `/api/comments` URL.

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
