import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'
import { RootState, RootDispatch } from 'types'
import { locations } from 'locations'
import { MapStateProps, MapDispatchProps } from './Page.types'
import { isModalPage } from 'modules/location/selectors'
import Page from './Page'

const mapState = (state: RootState): MapStateProps => {
  return {
    isModal: isModalPage(state)
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onBack: () => dispatch(goBack()),
  onClickLogo: () => dispatch(push(locations.polls()))
})

export default connect(
  mapState,
  mapDispatch
)(Page)
