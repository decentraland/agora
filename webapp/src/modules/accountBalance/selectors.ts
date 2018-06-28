import { RootState } from 'types'
import { AccountBalanceState } from 'modules/accountBalance/types'

export const getState: (state: RootState) => AccountBalanceState = state =>
  state.accountBalance

export const getData: (
  state: RootState
) => AccountBalanceState['data'] = state => getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (
  state: RootState
) => AccountBalanceState['error'] = state => getState(state).error
