import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Ayaqdop from "../Ayaqdop";
import Login from "../Login/Login";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/game" component={Ayaqdop} />
        </Switch>
      </BrowserRouter>
    );
  }
}