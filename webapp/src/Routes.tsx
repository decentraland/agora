import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import App from '@dapps/containers/App'
import SignInPage from '@dapps/containers/SignInPage'

import { locations } from 'locations'
import Hero from 'components/Hero'
import HomePage from 'components/HomePage'
import PollDetailPage from 'components/PollDetailPage'
import VotePage from 'components/VotePage'
import PollsTable from 'components/PollsTable'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact path={locations.root()} component={HomePage} />
        <Route exact path={locations.poll()} component={PollDetailPage} />
        <Route exact path={locations.vote()} component={VotePage} />
        <Route exact path={locations.polls()} component={PollsTable} />
        <Route exact path={locations.signIn()} component={SignInPage} />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return (
      <App activePage="agora" hero={<Hero />}>
        {this.renderRoutes()}
      </App>
    )
  }
}
