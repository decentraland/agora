import { SQL } from 'decentraland-server'
import { VoteAttributes } from './Vote.types'
import { UUIDModel } from '../lib'

export class Vote extends UUIDModel<VoteAttributes> {
  static tableName = 'votes'

  static async findByPollId(id: string) {
    return this.query<VoteAttributes>(SQL`
      SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE poll_id = ${id}`)
  }
}
