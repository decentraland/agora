import { eth } from 'decentraland-eth'
import { env } from 'decentraland-commons'
import { db } from 'decentraland-server'
import { ReceiptAttributes } from './Receipt.types'
import { CastVoteOption } from '../Vote'
import { ModelWithCallbacks } from '../lib'

interface Signature {
  message: string
  signature: string
}

export class Receipt extends ModelWithCallbacks<ReceiptAttributes> {
  static tableName = 'receipts'

  // Delegate the nonce to the database
  static beforeModify<U extends db.QueryPart = ReceiptAttributes>(row: U) {
    return this.deleteNonce(row)
  }

  static async createFromVote(
    vote: CastVoteOption
  ): Promise<ReceiptAttributes | undefined> {
    const receipt = new Receipt()
    const signResult = receipt.sign(vote)

    if (signResult) {
      const attributes: ReceiptAttributes = {
        account_message: vote.message,
        account_signature: vote.signature,
        account_address: vote.account_address,
        server_message: signResult.message,
        server_signature: signResult.signature,
        option_value: vote.option.value,
        vote_id: vote.id
      }

      receipt.assign(attributes)

      await receipt.create()

      return receipt.getAll()
    }
  }

  private static deleteNonce<U>(row: U): U {
    const attributes = Object.assign({}, row)
    delete attributes['nonce']
    return attributes
  }

  sign(vote: CastVoteOption): Signature | null {
    const serverKey = env.get('SERVER_SIGNING_KEY', '')
    if (!serverKey) {
      console.warn(
        '[WARN] SERVER_SIGNING_KEY env var is undefined. Receipts are disabled'
      )
      return null
    }

    const message = eth.utils.toHex(
      `This is the vote for the user with address: ${
        vote.account_address
      }. The vote to cast is: ${vote.option.value}. Date: ${new Date()}`
    )
    const signature = eth.utils.localSign(message, serverKey)

    return { message, signature }
  }
}
