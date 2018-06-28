import { AccountBalanceAttributes } from './Account.types'
import { ModelWithCallbacks } from '../lib'
import { db } from 'decentraland-server'

export class AccountBalance extends ModelWithCallbacks<
  AccountBalanceAttributes
> {
  static tableName = 'account_balances'
  static withTimestamps = false

  static beforeModify<U extends db.QueryPart = AccountBalanceAttributes>(
    row: U
  ) {
    return row['address']
      ? Object.assign({}, row, { address: row['address'].toLowerCase() })
      : row
  }
}
