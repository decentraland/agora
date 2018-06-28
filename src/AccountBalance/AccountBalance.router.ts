import { server } from 'decentraland-server'
import * as express from 'express'

import { Router } from '../lib'
import { AccountBalance } from './AccountBalance.model'
import { AccountBalanceAttributes } from './AccountBalance.types'

export class AccountBalanceRouter extends Router {
  mount() {
    /**
     * Returns the votes for a poll
     */
    this.app.get(
      '/accountBalances/:address',
      server.handleRequest(this.getAccountBalances)
    )
  }

  async getAccountBalances(req: express.Request) {
    const address = server.extractFromReq(req, 'address')
    return AccountBalance.find<AccountBalanceAttributes>({ address })
  }
}
