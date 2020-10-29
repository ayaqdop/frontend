import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Auth from '../Auth/Auth'
import { MatchMaking } from '../match-making'
import { Match } from '../match'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/auth' />
          </Route>
          <Route exact path='/auth' component={Auth} />
          <Route path='/matchmaking' component={MatchMaking} />
          <Route path='/match/:matchId' component={Match} />
        </Switch>
      </BrowserRouter>
    )
  }
}
