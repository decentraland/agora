import { server } from 'decentraland-server'
import { utils } from 'decentraland-commons'

import { Router, blacklist } from '../lib'
import { Poll } from './Poll.model'
import { PollAttributes } from './Poll.types'

export class PollRouter extends Router {
  mount() {
    /**
     * Returns all polls
     */
    this.app.get('/api/polls', server.handleRequest(this.getPolls))
  }

  async getPolls(): Promise<PollAttributes[]> {
    const polls = await Poll.find()
    return utils.mapOmit(polls, blacklist.poll)
  }
}
