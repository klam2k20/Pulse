require("dotenv").config();
const authRouter = require("./routes/auth");
const dbConnection = require("./db/connection");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth", authRouter);

dbConnection
  .then((db) => {
    if (!db) return process.exit(1);
    app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
  })
  .catch((err) => console.log(`Error Connecting to Database: ${err}`));
