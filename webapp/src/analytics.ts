import { add } from '@dapps/modules/analytics/utils'
import {
  CREATE_VOTE_SUCCESS,
  CreateVoteSuccessAction
} from 'modules/vote/actions'

add(CREATE_VOTE_SUCCESS, 'Vote', (action: CreateVoteSuccessAction) => ({
  poll_id: action.payload.vote.poll_id,
  option_id: action.payload.vote.option_id,
  address: action.payload.wallet.address
}))
