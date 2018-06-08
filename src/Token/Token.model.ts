import { Model } from 'decentraland-server'
import { TokenAttributes } from './Token.types'

export class Token extends Model<TokenAttributes> {
  static tableName = 'tokens'
  static primaryKey = 'address'
  static withTimestamps = false
}
