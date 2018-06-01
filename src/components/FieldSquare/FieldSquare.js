import React from "react";
import PropTypes from "prop-types";
import Square from "../Square/Square";
import { ItemTypes } from "../ItemTypes";
import { canMove, move } from "../../actions/Game";
import { DropTarget } from "react-dnd";
import { calculateDescription } from "../../actions/helpers";

const squareTarget = {
  canDrop(props, monitor) {
    return canMove(monitor.getItem(), [props.column, props.row]);
  },
  drop(props, monitor) {
    move(monitor.getItem(), [props.column, props.row]);
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
      return { opacity: 0.5, backgroundColor: "red", zIndex: 1 };
    } else if (isOver && canDrop) {
      return { opacity: 0.5, backgroundColor: "yellow", zIndex: 1 };
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

FieldSquare.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

export default DropTarget([ItemTypes.PLAYER, ItemTypes.BALL], squareTarget, collect)(FieldSquare);
