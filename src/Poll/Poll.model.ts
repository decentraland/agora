import { SQL, raw } from 'decentraland-server'
import { PollAttributes, PollWithPointers } from './Poll.types'
import { PollQueries } from './Poll.queries'
import { Token } from '../Token'
import { Vote } from '../Vote'
import { Option } from '../Option'
import { UUIDModel } from '../lib'

export class Poll extends UUIDModel<PollAttributes> {
  static tableName = 'polls'

  static async findWithPointers(): Promise<PollWithPointers[]> {
    return this.query<PollWithPointers>(SQL`
      SELECT p.*,
              ${PollQueries.jsonAgg('v', 'id')} as vote_ids,
              ${PollQueries.jsonAgg('o', 'id')} as option_ids
        FROM ${raw(this.tableName)} p
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        GROUP BY p.id
    `)
  }

  static async findWithVotes() {
    return this.query<PollAttributes>(SQL`
      SELECT p.*,
            ${PollQueries.jsonAgg('v')} as votes,
        FROM ${raw(this.tableName)} p
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        GROUP BY p.id
    `)
  }

  static async findByIdWithVotes(id: string) {
    // prettier-ignore
    const rows = await this.query<PollAttributes>(SQL`
      SELECT p.*,
            row_to_json(t.*) as token,
            ${PollQueries.jsonAgg('v')} as votes,
            ${PollQueries.jsonAgg('o')} as options
        FROM ${raw(this.tableName)} p
        JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id, t.address
    `)
    return rows[0]
  }

  isExpired() {
    return this.get('closes_at') < Date.now()
  }
}
