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

const getColor = () => {
  const colorCode = uuidv4().slice(0, 6);
  const hashtag = "#";
  return hashtag.concat(colorCode);
};

const connectClient = (client, nbClients) => {
  const clientInfo = {
    id: uuidv4(),
    username: `Anonymous${nbClients}`,
    color: getColor(),
    type: "clientInfo"
  };

  client.send(JSON.stringify(clientInfo));
};

wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  let numberOfUsers = {
    type: "numberOfUsers",
    users: wss.clients.size
  };

  wss.broadcast(JSON.stringify(numberOfUsers));

  connectClient(ws, wss.clients.size);

  ws.on("message", function incoming(message) {
    const messageObject = JSON.parse(message);
    messageObject.id = uuidv4();
    const username = messageObject.username;
    const content = messageObject.content;
    const color = messageObject.color;

    // const activeUsers = wss.clients.size;

    if (messageObject.type === "outgoingMessage") {
      messageObject.type = "incomingMessage";
    } else if (messageObject.type === "outgoingNotification") {
      messageObject.type = "incomingNotification";
    }

    console.log("User", username, "said", content, "id", messageObject.id);
    wss.broadcast(JSON.stringify(messageObject));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    numberOfUsers.users = wss.clients.size;
    wss.broadcast(JSON.stringify(numberOfUsers));
    console.log("Client disconnected");
  });
});
