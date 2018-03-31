import React from "react";
import FieldSquare from "./FieldSquare.jsx";
import Player from "./Player.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {
  renderPiece(x, y) {
    const players = this.props.gamePieces;
    if (players) {
      let player = players.find(p => p.position[0] == x && p.position[1] == y);

      if (player) {

        return <Player number={ player.squadNumber } />;
      }
    }
    return null;
  }

  renderRow(row) {
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <FieldSquare key={column + row} column={column} row={row}>
          {this.renderPiece(column, row)}
        </FieldSquare>
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
