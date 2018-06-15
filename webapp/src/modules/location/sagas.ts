import { takeLatest, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { RootState } from 'types'
import { NavigateTo, NAVIGATE_TO } from 'modules/location/types'

export function* locationSaga() {
  yield takeLatest(NAVIGATE_TO, handleNavigateTo)
}

function* handleNavigateTo(action: NavigateTo) {
  // We're aware of https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
  // But in this particular case, we're outside the lifecycle of React so it shouldn't be a problem
  const { pathname, search } = yield select(
    (state: RootState) => state.router.location
  )
  if (pathname + search !== action.payload.url) {
    yield put(push(action.payload.url))
  }
}
