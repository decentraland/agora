import * as React from 'react'
import { Header, Button } from 'decentraland-ui'
import { t, T } from '@dapps/modules/translation/utils'
import { isMobile } from '@dapps/lib/utils'
import WalletIcon from './WalletIcon'
import { Props, State } from './SignIn.types'
import './SignIn.css'

export default class SignIn extends React.PureComponent<Props, State> {
  static defaultProps = {
    center: true
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.hasError && !this.state.hasError) {
      this.setState({
        hasError: true
      })
    } else if (!nextProps.hasError && this.state.hasError) {
      this.setState({
        hasError: false
      })
    }
  }

  render() {
    const { center, isConnecting, isConnected, onConnect } = this.props
    let classes = 'SignIn'
    if (center) {
      classes += ' center'
    }
    let errorClasses = 'error'
    if (this.state.hasError && !isConnecting && !isConnected) {
      errorClasses += ' visible'
    }
    return (
      <div className={classes}>
        <WalletIcon />
        <Header>{t('sign_in.get_started')}</Header>
        <p className="message">
          {isMobile() ? (
            <T
              id="sign_in.options.mobile"
              values={{
                coinbase_link: (
                  <a
                    href="https://wallet.coinbase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Coinbase Wallet
                  </a>
                ),
                imtoken_link: (
                  <a
                    href="https://token.im"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    imToken
                  </a>
                )
              }}
            />
          ) : (
            <T
              id="sign_in.options.desktop"
              values={{
                metamask_link: (
                  <a
                    href="https://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MetaMask
                  </a>
                ),
                ledger_nano_link: (
                  <a
                    href="https://www.ledgerwallet.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ledger Nano S
                  </a>
                )
              }}
            />
          )}
        </p>

        <Button
          primary
          onClick={onConnect}
          disabled={isConnecting || isConnected}
        >
          {t(
            isConnecting
              ? 'sign_in.connecting'
              : isConnected
                ? 'sign_in.connected'
                : 'sign_in.connect'
          )}
        </Button>

        <p className={errorClasses}>{t('sign_in.error')}</p>
      </div>
    )
  }
}
