/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex("comments").del();
  await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");

  await knex("comments").insert([
    {
      content: "We’re praying for you.",
      user_id: 1,
      case_id: 1
    },
    {
      content: "This story breaks my heart.",
      user_id: 2,
      case_id: 2
    }
  ]);
};
