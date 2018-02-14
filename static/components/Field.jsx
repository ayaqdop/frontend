import React from "react";
import BoardSquare from "./BoardSquare.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {

  renderRow(row, key) {
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <BoardSquare key={row + column} row={row} column={column} />
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
