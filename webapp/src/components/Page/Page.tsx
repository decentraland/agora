import * as React from 'react'
import { Hero, Navbar, Parallax, Container, Footer } from 'decentraland-ui'
import { Props } from './Page.types'

import './Page.css'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

export default class Page extends React.PureComponent<Props> {
  renderHero() {
    return (
      <Hero
        title="Help us build Decentraland"
        subtitle="Join the discussion"
        height={320}
      >
        <Parallax>
          <Parallax.Layer depth={0.2}>
            <div className="pyramid small" />
          </Parallax.Layer>
          <Parallax.Layer depth={0.8}>
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
          i18n={{
            account: {
              connecting: t('@dapps.navbar.account.connecting'),
              signIn: t('@dapps.navbar.account.signIn')
            },
            menu: {
              agora: 'Agora',
              marketplace: 'Marketplace',
              blog: 'Blog',
              developers: 'Developers'
            }
          }}
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
