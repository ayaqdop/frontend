import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Ayaqdop from "../Ayaqdop";
import Login from "../Login/Login";
import { MatchMaking } from "../match-making";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/game" component={Ayaqdop} />
          <Route path="/matchmaking" component={MatchMaking} />
        </Switch>
      </BrowserRouter>
    );
  }
}