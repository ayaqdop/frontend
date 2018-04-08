const express = require("express");
const http = require("http");
const morgan = require("morgan");


const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/static/images'));
app.use(express.static(__dirname + '/static/css'));

app.use("/game", (req, res) => {
  res.sendFile(__dirname + "/templates/game.html");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
