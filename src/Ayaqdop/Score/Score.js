import React from "react";
import PropTypes from "prop-types";
import "./Score.css";

class Score extends React.Component {
  render() {
    const { gameObjects } = this.props;
    const currentTeam = gameObjects.teams[0].moves > 0
      ? gameObjects.teams[0]
      : gameObjects.teams[1];
    const side = gameObjects.teams[0].moves > 0
      ? "moves-left"
      : "moves-right";

    return (
      <footer>
        <div>{gameObjects.teams[0].score}   :   {gameObjects.teams[1].score}</div>
        <div>
          {gameObjects.teams[0].name}      {gameObjects.teams[1].name}
        </div>
        <div className={side}>
          {currentTeam.moves} moves left
        </div>
      </footer>
    );
  }
}

Score.propTypes = {
  gameObjects: PropTypes.object.isRequired
};

export default Score;
