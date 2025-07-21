// server/routes/askOphelia.js
const express = require("express");

const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // *** CHANGE THIS LINE ***
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use the model that worked with curl

    const result = await model.generateContent(
      `You are Ophelia, a supportive AI who helps people in immigrant communities understand what to do if someone is detained or missing. Answer this question clearly but concisely and without giving legal advice:\n\n"${message}"`
    );

    const responseText = await result.response.text();

    res.json({ reply: responseText });
  } catch (error) {
    console.error("Gemini error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while talking to Ophelia." });
  }
});

module.exports = router;
