import { Vote } from 'modules/vote/types'
import { PollWithAssociations } from 'modules/poll/types'

export type Props = {
  vote: Vote | null
  poll: PollWithAssociations
}
