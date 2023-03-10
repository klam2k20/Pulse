require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/api/test", (req, res) => res.send("Successful test"));

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
