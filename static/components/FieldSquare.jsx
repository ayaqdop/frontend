import React from "react";
import Square from "./Square.jsx";
import Ball from "./Ball.jsx";
import { ItemTypes } from "./ItemTypes";
import { canMovePlayer, movePlayer, canMoveBall, moveBall } from './Game';
import { DropTarget } from 'react-dnd';
import { calculatePosition, calculateDescription } from "./Helpers";

const squareTarget = {
  canDrop(props, monitor) {
    const piece = monitor.getItem();

    if (piece.number) {
      return canMovePlayer(piece, props.column, props.row);
    } else {
      return canMoveBall(piece, props.column, props.row);
    }
	},
  drop(props, monitor) {
    const piece = monitor.getItem();

    if (piece.number) {
      movePlayer(piece, props.column, props.row);
    } else {
      moveBall(piece, props.column, props.row);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class FieldSquare extends React.Component {

  overlayStyle(isOver, canDrop) {
    if (isOver && !canDrop) {
      return { opacity: 0.5, backgroundColor: 'red', zIndex: 1 };
    } else if (isOver && canDrop) {
      return { opacity: 0.5, backgroundColor: 'yellow', zIndex: 1 };
    } else {
      return {};
    }
  }

  render() {
    const { column, row, connectDropTarget, isOver, canDrop, children } = this.props;
    const style = this.overlayStyle(isOver, canDrop);

    return connectDropTarget(
      <div style={style}>
        <Square
          key={column + row}
          initContent={calculateDescription(column, row)} >
          {children}
        </Square>
      </div>
    );
  }
}

export default DropTarget([ItemTypes.PLAYER, ItemTypes.BALL], squareTarget, collect)(FieldSquare);
