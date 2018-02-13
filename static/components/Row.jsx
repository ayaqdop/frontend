import React from "react";
import Square from "./Square.jsx";
import { calculatePosition, calculateColor, calculateDescription } from "./Helpers";

export default class Row extends React.Component {
  render() {
    const row = this.props.row;
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <Square
          key={row + column}
          position={calculatePosition(row, column)}
          color={calculateColor(row, column)}
          initContent={calculateDescription(row, column)} />
        );
      }
    );
    return <div className="row">{columns}</div>;
  }
}
