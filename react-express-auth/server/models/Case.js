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

  // models/Case.js  — replace only the create() method
  static async create({
    person_name,
    age,
    gender,
    summary,
    status,
    date_last_seen,
    photo_url,
    last_seen_city,
    last_seen_state,
    user_id,
  }) {
    const safeStatus = status && String(status).trim() ? status : "open";

    const sql = `
    INSERT INTO cases (
      person_name, age, gender, summary, status,
      date_last_seen, photo_url, last_seen_city, last_seen_state, user_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING *;
  `;
    const vals = [
      person_name ?? null,
      age ?? null,
      gender ?? null,
      summary ?? null,
      safeStatus,
      date_last_seen ?? null,
      photo_url ?? null,
      last_seen_city ?? null,
      last_seen_state ?? null,
      user_id, // from session (checkAuthentication)
    ];

    const result = await knex.raw(sql, vals);
    return result.rows[0]; // includes id for redirect/link
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
