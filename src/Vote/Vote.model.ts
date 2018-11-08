import { Model, SQL, raw } from 'decentraland-server'
import { VoteAttributes, CastVote } from './Vote.types'
import { Poll } from '../Poll'
import { Option } from '../Option'
import { Token } from '../Token'
import { AccountBalanceAttributes } from '../AccountBalance'

export class Vote extends Model<VoteAttributes> {
  static tableName = 'votes'

  static async findCastVoteById(id: string) {
    return this.query<CastVote>(SQL`
      SELECT v.*,
            row_to_json(p.*) as poll,
            row_to_json(o.*) as option,
            row_to_json(t.*) as token
        FROM ${raw(this.tableName)} v
          JOIN ${raw(Poll.tableName)} p ON p.id = v.poll_id
          JOIN ${raw(Option.tableName)} o ON o.id = v.option_id
          JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
        WHERE v.id = ${id}`)
  }

  static async updateBalance(
    account: AccountBalanceAttributes,
    balance: number | string
  ) {
    return this.query(SQL`
      UPDATE ${raw(this.tableName)} v
        SET account_balance = ${balance}
      FROM ${raw(Poll.tableName)} p
        WHERE v.account_address = ${account.address}
          AND v.poll_id = p.id
          AND p.token_address = ${account.token_address}
          AND p.closes_at > extract(epoch from now()) * 1000`)
  }
}
