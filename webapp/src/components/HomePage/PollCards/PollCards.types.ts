import { PollWithAssociations } from 'modules/poll/types'

export type Props = {
  polls: PollWithAssociations[]
  title: string
  meta: string
  onClick: (poll: PollWithAssociations) => void
  onViewMore: () => void
}
