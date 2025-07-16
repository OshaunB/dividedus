/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.text("content").notNullable();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("case_id").unsigned().references("id").inTable("cases").onDelete("CASCADE");
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
