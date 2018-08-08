import * as React from 'react'

import { Container } from 'decentraland-ui'
import Navbar from '@dapps/containers/Navbar'
import { PageProps } from 'components/Page/types'

import './Page.css'

export default class Page extends React.PureComponent<PageProps> {
  static defaultProps = {
    children: null
  }

  render() {
    const { children, onBack, onClickLogo, isModal } = this.props

    return (
      <>
        <Navbar onBack={onBack} onClickLogo={onClickLogo} isModal={isModal} />
        <div className="Page">
          <Container>{children}</Container>
        </div>
      </>
    )
  }
}
