import React, { Component } from "react";
import deepEqual from "deep-equal";
import ReactDOM from "react-dom";
import Field from "./Field/Field";
import Score from "./Score/Score";
import Game from "../actions/Game";
import openSocket from "socket.io-client";
import { getCookie } from "../actions/helpers";
import "./index.css";

console.log("Started ayaqdop");

class Ayaqdop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gameObjects: {}
    };
    this.socket = openSocket("http://ayaqdop-backend.herokuapp.com");
  }

  componentWillMount() {
    fetch("http://ayaqdop-backend.herokuapp.com/uuid", { method: "POST" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!getCookie("uuid")) {
          document.cookie = "uuid=" + data.uuid;
        }
      });
  }
  componentDidMount() {
    fetch("http://ayaqdop-backend.herokuapp.com/init", { method: "POST" })
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
    if (this.state) {
      this.setState(nextState);
      this.socket.emit("server", { id: getCookie("uuid"), game: gameObjects });
    } else {
      this.state = nextState;
    }
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
        <main>
          <Field gameObjects={gameObjects} />
          <aside>Chat</aside>
          <Score gameObjects={gameObjects} />
        </main>
      );
    }
  }
}

ReactDOM.render(
  <Ayaqdop />,
  document.getElementById("app")
);
