import * as React from 'react'

import { Container } from 'decentraland-ui'
import TranslationProvider from 'components/TranslationProvider'
import Navbar from 'components/Navbar'

import './Page.css'

export default class Page extends React.PureComponent {
  static defaultProps = {
    children: null
  }

  render() {
    const { children } = this.props

    return (
      <TranslationProvider>
        <Navbar />
        <div className="Page">
          <Container>{children}</Container>
        </div>
      </TranslationProvider>
    )
  }
}
