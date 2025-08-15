const User = require("../models/User");

/*
GET /api/users
Returns an array of all users in the database
*/
exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

/*
GET /api/users/:id
Returns a single user (if found)
*/
exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  res.send(user);
};

/*
PATCH /api/users/:id
Updates a single user (if found) and only if authorized
*/
exports.updateUser = async (req, res) => {
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);

  if (!Number.isFinite(userToModify)) {
    return res.status(400).send({ message: "Invalid user id." });
  }
  if (userRequestingChange !== userToModify) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  // Allow partial updates; use PRESENCE checks so "", null are intentional
  const { username, quote, avatar_url } = req.body || {};
  const has = (k) => Object.prototype.hasOwnProperty.call(req.body || {}, k);

  const patch = {};
  if (has("username") && typeof username === "string" && username.trim()) {
    patch.username = username.trim();
  }
  if (has("quote")) patch.quote = quote; // allow "", null, string
  if (has("avatar_url")) patch.avatar_url = avatar_url; // allow "", null, string

  if (Object.keys(patch).length === 0) {
    return res.status(400).send({ message: "No valid fields to update." });
  }

  try {
    const updated = await User.updatePartial(userToModify, patch);
    if (!updated) return res.status(404).send({ message: "User not found." });
    res.send(updated);
  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).send({ message: "Failed to update user." });
  }
};
