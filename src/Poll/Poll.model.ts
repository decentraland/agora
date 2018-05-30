import { Model } from 'decentraland-server'

export interface PollAttributes {}

export class Poll extends Model {
  static tableName = 'polls'
  static columnNames = ['id', 'created_at', 'updated_at']
}
