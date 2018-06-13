import { SQL } from 'decentraland-server'
import { OptionAttributes } from './Option.types'
import { UUIDModel } from '../lib'

export class Option extends UUIDModel<OptionAttributes> {
  static tableName = 'options'

  static async findByPollId(id: string) {
    return this.query<OptionAttributes>(SQL`
      SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE poll_id = ${id}`)
  }
}
