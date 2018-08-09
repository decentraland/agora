import { connect } from 'react-redux'
import { RouterAction, goBack, push } from 'react-router-redux'
import { RootState, RootDispatch } from 'types'
import { locations } from 'locations'
import { PageProps } from 'components/Page/types'
import { isModalPage } from 'modules/location/selectors'
import Page from './Page'

const mapState = (state: RootState): Partial<PageProps> => {
  return {
    isModal: isModalPage(state)
  }
}

const mapDispatch = (dispatch: RootDispatch<RouterAction>) => ({
  onBack: () => dispatch(goBack()),
  onClickLogo: () => dispatch(push(locations.polls()))
})

export default connect<PageProps>(
  mapState,
  mapDispatch
)(Page as any)
