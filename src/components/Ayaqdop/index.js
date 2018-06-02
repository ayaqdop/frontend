import React from "react";
import deepEqual from "deep-equal";
import Field from "./Field/Field";
import Score from "./Score/Score";
import Game from "./actions/Game";
import openSocket from "socket.io-client";
import { getCookie } from "./actions/helpers";
import "./index.css";

export default class Ayaqdop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gameObjects: {}
    };
    this.socket = openSocket("https://ayaqdop-backend.herokuapp.com");
  }

  componentDidMount() {
    fetch("https://ayaqdop-backend.herokuapp.com/uuid", {
      method: "POST",
      credentials: "include" });

    fetch("https://ayaqdop-backend.herokuapp.com/init", { method: "POST" })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          gameObjects: data
        });
        console.log(data);
        this.game = new Game(this.handleChange.bind(this), data);

        this.socket.on("client", (msg) => {
          if (msg.id !== getCookie("uuid")
            && !deepEqual(this.state.gameObjects, msg.game)) {
            this.game.gameObjects = msg.game;
            this.handleChange(msg.game);
          }
        });
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
    this.socket.emit("server", { id: getCookie("uuid"), game: gameObjects });
  }

  componentWillUnmount() {
    this.game = null;
  }

  render() {
    const { error, isLoaded, gameObjects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main className="game">
          <Field gameObjects={gameObjects} />
          <aside>Chat</aside>
          <Score gameObjects={gameObjects} />
        </main>
      );
    }
  }
}

