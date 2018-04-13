import React from "react";
import { canDrag } from "../logic/Game";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const ballSource = {
	beginDrag() {
		return { type : ItemTypes.BALL };
	},
	canDrag() {
    return canDrag(null, null);
  }
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

class Ball extends React.Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="ball" >.</div>
    );
  }
}

export default DragSource(ItemTypes.BALL, ballSource, collect)(Ball);
