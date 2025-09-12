require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

// middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const checkAuthentication = require("./middleware/checkAuthentication");
const logRoutes = require("./middleware/logRoutes");
const logErrors = require("./middleware/logErrors");

// controllers & routers
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const cases = require("./routes/cases");
const commentRoutes = require("./routes/commentRoutes");
const askOpheliaRoute = require("./routes/askOphelia");

// trust proxy for secure cookies on Render
app.set("trust proxy", 1);

// core middleware
app.use(handleCookieSessions);
app.use(logRoutes);
app.use(express.json());

// ✅ Health check for Render
app.get("/health", (_req, res) => res.send("ok"));

// ===== API ROUTES ONLY (Render will NOT have ../frontend/dist) =====
app.post("/api/auth/register", authControllers.registerUser);
app.post("/api/auth/login", authControllers.loginUser);
app.get("/api/auth/me", authControllers.showMe);
app.delete("/api/auth/logout", authControllers.logoutUser);

app.get("/api/users", checkAuthentication, userControllers.listUsers);
app.get("/api/users/:id", checkAuthentication, userControllers.showUser);
app.patch("/api/users/:id", checkAuthentication, userControllers.updateUser);

app.use("/api/cases", cases);
app.use("/api/comments", commentRoutes);
app.use("/api/ask-ophelia", askOpheliaRoute);

// ❌ REMOVE these in Render (they reference ../frontend/dist which isn’t deployed):
// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res, next) => {
//   if (req.originalUrl.startsWith("/api")) return next();
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

app.use(logErrors);

// start server (Render injects PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
