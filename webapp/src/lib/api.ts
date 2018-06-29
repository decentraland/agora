import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { env, Log } from 'decentraland-commons'

const httpClient = axios.create()
const URL = env.get('REACT_APP_API_URL', '')
const log = new Log('API')

export interface APIParam {
  [key: string]: any
}
interface Response {
  ok: boolean
  data: any
  error: string
}

export class API {
  fetchTokens() {
    return this.request('get', '/tokens', {})
  }

  fetchPolls() {
    return this.request('get', '/polls', {})
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

  request(method: string, path: string, params?: APIParam) {
    let options: AxiosRequestConfig = {
      method,
      url: this.getUrl(path)
    }

    if (params) {
      if (method === 'get') {
        options.params = params
      } else {
        options.data = params
      }
    }

    log.info(options.url)

    return httpClient
      .request(options)
      .then((response: AxiosResponse<Response>) => {
        const data = response.data
        const result = data.data // One for axios data, another for the servers data

        return data && !data.ok
          ? Promise.reject({ message: data.error, data: result })
          : result
      })
      .catch((error: AxiosError) => {
        console.warn(`[API] HTTP request failed: ${error.message || ''}`, error)
        return Promise.reject(error)
      })
  }

  getUrl(path: string) {
    return `${URL}${path}`
  }
}

export const api = new API()
