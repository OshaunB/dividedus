/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("users", function(table) {
    table.string("avatar_url");
    table.string("quote");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("users", function(table) {
    table.dropColumn("avatar_url");
    table.dropColumn("quote");
  });
};
