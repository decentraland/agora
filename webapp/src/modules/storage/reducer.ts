import { AnyAction } from 'redux'
import * as storage from 'redux-storage'
import { RootReducer } from 'types'
import { STORAGE_LOAD, StorageState } from 'modules/storage/types'

const INITIAL_STATE: StorageState = {
  loading: true
}

export function storageReducerWrapper(
  reducer: RootReducer,
  merger?: storage.StateMerger
) {
  return storage.reducer(reducer, merger)
}

export function storageReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case STORAGE_LOAD:
      return {
        loading: false
      }
    default:
      return state
  }
}
