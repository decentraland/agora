import { Model } from 'decentraland-server'
import { TokenAttributes } from './Token.types'

// If the Token model starts to receive external inserts, we should lowercase the address
export class Token extends Model<TokenAttributes> {
  static tableName = 'tokens'
  static primaryKey = 'address'
  static withTimestamps = false
}
