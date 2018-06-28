import { server } from 'decentraland-server'
import * as express from 'express'

import { Router } from '../lib'
import { Option } from './Option.model'
import { OptionAttributes } from './Option.types'

export class OptionRouter extends Router {
  mount() {
    /**
     * Returns the votes for a poll
     */
    this.app.get('/polls/:id/options', server.handleRequest(this.getPollVotes))
  }

  async getPollVotes(req: express.Request) {
    const pollId = server.extractFromReq(req, 'id')
    return Option.find<OptionAttributes>({ poll_id: Number(pollId) })
  }
}
