import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Player from "./Player.jsx";
//const io = require('socket.io')();

const socket = io.connect( 'http://' + document.domain + ':' + location.port );
console.log("Start");

socket.on("client", (msg) => {
    console.log("client");
    document.getElementById("messages").innerHTML += msg + "<br>";
});


class Square extends Component {
  allowDrop(e) {
    e.preventDefault();
  }
  onDrop(e) {
    let draggedId = e.dataTransfer.getData('text/html');
    let newContent =  document.getElementById(draggedId);
    console.log("Before: " + newContent.parentNode.id);
    e.target.appendChild(newContent);
    console.log("After: " + newContent.parentNode.id);

    socket.emit("server", newContent.parentNode.id);
  }
  render() {
    return (
      <div
        id={this.props.position}
        className={"square unselectable " + this.props.color}
        onDragOver={this.allowDrop}
        onDrop={this.onDrop}>
          {this.props.initContent}
      </div>
    );
  }
}

class Row extends React.Component {
  isNumericColumn(column) {
    return column === 0 || column === 25;
  }
  isAlphaRow(row) {
    return row === " ";
  }
  calculatePosition(row, column) {
    return row + column;
  }
  calculateDescription(row, column) {
    let result = "";
    if (!this.isNumericColumn(column) && this.isAlphaRow(row)){
        result = column;
      } else if (this.isNumericColumn(column)){
        result = row;
      }
    return result;
  }
  calculateColor(row, column) {
    let result = "pitch-green-dark";

    if (!this.isNumericColumn(column) && !this.isAlphaRow(row)) {
      result = (column % 2 != row.charCodeAt(0) % 2)
        ? "pitch-green-dark"
        : "pitch-green-middle";
    }
    return result;
  }
  
  render() {
    const row = this.props.row;
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <Square
          position={this.calculatePosition(row, column)}
          color={this.calculateColor(row, column)}
          initContent={this.calculateDescription(row, column)} />
      );
    }
  );
    return <div className="row">{columns}</div>;
  }
}

class Board extends React.Component {
  render() {
    const rows = ' abcdefghijklmnop '.split('').map(a => <Row row={a} />);
    return <div>{rows}</div>;
  }
}

ReactDOM.render(
  <div className="container">
    <Board />
  </div>
  ,
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
