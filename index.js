const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const apicache = require("apicache");
require("dotenv").config();

const app = express();
const PORT = 3000;
const duration = "30 seconds";

// ENV vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

let cache = apicache.options({
  debug: true,
  statusCodes: {
    exclude: [404, 403],
    cacheableByDefault: true,
  },
}).middleware;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});

app.use(limiter);
app.set('trust proxy', 1);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api", cache(duration), async (req, res) => {
  try {
    const { q: query } = req.query;
    const response = await axios.get(API_BASE_URL, {
      params: {
        [API_KEY_NAME]: API_KEY_VALUE,
        q: query,
      },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
