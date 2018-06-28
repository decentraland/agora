import { RootState } from 'types'
import { AccountState } from 'modules/account/types'

export const getState: (state: RootState) => AccountState = state =>
  state.account

export const getData: (state: RootState) => AccountState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => AccountState['error'] = state =>
  getState(state).error
