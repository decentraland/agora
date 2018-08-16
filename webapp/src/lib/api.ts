import { env } from 'decentraland-commons'
import { BaseAPI } from '@dapps/lib/api'
import { PollsRequestFilters } from 'modules/poll/types'

const URL = env.get('REACT_APP_API_URL', '')

export class API extends BaseAPI {
  fetchTokens() {
    return this.request('get', '/tokens', {})
  }

  fetchPolls(filters: PollsRequestFilters) {
    return this.request('get', '/polls', filters)
  }

  fetchPoll(id: string) {
    return this.request('get', `/polls/${id}`, {})
  }

  fetchPollOptions(id: string) {
    return this.request('get', `/polls/${id}/options`, {})
  }

  fetchPollVotes(id: string) {
    return this.request('get', `/polls/${id}/votes`, {})
  }

  fetchTranslations(locale: string) {
    return this.request('get', `/translations/${locale}`, {})
  }

  createVote(message: string, signature: string, id?: string) {
    return this.request('post', '/votes', { message, signature, id })
  }

  fetchAccountBalances(address: string) {
    return this.request('get', `/accountBalances/${address}`, {})
  }
}

export const api = new API(URL)
