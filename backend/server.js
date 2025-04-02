const express = require("express");
const { chats } = require("./data/data").default;
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is Running Successfully");
  

// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, "/fontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "fontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runningggggg..");
  });
}

// --------------------------deployment------------------------------

app.use(cors);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  5000,
  console.log(`Server Started on PORT ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on(
    "setup",
    (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    },
    []
  );

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined with room: ", room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.user not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
