import { server } from 'decentraland-server'
import { SignedMessage } from 'decentraland-eth'
import * as express from 'express'

import { Router } from '../lib'
import { Vote } from './Vote.model'
import { Account } from '../Account'
import { Poll } from '../Poll'
import { Receipt } from '../Receipt'
import { Option } from '../Option'
import { CastVoteOption } from './Vote.types'

export class VoteRouter extends Router {
  mount() {
    /**
     * Returns a full vote by id
     */
    this.app.get('/votes/:id', server.handleRequest(this.getVote))

    /**
     * Returns the votes for a poll
     */
    this.app.get('/polls/:id/votes', server.handleRequest(this.getPollVotes))

    /**
     * Creates a new vote, returns the new id
     */
    this.app.post('/votes', server.handleRequest(this.createVote))
  }

  async getVote(req: express.Request) {
    const id = server.extractFromReq(req, 'id')
    return Vote.findCastVoteById(id)
  }

  async getPollVotes(req: express.Request) {
    const pollId = server.extractFromReq(req, 'id')
    return Vote.findByPollId(pollId)
  }

  async createVote(req: express.Request): Promise<string | undefined> {
    const id = server.extractFromReq(req, 'id')
    const message = server.extractFromReq(req, 'message')
    const signature = server.extractFromReq(req, 'signature')

    const signedMessage = new SignedMessage(message, signature)
    const [pollId, optionId, balance, timestamp] = signedMessage.extract([
      'Poll Id',
      'Option Id',
      'Current Balance',
      'Timestamp'
    ])

    const poll = new Poll()
    await poll.retreive({ id: pollId })

    if (poll.isEmpty()) throw new Error(`Poll not found for id ${pollId}`)
    if (poll.isFinished()) throw new Error('Poll already finished')

    const address = signedMessage.getAddress()

    const vote = new Vote({
      id,
      account_balance: balance,
      account_address: address,
      poll_id: pollId,
      option_id: optionId,
      message,
      signature,
      created_at: new Date(Number(timestamp)),
      updated_at: new Date(Number(timestamp))
    })

    const account = new Account({
      address,
      token_address: poll.get('token_address'),
      balance
    })

    await account.upsert({ target: ['address', 'token_address'] })
    await vote.upsert({ target: ['account_address', 'poll_id'] })

    if (vote.get('id') !== id) {
      throw new Error(`Something went wrong inserting vote ${id}`)
    }

    const option = await Option.findOne(optionId)
    const castVote: CastVoteOption = {
      ...vote.getAll(),
      id,
      option
    }
    const receipt = await Receipt.createFromVote(castVote)

    if (receipt) {
      return receipt.id
    }
  }
}
