const ws = require("ws");

const PORT = 8080;

const wss = new ws.WebSocketServer({
  port: PORT,
});

wss.on("connection", (wsClient) => {
  console.log(wsClient);
  wsClient.send("Привет");
});
