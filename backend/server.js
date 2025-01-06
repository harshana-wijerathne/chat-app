const express = require("express");
const { chats } = require("./data/data").default;
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

//app.use(cors);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
