import React from "react";
import Square from "./Square.jsx";
import { ItemTypes } from "./ItemTypes";
import { canMovePiece, movePiece } from './Game'
import { DropTarget } from 'react-dnd';
import { calculatePosition, calculateColor, calculateDescription } from "./Helpers";

const squareTarget = {
  canDrop(props) {
		return canMovePiece(props.column, props.row);
	},
  drop(props, monitor) {
    movePiece(props.column, props.row);
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
            key={row + column}
            position={calculatePosition(row, column)}
            color={calculateColor(row, column)}
            initContent={calculateDescription(row, column)} >
            {children}
          </Square>
        </div>
      );
  }
}

export default DropTarget(ItemTypes.PLAYER, squareTarget, collect)(BoardSquare);
