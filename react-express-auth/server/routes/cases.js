const express = require("express");
const router = express.Router();
const Case = require("../models/Case");
const checkAuthentication = require("../middleware/checkAuthentication");

// GET /api/cases
router.get("/", async (req, res) => {
  try {
    const cases = await Case.getAll();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cases" });
  }
});

// GET /api/cases/:id
router.get("/:id", async (req, res) => {
  try {
    const foundCase = await Case.getById(req.params.id);
    if (!foundCase) return res.status(404).json({ error: "Case not found" });
    res.json(foundCase);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch case" });
  }
});

// POST /api/cases (must be logged in)
router.post("/", checkAuthentication, async (req, res) => {
  try {
    const user_id = req.session.userId; // Comes from cookie-based auth
    const newCase = await Case.create({ ...req.body, user_id });
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ error: "Failed to create case" });
  }
});

// PUT /api/cases/:id (must be logged in)
router.put("/:id", checkAuthentication, async (req, res) => {
  try {
    const updated = await Case.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update case" });
  }
});

module.exports = router;
