import React from "react";
import deepEqual from "deep-equal";
import Field from "./Field/Field";
import Score from "./Score/Score";
import Game from "./actions/Game";
import Chat from "./Chat/Chat";
import openSocket from "socket.io-client";
import { getUuid } from "./actions/helpers";
import "./index.css";
import img from "./loading.gif";

export default class Ayaqdop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gameObjects: {}
    };
    this.socket = openSocket(API);
  }

  componentDidMount() {
    fetch(`${API}/init`, { method: "POST" })
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            gameObjects: data
          });
          this.game = new Game(this.handleChange.bind(this), data);

          this.socket.on("client", msg => {
            if (
              msg.id !== getUuid() &&
              !deepEqual(this.state.gameObjects, msg.game)
            ) {
              this.game.gameObjects = msg.game;
              this.handleChange(msg.game);
            }
          });

          this.socket.emit("new gamer", getUuid());
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleChange(gameObjects) {
    const nextState = { gameObjects };
    this.setState(nextState);
    this.socket.emit("server", { id: getUuid(), game: gameObjects });
  }

  componentWillUnmount() {
    this.game = null;
  }

  render() {
    const { error, isLoaded, gameObjects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <img src={img} className="centered" />;
    } else {
      return (
        <main className="game">
          <Field gameObjects={gameObjects} />
          <Chat />
          <Score gameObjects={gameObjects} />
        </main>
      );
    }
  }
}
