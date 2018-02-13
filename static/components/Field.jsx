import React from "react";
import Row from "./Row.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Field extends React.Component {
  render() {
    let counter = 42;
    const rows = " abcdefghijklmnop ".split("").map(a => <Row key={a + counter++} row={a} />);
    return <div className="container">{rows}</div>;
  }
}

export default DragDropContext(HTML5Backend)(Field);
