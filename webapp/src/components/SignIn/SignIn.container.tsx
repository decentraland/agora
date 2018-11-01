import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'types'
import { connectWalletRequest } from '@dapps/modules/wallet/actions'
import {
  isConnecting,
  isConnected,
  getError
} from '@dapps/modules/wallet/selectors'
import SignIn from './SignIn'
import { MapDispatchProps, MapStateProps } from './SignIn.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnecting: isConnecting(state),
  isConnected: isConnected(state),
  hasError: !!getError(state)
})

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(
  mapState,
  mapDispatch
)(SignIn)
