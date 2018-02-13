import React, { Component } from 'react';
import Row from "./Row.jsx";

export default class Field extends Component {
  render() {
    const rows = ' abcdefghijklmnop '.split('').map(a => <Row row={a} />);
    return <div className="container">{rows}</div>;
  }
}
