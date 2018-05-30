import { Model } from 'decentraland-server'

export interface AccountAttributes {}

export class Account extends Model {
  static tableName = 'accounts'
  static columnNames = ['id', 'created_at', 'updated_at']
}
