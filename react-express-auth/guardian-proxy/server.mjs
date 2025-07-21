import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5001;
const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;

app.get("/api/guardian", async (req, res) => {
  try {
    const response = await axios.get(
      "https://content.guardianapis.com/search",
      {
        params: {
          q: '"immigration deportation" OR "ICE raid"',
          "api-key": GUARDIAN_API_KEY,
          "page-size": 12, // Fetch more to have extras after filtering
          "order-by": "newest",
          "show-fields": "trailText,thumbnail,headline",
          section: "us-news",
        },
      }
    );

    const rawResults = response.data.response.results;

    // Clean results: must include immigration keywords in headline/trail, exclude "epstein"
    const filtered = rawResults.filter((article) => {
      const headline = article.fields.headline.toLowerCase();
      const trail = article.fields.trailText?.toLowerCase() || "";

      const includesKeyword =
        headline.includes("immigration") ||
        headline.includes("deportation") ||
        headline.includes("ice") ||
        trail.includes("immigration") ||
        trail.includes("deportation") ||
        trail.includes("ice");

      const isNoise =
        headline.includes("epstein") ||
        headline.includes("maxwell") ||
        headline.includes("ghislaine") ||
        headline.includes("sex abuse");

      return includesKeyword && !isNoise;
    });

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching from Guardian:", error.message);
    res.status(500).json({ error: "Failed to fetch from Guardian API" });
  }
});
app.listen(PORT, () => {
  console.log(`Guardian proxy listening on http://localhost:${PORT}`);
});
