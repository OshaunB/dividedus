/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cases", (table) => {
    table.increments("id");
    table.string("person_name").notNullable();
    table.integer("age");
    table.text("summary").notNullable();
    table.enu("status", ["open", "resolved", "unknown"]).defaultTo("open");
    table.date("date_last_seen"); // or date_detained if more accurate for all
    table.string("photo_url");
    table.string("last_seen_city");
    table.string("last_seen_state", 2); // state code
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cases");
};
