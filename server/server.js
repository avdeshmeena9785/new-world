import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
origin: [
"https://new-world-pi-livid.vercel.app",
"http://localhost:5173"
]
}));

app.use(express.json());


const categoryMap = {
"Top News": "general",
"India": "nation",
"World": "world",
"Sports": "sports",
"Technology": "technology",
"Entertainment": "entertainment",
};

app.get("/", (req, res) => {
res.send("NEW WORLD News API Server is Running!");
});

app.get("/api/news", async (req, res) => {
try {
const category = req.query.category || "Top News";
const search = req.query.q?.trim();


const apiKey = process.env.GNEWS_API_KEY;

if (!apiKey) {
  return res.status(500).json({
    error: "GNews API key missing. Check the .env file.",
  });
}

const params = new URLSearchParams({
  lang: "en",
  max: "10",
});

let endpoint;

if (search) {
  params.set("q", search);
  endpoint = "https://gnews.io/api/v4/search";
} else if (category === "Rajasthan") {
  params.set("q", "Rajasthan");
  endpoint = "https://gnews.io/api/v4/search";
} else {
  params.set("category", categoryMap[category] || "general");
  params.set("country", "in");
  endpoint = "https://gnews.io/api/v4/top-headlines";
}

const response = await fetch(
  `${endpoint}?${params.toString()}`,
  {
    headers: {
      "X-Api-Key": apiKey,
    },
  }
);

const data = await response.json();

if (!response.ok) {
  console.error("GNews API error:", data);

  return res.status(response.status).json({
    error: data.errors?.[0] || "Unable to fetch news from GNews.",
  });
}

res.json({
  articles: data.articles || [],
});


} catch (error) {
console.error("News server error:", error);


res.status(500).json({
  error: "Unable to load news. Please try again later.",
});


}
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`NEW WORLD API server running on port ${PORT}`);
});
