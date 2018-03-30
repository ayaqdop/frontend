import React from "react";
import BoardSquare from "./BoardSquare.jsx";
import Player from "./Player.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {
  componentWillMount(){
    this.setState(
      {field: [
        [
        {id: 1, value: 0},
        {id: 1, value: 1},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
      ],
      [
        {id: 1, value: 0},
        {id: 1, value: 1},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
        {id: 1, value: 0},
      ]
    ]}
    )
  }
  /*
  / Legend 0 -empty 1 - gamer
  */
  renderPiece(x, y) {
    const shouldBeRendered = x == this.props.piecePosition[0] && y == this.props.piecePosition[1];
    return shouldBeRendered ? <Player number="14" /> : null;
  }

  renderRow(row) {
    this.state.field.row
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <BoardSquare key={column + row} column={column} row={row}>
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
