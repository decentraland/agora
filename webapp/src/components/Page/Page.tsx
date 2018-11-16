import * as React from 'react'

import { Hero, Parallax, Container } from 'decentraland-ui'
import Navbar from '@dapps/containers/Navbar'
import Footer from '@dapps/containers/Footer'
import { t } from '@dapps/modules/translation/utils'

import { Props } from './Page.types'
import './Page.css'

export default class Page extends React.PureComponent<Props> {
  renderHero() {
    return (
      <Hero
        title={t('homepage.title')}
        subtitle={t('homepage.subtitle')}
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
    const { isHomePage, children, onSignIn, isSignIn } = this.props
    return (
      <>
        <Navbar activePage="agora" isSignIn={isSignIn} onSignIn={onSignIn}>
          {isHomePage ? this.renderHero() : null}
        </Navbar>
        <div className={`Page ${isHomePage ? 'is-homepage' : ''}`}>
          <Container>{children}</Container>
        </div>
        <Footer />
      </>
    )
  }
}
