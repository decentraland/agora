import { connect } from 'react-redux'

import { navigateTo } from '@dapps/modules/location/actions'
import { isHomePage, isSignIn } from 'modules/location/selectors'

import { locations } from 'locations'
import { RootState, RootDispatch } from 'types'

import Page from './Page'
import { MapStateProps, MapDispatchProps } from './Page.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isHomePage: isHomePage(state),
    isSignIn: isSignIn(state)
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(navigateTo(locations.signIn()))
})

export default connect(
  mapState,
  mapDispatch
)(Page)
