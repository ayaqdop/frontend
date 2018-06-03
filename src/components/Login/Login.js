import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
    this.login = this.login.bind(this);
  }
  login(e) {
    e.preventDefault();
    fetch("https://ayaqdop-backend.herokuapp.com/uuid", {
      method: "POST",
      credentials: "include" })
      .then(() => {
        this.setState({ authenticated: true });
      });
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/game" />;
    }

    return (
      <main className="login">
        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button onClick={this.login}>login</button>
          <p className="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </main>
    );
  }
}
