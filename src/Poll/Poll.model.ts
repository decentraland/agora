import { Model, SQL, raw } from 'decentraland-server'
import { PollAttributes, PollWithPointers } from './Poll.types'
import { PollQueries } from './Poll.queries'
import { Token } from '../Token'
import { Vote } from '../Vote'
import { Option } from '../Option'
import { ModelQueries } from '../lib'

export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static async findWithPointers(): Promise<PollWithPointers[]> {
    return this.query<PollWithPointers>(SQL`
      SELECT p.*,
              ${ModelQueries.jsonAgg('v', 'id')} as vote_ids,
              ${ModelQueries.jsonAgg('o', 'id')} as option_ids
        FROM ${raw(this.tableName)} p
          LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
          LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        GROUP BY p.id`)
  }

  static async findByIdWithAssociations(id: string) {
    // prettier-ignore
    const rows = await this.query<PollAttributes>(SQL`
      SELECT p.*,
            row_to_json(t.*) as token,
            ${ModelQueries.jsonAgg('v')} as votes,
            ${ModelQueries.jsonAgg('o')} as options
        FROM ${raw(this.tableName)} p
          JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
          LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
          LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id, t.address`)
    return rows[0]
  }

  static async updateBalances(): Promise<void> {
    this.query(SQL`
      UPDATE ${SQL.raw(this.tableName)} p
        SET balance = (${PollQueries.sumBalance('p')})`)
  }

  isFinished() {
    return this.get('closes_at') < Date.now()
  }
}
