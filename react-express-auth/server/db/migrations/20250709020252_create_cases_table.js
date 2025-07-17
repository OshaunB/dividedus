/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cases", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.text("description").notNullable();
    table.string("status").notNullable();
    table.date("date_detained").notNullable();
    table.string("image_url");
    table.string("location");

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
