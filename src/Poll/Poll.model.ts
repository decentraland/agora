import { Model, SQL } from 'decentraland-server'
import { PollAttributes } from './Poll.types'
import { Vote } from '../Vote'

export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static findWithVotes(id: string | number) {
    return this.query<PollAttributes>(SQL`
      SELECT p.*, row_to_json(v.*)
        FROM ${SQL.raw(this.tableName)} p
        JOIN ${SQL.raw(Vote.tableName)} v ON v.poll_id = id
        WHERE id = ${id}
    `)
  }
}
