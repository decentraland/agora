import { Vote } from 'modules/vote/types'
import { PollWithAssociations } from 'modules/poll/types'

export type YourVoteProps = {
  vote: Vote | null
  poll: PollWithAssociations
}
