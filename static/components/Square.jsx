import React from "react";

export default class Square extends React.Component {
  render() {
    return (
      <div
        id={this.props.position}
        className={"square unselectable " + this.props.color}>
          {this.props.initContent}
      </div>
    );
  }
}
