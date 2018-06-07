import { server } from 'decentraland-server'
import { utils } from 'decentraland-commons'

import { Router, blacklist } from '../lib'
import { Token } from './Token.model'
import { TokenAttributes } from './Token.types'

export class TokenRouter extends Router {
  mount() {
    /**
     * Returns all tokens
     */
    this.app.get('/api/tokens', server.handleRequest(this.getTokens))
  }

  async getTokens(): Promise<TokenAttributes[]> {
    const tokens = await Token.find<TokenAttributes>()
    return utils.mapOmit(tokens, blacklist.token)
  }
}
