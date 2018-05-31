import { Model } from 'decentraland-server'
import { AccountAttributes } from './Account.types'

export class Account extends Model<AccountAttributes> {
  static tableName = 'accounts'
}
