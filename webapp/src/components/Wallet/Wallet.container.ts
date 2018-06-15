import { connect } from 'react-redux'
import { RootState, RootDispatch } from 'types'
import { connectWalletRequest } from 'modules/wallet/actions'
import { WalletActions } from 'modules/wallet/types'
import { WalletProps } from 'components/Wallet/types'
import Wallet from './Wallet'

const mapState = (_: RootState, ownProps: WalletProps): WalletProps => ownProps

const mapDispatch = (dispatch: RootDispatch<WalletActions>) => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect<WalletProps>(mapState, mapDispatch)(Wallet)
