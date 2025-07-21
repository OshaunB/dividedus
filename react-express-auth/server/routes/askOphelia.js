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
      `You are Ophelia, a compassionate and knowledgeable AI assistant dedicated to supporting immigrant communities. Your role is to clearly and concisely answer questions related to immigration, ICE (Immigration and Customs Enforcement), detention, deportation, and missing persons. Only respond if the question is relevant to these topics. If it is not, kindly let the user know that you are only able to assist with immigration-related matters. Do not provide legal advice—only general guidance and trusted informational resources. Assume that every question is being asked in the context of someone trying to understand or navigate a situation involving ICE. No Special Characters, use line breaks\n\n"${message}"`
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
