const Comment = require("../models/Comment");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.getAll();
    res.json(comments.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching all comments" });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.getById(req.params.id);

    if (!comment.rows.length) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment.rows[0]); // return the first result
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching comment" });
  }
};

const createComment = async (req, res) => {
  try {
    const { user_id, case_id, content } = req.body;

    const newComment = await Comment.create({ user_id, case_id, content });
    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    const updated = await Comment.update(req.params.id, { content });

    if (!updated.rows.length) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating comment" });
  }
};

const getCommentsByCaseId = async (req, res) => {
  try {
    const { case_id } = req.params;
    const comments = await Comment.getByCaseId(case_id);
    res.json(comments.rows); // use `.rows` when using db.raw()
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching comments for case" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.remove(req.params.id);

    if (deleted.rowCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  getCommentsByCaseId,
  createComment,
  updateComment,
  deleteComment,
};
