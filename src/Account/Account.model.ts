import { AccountAttributes } from './Account.types'
import { ModelWithCallbacks } from '../lib'
import { db } from 'decentraland-server'

export class Account extends ModelWithCallbacks<AccountAttributes> {
  static tableName = 'accounts'
  static withTimestamps = false

  static beforeModify<U extends db.QueryPart = AccountAttributes>(row: U) {
    return row['address']
      ? Object.assign({}, row, { address: row['address'].toLowerCase() })
      : row
  }
}
