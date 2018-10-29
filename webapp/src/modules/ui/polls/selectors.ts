import { RootState } from 'types'
import { createSelector } from 'reselect'
import { getPolls as getAllPolls } from 'modules/poll/selectors'
import { TableState } from 'modules/ui/table/reducer'
import { PollWithAssociations } from 'modules/poll/types'
import { ModelById } from '@dapps/lib/types'

export const getState = (state: RootState) => state.ui.polls
export const getTotal = (state: RootState) => getState(state).total
export const getPolls = createSelector<
  RootState,
  TableState,
  ModelById<PollWithAssociations>,
  PollWithAssociations[]
>(getState, getAllPolls, (table, polls) => {
  return table.rows.map(id => polls[id])
})
