import { server } from 'decentraland-server'
import * as express from 'express'

import { Router } from '../lib'

export class AppRouter extends Router {
  mount() {
    this.app.get('/status', server.handleRequest(this.getAppStatus))
  }

  async getAppStatus(_: express.Request) {
    return { status: 200 }
  }
}
