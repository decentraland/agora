import { connect } from 'react-redux'
import { push, goBack, RouterAction } from 'react-router-redux'
import { Navbar } from 'decentraland-ui'
import { locations } from 'locations'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import { getWallet, isConnected, isConnecting } from 'modules/wallet/selectors'
import { isModalPage } from 'modules/location/selectors'

const mapState = (state: RootState): any => {
  const wallet = getWallet(state) as Wallet
  let mana
  if (wallet && wallet.balances && wallet.balances.mana) {
    mana = wallet.balances.mana
  }
  return {
    mana,
    address: wallet.address,
    isConnected: isConnected(state),
    isConnecting: isConnecting(state),
    isModal: isModalPage(state)
  }
}

const mapDispatch = (dispatch: RootDispatch<RouterAction>) => ({
  onBack: () => dispatch(goBack()),
  onClickLogo: () => dispatch(push(locations.polls()))
})

export default connect<Navbar>(mapState, mapDispatch)(Navbar)
