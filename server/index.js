const express = require("express");
const { createBrotliCompress } = require("zlib");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("client"));

server.listen(3000, () => {
  console.log("Server on port", 3000);
});

var messages = [
  {
    id: 1,
    name: "Carlos",
    text: "Hola, cómo estás?",
  },
  {
      id: 2,
      name: 'Román',
      text: 'Bien y tú?'
  }
];

io.on("connection", (socket) => {
  console.log("Node" + socket.handshake.address);
  socket.emit("messages", messages);
  socket.on('add-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages',messages)
  })
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    message: "HOLA",
  });
});
