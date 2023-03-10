require("dotenv").config();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const followerRouter = require("./routes/follower");
const dbConnection = require("./db/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/follower", followerRouter);
dbConnection
  .then((db) => {
    if (!db) return process.exit(1);
    app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
  })
  .catch((err) => console.log(`Error Connecting to Database: ${err}`));
