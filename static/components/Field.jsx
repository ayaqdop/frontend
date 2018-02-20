import React from "react";
import BoardSquare from "./BoardSquare.jsx";
import Player from "./Player.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {
  renderPiece(x, y) {
    const shouldBeRendered = x == this.props.piecePosition[0] && y == this.props.piecePosition[1];
    return shouldBeRendered ? <Player number="14" /> : null;
  }

  renderRow(row, key) {
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      let newRow = row.charCodeAt(0) - "a".charCodeAt(0);
      return (
        <BoardSquare key={row + column} row={newRow} column={column}>
          {this.renderPiece(column, newRow)}
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
