import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { locations } from 'locations'

import Wallet from 'components/Wallet'
import Page from 'components/Page'
import HomePage from 'components/HomePage'
import PollDetailPage from 'components/PollDetailPage'
import VotePage from 'components/VotePage'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={HomePage} />
        <Route
          exact={true}
          path={locations.poll()}
          component={PollDetailPage}
        />
        <Route exact={true} path={locations.vote()} component={VotePage} />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return (
      <Wallet>
        <Page>{this.renderRoutes()}</Page>
      </Wallet>
    )
  }
}
