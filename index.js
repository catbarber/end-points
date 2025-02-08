const express = require("express");
const cors = require("cors");
const RSSParser = require("rss-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Create RSS parser instance
const parser = new RSSParser();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello world!");
});

app.get("/signup", (req, res) => {
  res.send("sign up");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/edmonton/rss", async (req, res) => {
  // Define the RSS endpoint

  try {
    // const feedUrl = req.query.url;
    const feedUrl = "https://globalnews.ca/edmonton/feed/";
    if (!feedUrl) {
      return res.status(400).json({ error: "Missing RSS feed URL" });
    }

    // Parse the RSS feed
    const feed = await parser.parseURL(feedUrl);

    // Structure the response
    const responseData = {
      title: feed.title,
      link: feed.link,
      items: feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        content: item.contentSnippet || item.content,
        pubDate: item.pubDate,
        creator: item.creator || item.author,
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to fetch RSS feed",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("server is running");
});
