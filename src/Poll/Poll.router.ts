import { server } from 'decentraland-server'
import { utils } from 'decentraland-commons'
import * as express from 'express'

import { Router, blacklist } from '../lib'
import { Poll } from './Poll.model'
import { PollAttributes } from './Poll.types'

export class PollRouter extends Router {
  mount() {
    /**
     * Returns all polls
     */
    this.app.get('/polls', server.handleRequest(this.getPolls))

    /**
     * Return a poll by id
     * @param {string} id
     */
    this.app.get('/polls/:id', server.handleRequest(this.getPoll))
  }

  async getPolls(): Promise<PollAttributes[]> {
    // @nico we might need to measure the perf hit of returning everything here
    const polls = await Poll.findActiveWithAssociations()
    return utils.mapOmit(polls, blacklist.poll)
  }

  async getPoll(req: express.Request) {
    const id = server.extractFromReq(req, 'id')
    const poll = await Poll.findByIdWithAssociations(id)
    return utils.omit(poll, blacklist.poll)
  }
}
