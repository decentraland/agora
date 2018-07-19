import { Reducer } from 'redux'
import { loadingReducer } from '@dapps/modules/loading/reducer'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions,
  PollState
} from 'modules/poll/types'
import { FETCH_POLL_OPTIONS_SUCCESS, OptionActions } from 'modules/option/types'
import {
  FETCH_POLL_VOTES_SUCCESS,
  CREATE_VOTE_SUCCESS,
  VoteActions
} from 'modules/vote/types'
import { buildPoll } from 'modules/poll/utils'
import { getBalanceInPoll } from 'modules/wallet/utils'

const INITIAL_STATE: PollState = {
  data: {},
  loading: [],
  error: null
}

export const pollReducer: Reducer<PollState> = (
  state = INITIAL_STATE,
  action: PollActions | OptionActions | VoteActions
): PollState => {
  switch (action.type) {
    case FETCH_POLLS_REQUEST:
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_POLLS_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: action.payload.polls.reduce(
          (polls, pollWithAssociations) => {
            const { token, votes, options, ...poll } = pollWithAssociations

            polls[poll.id] = {
              ...state.data[poll.id],
              ...buildPoll(poll, token, votes, options)
            }
            return polls
          },
          { ...state.data }
        )
      }
    }
    case FETCH_POLL_SUCCESS: {
      const { poll, token, votes, options } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [poll.id]: {
            ...state.data[poll.id],
            ...buildPoll(poll, token, votes, options)
          }
        }
      }
    }
    case FETCH_POLL_VOTES_SUCCESS: {
      const { votes, pollId } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [pollId]: {
            option_ids: [],
            ...state.data[pollId],
            id: pollId,
            vote_ids: votes.map(vote => vote.id)
          }
        }
      }
    }
    case FETCH_POLL_OPTIONS_SUCCESS: {
      const { options, pollId } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [pollId]: {
            vote_ids: [],
            ...state.data[pollId],
            id: pollId,
            option_ids: options.map(option => option.id)
          }
        }
      }
    }
    case CREATE_VOTE_SUCCESS: {
      const { wallet, vote } = action.payload
      const currentPoll = state.data[vote.poll_id]

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [vote.poll_id]: {
            ...currentPoll,
            balance: currentPoll.balance + getBalanceInPoll(wallet, currentPoll)
          }
        }
      }
    }
    case FETCH_POLLS_FAILURE:
    case FETCH_POLL_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
