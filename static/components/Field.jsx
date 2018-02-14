import React from "react";
import BoardSquare from "./BoardSquare.jsx";
import Player from "./Player.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {
  renderPiece(x, y) {
    const shouldBeRendered = x == this.props.piecePosition[0] && y == this.props.piecePosition[1];
    console.log("X: " + x + "  Y: " + y);
    console.log("position: " + this.props.piecePosition);
    console.log("Should be?: " + shouldBeRendered);
    return shouldBeRendered ? <Player number="14" /> : null;
  }

  renderRow(row, key) {
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <BoardSquare key={row + column} row={row} column={column}>
          {this.renderPiece(column, row.charCodeAt(0) - "a".charCodeAt(0) )}
        </BoardSquare>
        );
      }
    );
    
    return <div key={key} className="row">{columns}</div>;
  }
  render() {
    let counter = 42;
    const rows = " abcdefghijklmnop ".split("").map(row => this.renderRow(row, row + counter++));
    return <div className="container">{rows}</div>;
  }
}

export default DragDropContext(HTML5Backend)(Field);
