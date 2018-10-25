import { RootState } from 'types'
import { createSelector } from 'reselect'
import { getPolls } from 'modules/poll/selectors'
import { TableState } from 'modules/ui/table/reducer'
import { PollWithAssociations } from 'modules/poll/types'
import { ModelById } from '@dapps/lib/types'

export const getState = (state: RootState) => state.ui.decentralandPolls
export const getDecentralandPolls = createSelector<
  RootState,
  TableState,
  ModelById<PollWithAssociations>,
  PollWithAssociations[]
>(getState, getPolls, (table, polls) => {
  return table.rows.map(id => polls[id])
})
