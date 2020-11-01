import React from "react";
import PropTypes from "prop-types";
import "./square.css";

class Square extends React.Component {
  render() {
    const { initContent, children } = this.props;
    const show = children ? children : initContent;
    return (
      <div
        className="square unselectable">
        {show}
      </div>
    );
  }
}

Square.propTypes = {
  initContent: PropTypes.any,
  children: PropTypes.any
};

export default Square;
