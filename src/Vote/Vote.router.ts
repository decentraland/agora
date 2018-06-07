import { server } from 'decentraland-server'
import { SignedMessage } from 'decentraland-eth'
import * as express from 'express'

import { Router } from '../lib'
import { Vote } from './Vote.model'
import { Account } from '../Account'
import { Poll, PollAttributes } from '../Poll'

export class VoteRouter extends Router {
  mount() {
    /**
     * Creates a new vote, returns the new id
     */
    this.app.post('/api/votes', server.handleRequest(this.createVote))
  }

  async createVote(req: express.Request): Promise<number> {
    const message = server.extractFromReq(req, 'message')
    const signature = server.extractFromReq(req, 'signature')

    const signedMessage = new SignedMessage(message, signature)
    const [pollId, optionId, balance, timestamp] = signedMessage.extract([
      'Poll Id',
      'Option Id',
      'Current Balance',
      'Timestamp'
    ])

    const poll = await Poll.findOne<PollAttributes>(pollId)
    if (!poll) {
      throw new Error(`Poll not found for id ${pollId}`)
    }

    const address = signedMessage.getAddress()

    const vote = new Vote({
      address: address,
      poll_id: Number(pollId),
      option_id: Number(optionId),
      signed_message: message,
      signature: signature,
      created_at: new Date(timestamp)
    })
    await vote.insert()

    const account = new Account({
      address,
      balance,
      token_id: poll.token_id
    })
    await account.insert()

    return vote.attributes.id
  }
}
