import { Model } from 'decentraland-server'
import { VoteAttributes } from './Vote.types'

export class Vote extends Model<VoteAttributes> {
  static tableName = 'votes'
}
