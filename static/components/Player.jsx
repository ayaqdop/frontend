import React, { Component } from 'react';

export default class Player extends Component {
  onDragStart(e) {
    e.dataTransfer.setData("text/html", e.target.id);
    e.dataTransfer.effectAllowed = "move";
  }
  render() {
    return (
      <div
        id={this.props.number}
        className="player"
        draggable="true"
        onDragStart={this.onDragStart} >
          {this.props.number}
      </div>
      );
  }
}
