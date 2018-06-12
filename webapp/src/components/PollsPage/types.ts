import { ModelById } from 'lib/types'
import { Poll } from 'modules/poll/types'

export interface PollsPageProps {
  polls: ModelById<Poll>
  isLoading: boolean
  onFetchPolls: Function
}
