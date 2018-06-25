import { eth } from 'decentraland-eth'
import { env } from 'decentraland-commons'
import { Model, db } from 'decentraland-server'
import { ReceiptAttributes } from './Receipt.types'
import { CastVoteOption } from '../Vote'

interface Signature {
  message: string
  signature: string
}

export class Receipt extends Model<ReceiptAttributes> {
  static tableName = 'receipts'

  // Delegate the nonce to the database
  static async upsert<U extends db.QueryPart>(
    row: U,
    onConflict: db.OnConflict<U>
  ) {
    return super.upsert(this.nullifyNonce(row), onConflict)
  }

  // Delegate the nonce to the database
  static async insert<U extends db.QueryPart>(row: U) {
    return super.insert(this.nullifyNonce(row))
  }

  // Delegate the nonce to the database
  static update<U extends db.QueryPart = any, P extends db.QueryPart = any>(
    changes: Partial<U>,
    conditions: Partial<P>
  ) {
    return super.update(this.nullifyNonce(changes), conditions)
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

      const { id } = await receipt.insert()
      receipt.set('id', id)

      return receipt.getAll()
    }
  }

  static async findByAccountAddress(accountAddress: string) {
    return this.find<ReceiptAttributes>({ account_address: accountAddress })
  }

  private static nullifyNonce<U>(row: U): U {
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
