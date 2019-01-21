import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`OnChange ${name} ${value}`);
    this.setState({[name]: value});
  }

  login(e) {
    e.preventDefault();
    fetch("https://ayaqdop-backend.herokuapp.com/uuid", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state),
    }).then(() => {
      this.setState({ authenticated: true });
      console.log(this.state);
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/game" />;
    }

    return (
      <main className="login">
        <form>
          <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} />
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} />
          <button onClick={this.login}>login</button>
          <p className="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </main>
    );
  }
}
