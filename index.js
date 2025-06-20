// index.js

require("dotenv").config(); // Load environment variables from a .env file

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Endpoint to fetch contact data from HubSpot API
app.get("/", async (req, res) => {
  const contactId = req.params.vid; // Get the contact ID from the URL parameter
  const apiKey = process.env.HUBSPOT_API_KEY; // Get the API key from environment variables

  const url = `https://api.hubapi.com/contacts/v1/contact/vid/130289779074/profile`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  try {
    // Make the API request to HubSpot
    const response = await axios.get(url, { headers });

    // Return the contact data as JSON
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).send("Error fetching contact data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
