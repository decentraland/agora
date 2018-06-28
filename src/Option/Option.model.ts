import { Model } from 'decentraland-server'
import { OptionAttributes } from './Option.types'

export class Option extends Model<OptionAttributes> {
  static tableName = 'options'
}
