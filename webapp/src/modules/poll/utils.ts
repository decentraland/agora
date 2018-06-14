import { Poll } from 'modules/poll/types'

export function isFinished(poll: Poll) {
  return poll.closes_at < Date.now()
}
