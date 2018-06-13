import { AccountAttributes } from './Account.types'
import { UUIDModel } from '../lib'

export class Account extends UUIDModel<AccountAttributes> {
  static tableName = 'accounts'
  static withTimestamps = false
}
