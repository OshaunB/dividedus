const Case = require("../models/Case");

const getAllCases = async (req, res) => {
  try {
    const cases = await Case.getAll();
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

const getCaseById = async (req, res) => {
  try {
    const cases = await Case.getById(req.params.id);
    res.json(cases);
  } catch {
    console.error(err);
    res.status(500).json({ error: "Error fetching case" });
  }
};

const getCasesByUserId = async (req, res) => {
  try {
    const userCases = await Case.getByUserId(req.params.user_id);
    res.json(userCases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user cases" });
  }
};

const createCase = async (req, res) => {
  try {
    const caseData = req.body; // incoming data from frontend
    const newCase = await Case.create(caseData);
    res.status(201).json(newCase); // 201 = "Created"
  } catch {
    console.error(err);
    res.status(500).json({ error: "Error creating new case" });
  }
};

const updateCase = async (req, res) => {
  try {
    const updated = await Case.update(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "Case updated successfully" });
    } else {
      res.status(404).json({ error: "Case not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating case" });
  }
};

const deleteCase = async (req, res) => {
  try {
    const deleted = await Case.delete(req.params.id); // use `id`, not `user_id`

    if (deleted) {
      res.status(200).json({ message: "Case deleted successfully" });
    } else {
      res.status(404).json({ error: "Case not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting case" });
  }
};

module.exports = {
  getAllCases,
  getCaseById,
  getCasesByUserId,
  createCase,
  updateCase,
  deleteCase,
};
