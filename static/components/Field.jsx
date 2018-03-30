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

  renderRow(row) {
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <BoardSquare key={row + column} row={row} column={column}>
          {this.renderPiece(column, row)}
        </BoardSquare>
        );
      }
    );
    
    return <div key={row} className="row">{columns}</div>;
  }
  render() {
    const rows = Array.from(new Array(18), (e, i) => i).map(row => this.renderRow(row));
    return <div className="container">{rows}</div>;
  }
}

export default DragDropContext(HTML5Backend)(Field);
