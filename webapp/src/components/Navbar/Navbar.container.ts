import { connect } from 'react-redux'
import { Navbar } from 'decentraland-ui'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import {
  getData as getWallet,
  isConnected,
  isConnecting
} from 'modules/wallet/selectors'
import { isModalPage } from 'modules/location/selectors'
import { push, goBack, RouterAction } from 'react-router-redux'
import { locations } from 'locations'

const mapState = (state: RootState): any => {
  const wallet = getWallet(state) as Wallet

  return {
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
