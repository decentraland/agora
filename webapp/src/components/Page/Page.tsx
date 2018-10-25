import * as React from 'react'
import { Hero, Navbar, Parallax, Container, Footer } from 'decentraland-ui'
import { Props } from './Page.types'

import './Page.css'

export default class Page extends React.PureComponent<Props> {
  renderHero() {
    return (
      <Hero
        title="Help us build Decentraland"
        subtitle="Join the discussion"
        height={442}
      >
        <Parallax>
          <Parallax.Layer depth={0.3}>
            <div className="pyramid small" />
          </Parallax.Layer>
          <Parallax.Layer depth={1.5}>
            <div className="pyramid large" />
          </Parallax.Layer>
        </Parallax>
      </Hero>
    )
  }

  render() {
    const {
      isHomePage,
      children,
      address,
      mana,
      isConnected,
      isConnecting,
      onSignIn
    } = this.props

    return (
      <>
        <Navbar
          activePage="agora"
          address={address}
          mana={mana}
          isConnected={isConnected}
          isConnecting={isConnecting}
          onSignIn={onSignIn}
        >
          {isHomePage ? this.renderHero() : null}
        </Navbar>
        <div className={`Page ${isHomePage ? 'is-homepage' : ''}`}>
          <Container>{children}</Container>
        </div>
        <Footer locale="en" locales={['en']} />
      </>
    )
  }
}
