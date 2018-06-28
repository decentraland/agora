import { getPolls } from 'modules/poll/selectors'

export interface PollsPageProps {
  isLoading: boolean
  polls: ReturnType<typeof getPolls>
  onFetchPolls: Function
}
