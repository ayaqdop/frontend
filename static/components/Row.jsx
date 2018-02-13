import React from 'react';
import Square from "./Square.jsx";

export default class Row extends React.Component {
  isNumericColumn(column) {
    return column === 0 || column === 25;
  }
  isAlphaRow(row) {
    return row === " ";
  }
  calculatePosition(row, column) {
    return row + column;
  }
  calculateDescription(row, column) {
    let result = "";
    if (!this.isNumericColumn(column) && this.isAlphaRow(row)){
        result = column;
      } else if (this.isNumericColumn(column)){
        result = row;
      }
    return result;
  }
  calculateColor(row, column) {
    let result = "pitch-green-dark";

    if (!this.isNumericColumn(column) && !this.isAlphaRow(row)) {
      result = (column % 2 != row.charCodeAt(0) % 2)
        ? "pitch-green-dark"
        : "pitch-green-middle";
    }
    return result;
  }
  
  render() {
    const row = this.props.row;
    const columns = Array.from(new Array(26), (e, i) => i).map(column =>
    {
      return (
        <Square
          key={row + column}
          position={this.calculatePosition(row, column)}
          color={this.calculateColor(row, column)}
          initContent={this.calculateDescription(row, column)} />
      );
    }
  );
    return <div className="row">{columns}</div>;
  }
}
