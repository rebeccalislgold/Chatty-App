// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Create random colour code
const getColor = () => {
  const colorCode = `#${uuidv4().slice(0, 6)}`;
  return colorCode;
};

// Create client information object, then send to front-end
const connectClient = (client, nbClients) => {
  const clientInfo = {
    id: uuidv4(),
    username: `Anonymous${nbClients}`,
    color: getColor(),
    type: "clientInfo"
  };
  client.send(JSON.stringify(clientInfo));
};

// Create broadcast function to send data to all clients
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};

// When a client connects...
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  // Update and broadcast the new total number of users
  let numberOfUsers = {
    type: "numberOfUsers",
    users: wss.clients.size
  };

  wss.broadcast(JSON.stringify(numberOfUsers));

  // Send the client information object to front-end
  connectClient(ws, wss.clients.size);

  // When a message is received from the front-end, assign an ID, update the message type,
  // then broadcast message to all clients.
  ws.on("message", function incoming(message) {
    const messageObject = JSON.parse(message);
    messageObject.id = uuidv4();
    const username = messageObject.username;
    const content = messageObject.content;
    const color = messageObject.color;

    if (messageObject.type === "outgoingMessage") {
      messageObject.type = "incomingMessage";
    } else if (messageObject.type === "outgoingNotification") {
      messageObject.type = "incomingNotification";
    }

    wss.broadcast(JSON.stringify(messageObject));
  });

  // Set up a callback for when a client closes the socket (usually when they closed their browser).
  // Update number of users displayed to all remaining clients.
  ws.on("close", () => {
    numberOfUsers.users = wss.clients.size;
    wss.broadcast(JSON.stringify(numberOfUsers));
    console.log("Client disconnected");
  });
});
