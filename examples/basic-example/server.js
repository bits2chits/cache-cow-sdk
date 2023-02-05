const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
var cors = require('cors')

app.use(cors())

server.listen(8080, () => {
  console.log('Server running on port 8080');
});

io.on('connection', (socket) => {
  console.log('New client connected');
  sendData(socket);
});

function sendData(socket) {
  let timeElapsed = 0
  setInterval(() => {
    let data = {
      message: timeElapsed
    };
    socket.emit('data', data);
    timeElapsed += 2
  }, 2000);
}