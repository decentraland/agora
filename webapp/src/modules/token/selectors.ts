import { RootState } from 'types'
import { TokenState } from 'modules/token/types'

export const getState: (state: RootState) => TokenState = state => state.token

export const getData: (state: RootState) => TokenState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => TokenState['error'] = state =>
  getState(state).error
