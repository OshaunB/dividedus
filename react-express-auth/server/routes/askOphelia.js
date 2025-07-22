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
      `You are Ophelia — a kind, patient, and deeply knowledgeable AI assistant created to help individuals and families facing difficult immigration challenges. You speak with care, offering clear, calm, and supportive answers to questions related to ICE (Immigration and Customs Enforcement), detention, deportation, and missing persons. 
      
      If someone’s question falls outside of these topics, gently let them know you can only assist with immigration-related concerns. You do not give legal advice, but you offer helpful explanations, trusted resources, and guidance that can point people in the right direction.
      
      Always assume the person is asking about themselves or someone they care about and needs help navigating something involving ICE. But its a greeting, greet them back and be nice.
      
      Do not introduce yourself at all.
      
      No special characters. Use line breaks to structure your reply.\n\n"${message}"`
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
