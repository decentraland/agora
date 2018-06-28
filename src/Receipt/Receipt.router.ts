import { server } from 'decentraland-server'
import * as express from 'express'

import { Router } from '../lib'
import { Receipt } from './Receipt.model'
import { ReceiptAttributes } from './Receipt.types'

export class ReceiptRouter extends Router {
  mount() {
    /**
     * Returns all receipts
     */
    this.app.get('/receipts', server.handleRequest(this.getReceipts))

    /**
     * Returns a receipt by id
     */
    this.app.get('/receipts/:id', server.handleRequest(this.getReceipt))

    /**
     * Returns account receipts
     */
    this.app.get(
      '/accounts/:address/receipts',
      server.handleRequest(this.getAccountReceipts)
    )
  }

  async getReceipts() {
    return Receipt.find<ReceiptAttributes>()
  }

  async getReceipt(req: express.Request) {
    const id = server.extractFromReq(req, 'id')
    return Receipt.findOne(id)
  }

  async getAccountReceipts(req: express.Request) {
    const address = server.extractFromReq(req, 'address')
    return Receipt.find<ReceiptAttributes>({ account_address: address })
  }
}
