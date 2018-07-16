import { RootState } from 'types'
import { StorageState } from 'modules/storage/types'

export const getState: (state: RootState) => StorageState = state =>
  state.storage

export const isLoading: (state: RootState) => StorageState['loading'] = state =>
  getState(state).loading
