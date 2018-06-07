import { RootState } from 'types'
import { OptionState } from 'modules/option/types'

export const getState: (state: RootState) => OptionState = state => state.option

export const getData: (state: RootState) => OptionState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => OptionState['error'] = state =>
  getState(state).error
