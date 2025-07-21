const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

class User {
  // Private class property to store the password hash securely
  #passwordHash = null;

  // Constructs a user instance from raw user data (e.g., from the database)
  // Adds avatar_url and quote support
  constructor({ id, username, password_hash, avatar_url, quote }) {
    this.id = id;
    this.username = username;
    this.avatar_url = avatar_url; // optional field: profile image
    this.quote = quote; // optional field: personal message
    this.#passwordHash = password_hash; // keep hash private
  }

  // Compares a plain text password to the stored hashed password
  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.#passwordHash);
  };

  /**
   * Creates a new user in the database
   * - Hashes the plain text password
   * - Inserts username, password_hash, avatar_url, and quote into the `users` table
   * - Returns a new User instance (without exposing the hash)
   */
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

  /**
   * Lists all users in the database.
   * Returns an array of User instances, each hiding the password hash.
   */
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  /**
   * Finds a single user by ID.
   * Returns a User instance or null if not found.
   */
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  /**
   * Finds a single user by username.
   * Useful for login or checking uniqueness.
   */
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  /**
   * Updates the username of a specific user by ID.
   * (Can be expanded to support avatar or quote updates too)
   */
  static async update(id, username) {
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const result = await knex.raw(query, [username, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  /**
   * Deletes all users from the database.
   * Useful for resetting data in development/testing.
   */
  static async deleteAll() {
    return knex("users").del();
  }
}

module.exports = User;
