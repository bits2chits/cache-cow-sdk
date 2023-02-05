const WebSocket = require('ws');

// create a web socket server
const server = new WebSocket.Server({
  port: 8080
});

// broadcast function to send data to all connected clients
const broadcast = (data) => {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

function doSomeBroadcasts() {
  let timeElapsed = 0
  console.log('Time Elapsed', timeElapsed)
  setInterval(() => {
    broadcast(JSON.stringify({
      time: timeElapsed
    }))
    timeElapsed += 2
  }, 2000)
}

// handle incoming connections
server.on('connection', (ws) => {
  console.log('Client connected');

  // send some data to the client
  doSomeBroadcasts()

  // handle incoming messages from the client
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    broadcast(`Server received: ${message}`);
  });

  // handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (e) => {
    console.log(e)
  })
});

console.log('Web socket server is running on port 8080');
