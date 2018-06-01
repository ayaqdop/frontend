import React from "react";
import "./Score.css";

export default class Score extends React.Component {
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
        <div>
          <span>{gameObjects.teams[0].score}  :   {gameObjects.teams[1].score}</span>
        </div>
        <div>
          <span>{gameObjects.teams[0].name}      {gameObjects.teams[1].name}</span>
        </div>
        <div className={side}>
          <span>{currentTeam.moves} moves left</span>
        </div>
      </footer>
    );
  }
}
