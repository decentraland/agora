import { connect } from 'react-redux'
import { RootState, RootDispatch } from 'types'
import { MapStateProps, MapDispatchProps } from './Page.types'
import { isHomePage } from 'modules/location/selectors'
import { connectWalletRequest } from '@dapps/modules/wallet/actions'
import Page from './Page'
import {
  getAddress,
  isConnected,
  isConnecting,
  getData
} from '@dapps/modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => {
  return {
    isHomePage: isHomePage(state),
    address: getAddress(state),
    isConnected: isConnected(state),
    isConnecting: isConnecting(state),
    mana: getData(state).mana
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(connectWalletRequest())
})

export default connect(
  mapState,
  mapDispatch
)(Page)
