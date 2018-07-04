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

  static canSign() {
    const serverKey = env.get('SERVER_SIGNING_KEY', '')
    if (!serverKey) {
      console.warn(
        '[WARN] SERVER_SIGNING_KEY env var is undefined. Receipts are disabled'
      )
    }
    return !!serverKey
  }

  static async createFromVote(
    vote: CastVoteOption
  ): Promise<ReceiptAttributes | undefined> {
    if (Receipt.canSign()) {
      const receipt = new Receipt({
        account_message: vote.message,
        account_signature: vote.signature,
        account_address: vote.account_address,
        server_message: '',
        server_signature: '',
        option_value: vote.option.value,
        vote_id: vote.id,
        nonce: -1
      })
      await receipt.create()
      await receipt.retreive()

      const signResult = receipt.sign(vote, receipt.get('nonce'))
      receipt.assign({
        server_message: signResult.message,
        server_signature: signResult.signature
      })
      await receipt.update()

      return receipt.getAll()
    }
  }

  private static deleteNonce<U>(row: U): U {
    const attributes = Object.assign({}, row)
    delete attributes['nonce']
    return attributes
  }

  sign(vote: CastVoteOption, nonce: number): Signature {
    const serverKey = env.get('SERVER_SIGNING_KEY', '')
    const hash = eth.utils.sha3(vote.message, 256).toString('hex')

    const message = eth.utils.toHex(
      `Decentraland Vote Receipt:\nMessage from address: ${
        vote.account_address
      }, with hash ${hash} and signature ${
        vote.signature
      } was received.\n\nThe vote to cast is: ${vote.option.value} on poll ${
        vote.poll_id
      }.\n\nDate: ${Date.now()}\nServer nonce: ${nonce}`
    )
    const signature = eth.utils.localSign(message, serverKey)

    return { message, signature }
  }
}
