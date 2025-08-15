const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

class User {
  // keep the hash private
  #passwordHash = null;

  constructor({ id, username, password_hash, avatar_url, quote }) {
    this.id = id;
    this.username = username;
    this.avatar_url = avatar_url || null;
    this.quote = quote || null;
    this.#passwordHash = password_hash;
  }

  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.#passwordHash);
  };

  // CREATE
  static async create(username, password, avatar_url = null, quote = null) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `
      INSERT INTO users (username, password_hash, avatar_url, quote)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `;

    const result = await knex.raw(query, [
      username,
      passwordHash,
      avatar_url,
      quote,
    ]);

    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  // LIST
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // FIND BY ID
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // FIND BY USERNAME
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // LEGACY: update only username (kept for compatibility)
  static async update(id, username) {
    const query = `
      UPDATE users
      SET username = ?
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [username, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  // NEW: partial update for { username?, quote?, avatar_url? }
  static async updatePartial(id, patch) {
    const allowed = ["username", "quote", "avatar_url"];
    const keys = allowed.filter((k) => patch[k] !== undefined);

    // nothing to update
    if (keys.length === 0) return await User.find(id);

    const setClause = keys.map((k, i) => `${k} = ?`).join(", ");
    const values = keys.map((k) => patch[k]);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = ?
      RETURNING *
    `;

    const result = await knex.raw(query, [...values, id]);
    const row = result.rows[0];
    return row ? new User(row) : null;
  }

  // OPTIONAL: deleteAll for tests/dev
  static async deleteAll() {
    return knex("users").del();
  }
}

module.exports = User;
