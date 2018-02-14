import React from "react";
import Square from "./Square.jsx";
import { calculatePosition, calculateColor, calculateDescription } from "./Helpers";

export default class BoardSquare extends React.Component {
  render() {
      const { row, column } = this.props;
      return (
        <Square
          key={row + column}
          position={calculatePosition(row, column)}
          color={calculateColor(row, column)}
          initContent={calculateDescription(row, column)} />
      );
  }
}
