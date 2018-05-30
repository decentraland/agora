import { Model } from 'decentraland-server'

export interface OptionAttributes {}

export class Option extends Model {
  static tableName = 'options'
  static columnNames = ['id', 'created_at', 'updated_at']
}
