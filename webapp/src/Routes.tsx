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
import { Container } from 'decentraland-ui'

export default class Routes extends React.Component {
  withApp = (Component: React.ComponentType<any>) => (props: any) => (
    <App activePage="agora" locales={['en', 'es', 'fr', 'zh', 'ko', 'ja']}>
      <Container>
        <Component {...props} />
      </Container>
    </App>
  )

  withHero = (Component: React.ComponentType<any>) => (props: any) => (
    <App
      activePage="agora"
      locales={['en', 'es', 'fr', 'zh', 'ko', 'ja']}
      isFullscreen
      isOverlay
    >
      <Hero />
      <Container>
        <Component {...props} />
      </Container>
    </App>
  )

  render() {
    return (
      <Switch>
        <Route
          exact
          path={locations.root()}
          component={this.withHero(HomePage)}
        />
        <Route
          exact
          path={locations.poll()}
          component={this.withApp(PollDetailPage)}
        />
        <Route
          exact
          path={locations.vote()}
          component={this.withApp(VotePage)}
        />
        <Route
          exact
          path={locations.polls()}
          component={this.withApp(PollsTable)}
        />
        <Route
          exact
          path={locations.signIn()}
          component={this.withApp(SignInPage)}
        />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }
}
