const express = require("express");
const cors = require("cors");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");

const authRoutes = require("./routes/authRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(errorHandler);

module.exports = app;