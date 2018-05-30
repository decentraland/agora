import { Model } from 'decentraland-server'

export interface VoteAttributes {}

export class Vote extends Model {
  static tableName = 'votes'
  static columnNames = ['id', 'created_at', 'updated_at']
}
