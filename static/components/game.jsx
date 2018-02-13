import React from 'react';
import ReactDOM from 'react-dom';
import Player from "./Player.jsx";
import Field from "./Field.jsx";
//const io = require('socket.io')();

const socket = io.connect( 'http://' + document.domain + ':' + location.port );
console.log("Start");

socket.on("client", (msg) => {
    console.log("client");
    document.getElementById("messages").innerHTML += msg + "<br>";
});

ReactDOM.render(
  <Field />,
  document.getElementById("app")
);

let team = [
  { number: 3, position: "b9" },
  { number: 11, position: "h13" },
  { number: 14, position: "m6" },
]

team.forEach(p =>
  ReactDOM.render(<Player number={p.number} />,
    document.getElementById(p.position)
));
