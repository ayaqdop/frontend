import React from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const playerSource = {
	beginDrag(props) {
		return { number: props.number };
	},
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}
}

class Player extends React.Component {
  render() {
    const { connectDragSource, isDragging, number } = this.props;
    return connectDragSource(
      <div
        id={number}
        className="player" >
          {number}
      </div>
      );
  }
}

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(Player);
