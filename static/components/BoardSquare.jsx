import React from "react";
import Square from "./Square.jsx";
import { ItemTypes } from "./ItemTypes";
import { canMovePiece, movePiece } from './Game';
import { DropTarget } from 'react-dnd';
import { calculatePosition, calculateColor, calculateDescription } from "./Helpers";

const squareTarget = {
  canDrop(props, monitor) {
		return canMovePiece(monitor.getItem().number, props.column, props.row);
	},
  drop(props, monitor) {
    movePiece(monitor.getItem().number, props.column, props.row);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends React.Component {
  render() {
      const { column, row, connectDropTarget, isOver, children } = this.props;
      return connectDropTarget(
        <div>
          <Square
            key={column + row}
            color={calculateColor(column, row)}
            initContent={calculateDescription(column, row)} >
            {children}
          </Square>
        </div>
      );
  }
}

export default DropTarget(ItemTypes.PLAYER, squareTarget, collect)(BoardSquare);
