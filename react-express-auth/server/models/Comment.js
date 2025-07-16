const db = require('../db/knex');

// Get all comments
const getAll = () => db.raw('SELECT * FROM comments');

// Get comment by its ID
const getById = (id) => {
  return db.raw('SELECT * FROM comments WHERE id = ?', [id]);
};

// ✅ Get all comments for a specific case
const getByCaseId = (case_id) => {
  return db.raw('SELECT * FROM comments WHERE case_id = ?', [case_id]);
};

// Create a new comment
const create = ({ user_id, case_id, content }) => {
  return db.raw(
    'INSERT INTO comments (user_id, case_id, content) VALUES (?, ?, ?) RETURNING *',
    [user_id, case_id, content]
  );
};

// Update a comment’s content
const update = (id, { content }) => {
  return db.raw(
    'UPDATE comments SET content = ? WHERE id = ? RETURNING *',
    [content, id]
  );
};

// Delete a comment
const remove = (id) => {
  return db.raw('DELETE FROM comments WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  getByCaseId,
  create,
  update,
  remove,
};
