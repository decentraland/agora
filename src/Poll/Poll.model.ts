import { db, Model, SQL, raw } from 'decentraland-server'
import { PollAttributes, PollWithPointers } from './Poll.types'
import { Token } from '../Token'
import { Vote } from '../Vote'
import { Option } from '../Option'

export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static async findWithPointers(): Promise<PollWithPointers[]> {
    return this.query<PollWithPointers>(SQL`
      SELECT p.*,
            json_agg(DISTINCT v.id) as vote_ids,
            json_agg(DISTINCT o.id) as option_ids
        FROM ${raw(this.tableName)} p
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        GROUP BY p.id
    `)
  }

  static async findWithVotes() {
    return this.query<PollAttributes>(SQL`
      SELECT p.*, json_agg(DISTINCT v.*) as votes,
        FROM ${raw(this.tableName)} p
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        GROUP BY p.id
    `)
  }

  static async findByIdWithVotes(id: db.PrimaryKey) {
    // prettier-ignore
    const rows = await this.query<PollAttributes>(SQL`
      SELECT p.*,
            row_to_json(t.*) as token,
            json_agg(DISTINCT v.*) as votes,
            json_agg(DISTINCT o.*) as options
        FROM ${raw(this.tableName)} p
        JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id, t.address
    `)
    return rows[0]
  }
}
