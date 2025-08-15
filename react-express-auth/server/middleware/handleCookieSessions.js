// server/middleware/handleCookieSessions.js
const cookieSession = require("cookie-session");

const isProd = process.env.NODE_ENV === "production";

module.exports = cookieSession({
  name: "session",
  // use an array so you can rotate keys later if you want
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  sameSite: "lax",
  // with trust proxy set, this will only send cookies over HTTPS in prod
  secure: isProd,
});
