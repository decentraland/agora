import * as React from 'react'
import { connect } from 'react-redux'
import { push, goBack, RouterAction } from 'react-router-redux'
import { env } from 'decentraland-commons'
import { Navbar, Menu, NavbarProps } from 'decentraland-ui'
import { isConnected, isConnecting } from '@dapps/modules/wallet/selectors'
import { locations } from 'locations'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import { getWallet } from 'modules/wallet/selectors'
import { isModalPage } from 'modules/location/selectors'
import { t } from '@dapps/modules/translation/utils'

const mapState = (state: RootState): NavbarProps => {
  const wallet = getWallet(state) as Wallet
  const isWalletConnected = isConnected(state)
  const manaAddress = env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS', '')

  let mana

  if (isWalletConnected) {
    const balance = wallet.balances[manaAddress]
    if (balance) {
      mana = balance
    }
  }

  return {
    mana,
    address: wallet.address,
    isConnected: isWalletConnected,
    isConnecting: isConnecting(state),
    isModal: isModalPage(state),
    connectingMenuItem: <Menu.Item>{t('navbar.connecting')}</Menu.Item>
  }
}

const mapDispatch = (dispatch: RootDispatch<RouterAction>) => ({
  onBack: () => dispatch(goBack()),
  onClickLogo: () => dispatch(push(locations.polls()))
})

export default connect<NavbarProps>(mapState, mapDispatch)(Navbar)
