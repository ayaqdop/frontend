import React from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const playerSource = {
	beginDrag() {
		return {};
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
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        id={this.props.number}
        className="player" >
          {this.props.number}
      </div>
      );
  }
}

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(Player);
