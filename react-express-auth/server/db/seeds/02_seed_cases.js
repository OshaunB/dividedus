exports.seed = async function (knex) {
  // Clear the table
  await knex("cases").del();
  await knex.raw("ALTER SEQUENCE cases_id_seq RESTART WITH 1");

  await knex("cases").insert([
    {
      name: "Luis Hernandez",
      description:
        "Detained during a routine traffic stop in Texas. Family has had no contact since.",
      status: "detained",
      date_detained: "2024-10-15",
      location: "Laredo, TX",
      image_url: "https://randomuser.me/api/portraits/men/45.jpg",
      user_id: 1,
    },
    {
      name: "Fatima Rahimi",
      description:
        "Taken from her apartment in NJ after a green card delay. Awaiting hearing.",
      status: "awaiting hearing",
      date_detained: "2025-02-07",
      location: "Newark, NJ",
      image_url: "https://randomuser.me/api/portraits/women/22.jpg",
      user_id: 2,
    },
    {
      name: "Santiago Rivera",
      description:
        "Deported despite living in the U.S. for 20+ years. Children left behind.",
      status: "deported",
      date_detained: "2023-12-01",
      location: "Los Angeles, CA",
      image_url: "https://randomuser.me/api/portraits/men/30.jpg",
      user_id: 3,
    },
  ]);
};
