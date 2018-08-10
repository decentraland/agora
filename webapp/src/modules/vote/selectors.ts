import { RootState } from 'types'
import { VoteState } from 'modules/vote/reducer'

export const getState: (state: RootState) => VoteState = state => state.vote

export const getData: (state: RootState) => VoteState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => VoteState['error'] = state =>
  getState(state).error
