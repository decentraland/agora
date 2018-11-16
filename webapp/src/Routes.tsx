import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { locations } from 'locations'

import Page from 'components/Page'
import HomePage from 'components/HomePage'
import PollDetailPage from 'components/PollDetailPage'
import VotePage from 'components/VotePage'
import PollsTable from 'components/PollsTable'
import SignInPage from '@dapps/containers/SignInPage'

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
    return <Page>{this.renderRoutes()}</Page>
  }
}
