import { server } from 'decentraland-server'
import * as express from 'express'

import { Router } from '../lib'
import { Option } from './Option.model'

export class OptionRouter extends Router {
  mount() {
    /**
     * Returns the votes for a poll
     */
    this.app.get(
      '/api/polls/:id/options',
      server.handleRequest(this.getPollVotes)
    )
  }

  async getPollVotes(req: express.Request): Promise<any> {
    const pollId = server.extractFromReq(req, 'id')
    return Option.findByPollId(pollId)
  }
}
