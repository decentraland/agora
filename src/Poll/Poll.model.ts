import { Model, SQL, raw } from 'decentraland-server'
import { PollAttributes } from './Poll.types'
import { Token } from '../Token'
import { Vote } from '../Vote'
import { Option } from '../Option'

export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static async findByIdWithVotes(id: string | number) {
    // prettier-ignore
    const rows = await this.query<PollAttributes>(SQL`
      SELECT p.*,
            row_to_json(t.*) as token,
            json_agg(DISTINCT v.*) as votes,
            json_agg(DISTINCT o.*) as options
        FROM ${raw(this.tableName)} p
        JOIN ${raw(Token.tableName)} t ON t.id = p.token_id
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id, t.id
    `)
    return rows[0]
  }
}
