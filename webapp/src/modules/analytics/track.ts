import { add } from 'modules/analytics/utils'
import { CREATE_VOTE_SUCCESS, CreateVoteSuccess } from 'modules/vote/types'

add(CREATE_VOTE_SUCCESS, 'Vote', (action: CreateVoteSuccess) => ({
  poll_id: action.payload.vote.poll_id,
  option_id: action.payload.vote.option_id,
  address: action.payload.wallet.address
}))
