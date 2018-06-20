import { Model, SQL } from 'decentraland-server'
import { OptionAttributes } from './Option.types'

export class Option extends Model<OptionAttributes> {
  static tableName = 'options'

  static async findByPollId(id: string) {
    return this.query<OptionAttributes>(SQL`
      SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE poll_id = ${id}`)
  }
}
