import { createSelector } from 'reselect'
import { RootState } from 'types'
import { isDistrictTokenAddress } from 'modules/token/district_token/utils'
import { TokenState } from 'modules/token/reducer'

export const getState: (state: RootState) => TokenState = state => state.token

export const getData: (state: RootState) => TokenState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => TokenState['error'] = state =>
  getState(state).error

export const getContractTokens = createSelector<
  RootState,
  TokenState['data'],
  TokenState['data']
>(getData, tokens =>
  Object.keys(tokens)
    .filter(address => !isDistrictTokenAddress(address))
    .reduce((contractTokens, address) => {
      contractTokens[address] = tokens[address]
      return contractTokens
    }, {})
)
