import { connect } from 'react-redux'
import {
  getAddress,
  isConnected,
  isConnecting,
  getData
} from '@dapps/modules/wallet/selectors'
import { navigateTo } from '@dapps/modules/location/actions'
import { RootState, RootDispatch } from 'types'
import { locations } from 'locations'
import { isHomePage, isSignIn } from 'modules/location/selectors'
import { MapStateProps, MapDispatchProps } from './Page.types'
import Page from './Page'

const mapState = (state: RootState): MapStateProps => {
  return {
    isHomePage: isHomePage(state),
    isSignIn: isSignIn(state),
    address: getAddress(state),
    isConnected: isConnected(state),
    isConnecting: isConnecting(state),
    mana: getData(state).mana
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(navigateTo(locations.signIn()))
})

export default connect(
  mapState,
  mapDispatch
)(Page)
