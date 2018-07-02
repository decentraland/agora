import {
  Poll,
  PollWithPointers,
  PollWithAssociations
} from 'modules/poll/types'
import { Token } from 'modules/token/types'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'

export function isFinished(poll: Poll) {
  return poll.closes_at < Date.now()
}

export function buildPoll(
  poll: Poll,
  token: Token,
  votes: Vote[],
  options: Option[]
): PollWithPointers {
  return {
    ...poll,
    token_address: token.address,
    vote_ids: votes.map(vote => vote.id),
    option_ids: options.map(option => option.id)
  }
}

export const isDCLToken = (token: Token) =>
  token.symbol === 'MANA' || token.symbol === 'LAND'

export const isDCLPoll = (poll: PollWithAssociations) => isDCLToken(poll.token)
