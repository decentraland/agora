import { connect } from 'react-redux'
import { push, goBack, RouterAction } from 'react-router-redux'
import { env } from 'decentraland-commons'
import { Navbar } from 'decentraland-ui'
import { locations } from 'locations'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import { getWallet, isConnected, isConnecting } from 'modules/wallet/selectors'
import { isModalPage } from 'modules/location/selectors'
import { t } from 'modules/translation/utils'

const mapState = (state: RootState): any => {
  const wallet = getWallet(state) as Wallet
  const isWalletConnected = isConnected(state)
  const manaAddress = env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS', '')

  let mana: string | null = null

  if (isWalletConnected) {
    const balance: number | undefined = wallet.balances[manaAddress]

    if (balance) {
      mana = balance.toLocaleString()
    }
  }

  return {
    mana,
    address: wallet.address,
    isConnected: isWalletConnected,
    isConnecting: isConnecting(state),
    isModal: isModalPage(state),
    connectingMenuItem: t('navbar.connecting')
  }
}

const mapDispatch = (dispatch: RootDispatch<RouterAction>) => ({
  onBack: () => dispatch(goBack()),
  onClickLogo: () => dispatch(push(locations.polls()))
})

export default connect<Navbar>(mapState, mapDispatch)(Navbar)
