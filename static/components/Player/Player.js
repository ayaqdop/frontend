import React from "react";
import PropTypes from "prop-types";
import { canDrag } from "../../actions/Game";
import { DragSource } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import "./Player.css";

const playerSource = {
	beginDrag(props) {
		return {
      type: ItemTypes.PLAYER,
      team: props.team,
      number: props.number
    };
  },
  canDrag(props) {
    return canDrag(props.team, props.number);
  }
}
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

class Player extends React.Component {
  render() {
    const { connectDragSource, isDragging, team, number } = this.props;
    return connectDragSource(
      <div
        id={number}
        className={team.includes("Bayern") ? "otherPlayer" : "player"} >
          {number}
      </div>
    );
  }
}

Player.propTypes = {
  team: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(Player);
