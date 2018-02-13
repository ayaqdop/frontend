import React, { Component } from 'react';

export default class Square extends Component {
  allowDrop(e) {
    e.preventDefault();
  }
  onDrop(e) {
    let draggedId = e.dataTransfer.getData('text/html');
    let newContent =  document.getElementById(draggedId);
    console.log("Before: " + newContent.parentNode.id);
    e.target.appendChild(newContent);
    console.log("After: " + newContent.parentNode.id);

    window.socket.emit("server", newContent.parentNode.id);
  }
  render() {
    return (
      <div
        id={this.props.position}
        className={"square unselectable " + this.props.color}
        onDragOver={this.allowDrop}
        onDrop={this.onDrop}>
          {this.props.initContent}
      </div>
    );
  }
}
