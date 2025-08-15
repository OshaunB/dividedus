const knex = require("../db/knex");

class Case {
  // List cases with submitted_by (username) included
  static async getAll() {
    const query = `
      SELECT
        c.*,
        COALESCE(NULLIF(TRIM(u.username), ''), 'Unknown') AS submitted_by
      FROM cases c
      LEFT JOIN users u ON u.id = c.user_id
      ORDER BY c.id ASC;
    `;
    const result = await knex.raw(query);
    return result.rows;
  }

  // Fetch a single case with submitted_by (username)
  static async getById(id) {
    const query = `
      SELECT
        c.*,
        COALESCE(NULLIF(TRIM(u.username), ''), 'Unknown') AS submitted_by
      FROM cases c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.id = ?
      LIMIT 1;
    `;
    const result = await knex.raw(query, [id]);
    return result.rows[0];
  }

  static async getByUserId(user_id) {
    const query = `SELECT * FROM cases WHERE user_id = ?`;
    const result = await knex.raw(query, [user_id]);
    return result.rows;
  }

  static async create({
    name,
    description,
    status,
    date_detained,
    location,
    image_url,
    user_id,
  }) {
    const query = `
      INSERT INTO cases (name, description, status, date_detained, location, image_url, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *;
    `;
    const values = [
      name,
      description,
      status,
      date_detained,
      location,
      image_url,
      user_id,
    ];
    const result = await knex.raw(query, values);
    return result.rows[0];
  }

  static async update(id, updatedData) {
    const keys = Object.keys(updatedData);
    const values = Object.values(updatedData);

    // Generate SET clause dynamically: "name = ?, description = ? ..."
    const setClause = keys.map((key, index) => `${key} = ?`).join(", ");
    const query = `
      UPDATE cases
      SET ${setClause}
      WHERE id = ?
      RETURNING *;
    `;
    const result = await knex.raw(query, [...values, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM cases WHERE id = ?`;
    await knex.raw(query, [id]);
  }
}

module.exports = Case;
