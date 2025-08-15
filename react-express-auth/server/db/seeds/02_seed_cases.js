/** @type {import('knex').Knex} */

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE comments, cases RESTART IDENTITY CASCADE");
  await knex("cases").del();

  await knex("cases").insert([
    {
      person_name: "María Gómez",
      age: 28,
      gender: "F",
      summary:
        "Left work at 7:30 PM and texted family she was heading home. Phone last pinged near 74th St–Broadway.",
      status: "open",
      date_last_seen: "2025-08-12",
      photo_url: "https://randomuser.me/api/portraits/women/68.jpg",
      last_seen_city: "Queens",
      last_seen_state: "NY",
      user_id: 1,
    },
    {
      person_name: "Ahmed Hassan",
      age: 34,
      gender: "M",
      summary:
        "Attended a scheduled ICE check-in and has not been reachable since.",
      status: "open",
      date_last_seen: "2025-08-05",
      photo_url: "https://randomuser.me/api/portraits/men/45.jpg",
      last_seen_city: "Houston",
      last_seen_state: "TX",
      user_id: 1,
    },
    {
      person_name: "Li Wei Chen",
      age: 19,
      gender: "M",
      summary:
        "Lost contact during a multi-city bus transfer; last message said he was changing buses downtown.",
      status: "open",
      date_last_seen: "2025-07-29",
      photo_url: "https://randomuser.me/api/portraits/men/71.jpg",
      last_seen_city: "Phoenix",
      last_seen_state: "AZ",
      user_id: 1,
    },
    {
      person_name: "Sofía Álvarez",
      age: 24,
      gender: "F",
      summary:
        "Did not arrive for morning shift; roommates say she left home at 6:15 AM as usual.",
      status: "open",
      date_last_seen: "2025-08-10",
      photo_url: "https://randomuser.me/api/portraits/women/52.jpg",
      last_seen_city: "Los Angeles",
      last_seen_state: "CA",
      user_id: 1,
    },
    {
      person_name: "Daniel Okoro",
      age: 31,
      gender: "M",
      summary: "Was looking for day labor near the bridge and did not return.",
      status: "open",
      date_last_seen: "2025-07-22",
      photo_url: "https://randomuser.me/api/portraits/men/21.jpg",
      last_seen_city: "El Paso",
      last_seen_state: "TX",
      user_id: 1,
    },
    {
      person_name: "Amina Diallo",
      age: 27,
      gender: "F",
      summary:
        "Neighbors heard a disturbance; Amina did not show up to ESL class the next day.",
      status: "open",
      date_last_seen: "2025-07-18",
      photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
      last_seen_city: "Chicago",
      last_seen_state: "IL",
      user_id: 1,
    },
    {
      person_name: "Carlos Rivera",
      age: 36,
      gender: "M",
      summary:
        "Attorney believes he was transferred after court; location not confirmed.",
      status: "open",
      date_last_seen: "2025-08-01",
      photo_url: "https://randomuser.me/api/portraits/men/33.jpg",
      last_seen_city: "Miami",
      last_seen_state: "FL",
      user_id: 1,
    },
    {
      person_name: "Elena Petrova",
      age: 29,
      gender: "F",
      summary:
        "Usually calls family after her night shift; phone goes straight to voicemail.",
      status: "open",
      date_last_seen: "2025-08-11",
      photo_url: "https://randomuser.me/api/portraits/women/65.jpg",
      last_seen_city: "Newark",
      last_seen_state: "NJ",
      user_id: 1,
    },
    {
      person_name: "Yusuf Ali",
      age: 22,
      gender: "M",
      summary:
        "Shelter staff report he left in the afternoon, saying he had a job interview.",
      status: "open",
      date_last_seen: "2025-07-30",
      photo_url: "https://randomuser.me/api/portraits/men/12.jpg",
      last_seen_city: "San Diego",
      last_seen_state: "CA",
      user_id: 1,
    },
    {
      person_name: "Priya Nair",
      age: 26,
      gender: "F",
      summary:
        "Legal aid could not reach her before an asylum hearing; last known address is a shared apartment.",
      status: "open",
      date_last_seen: "2025-08-06",
      photo_url: "https://randomuser.me/api/portraits/women/23.jpg",
      last_seen_city: "San Antonio",
      last_seen_state: "TX",
      user_id: 1,
    },
  ]);
};
