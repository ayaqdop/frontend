import React, { Component } from "react";
import ReactDOM from "react-dom";
import Field from "./Field/Field";
import { observe } from "../actions/Game";

console.log("Started ayaqdop");

class Ayaqdop extends Component {
	constructor(props) {
		super(props);
		this.state = {
      error: null,
      isLoaded: false,
      gameObjects: {}
    };
	}

	componentDidMount() {
    fetch("http://ayaqdop-backend.herokuapp.com/init", { method: "POST" })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            gameObjects: result
					});
					console.log(result);
					this.unobserve = observe(this.handleChange.bind(this), result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
	}		

	handleChange(gameObjects) {
		const nextState = { gameObjects };
		if (this.state) {
			this.setState(nextState);
		} else {
			this.state = nextState;
		}
	}

	componentWillUnmount() {
		this.unobserve();
	}

	render() {
		const { error, isLoaded, gameObjects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
			return (
				<Field gameObjects={gameObjects} />
			);
		}
	}
}

ReactDOM.render(
  <Ayaqdop />,
  document.getElementById("app")
);
