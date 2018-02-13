import React, { Component } from 'react';

export default class Square extends Component {
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
