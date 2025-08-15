// migrations/20250814_add_gender_to_cases.js
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
  await knex.schema.alterTable('cases', (t) => {
    t.string('gender', 20).nullable(); // keep it simple for now
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('cases', (t) => {
    t.dropColumn('gender');
  });
};
