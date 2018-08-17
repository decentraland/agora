import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Token } from '../Token'
import { Option } from '../Option'
import { Vote } from '../Vote'
import { ModelQueries } from '../lib'
import { DEFAULT_ACTIVE, DEFAULT_EXPIRED } from './PollRequestFilters'

export const PollQueries = Object.freeze({
  whereActiveOrExpired(
    { active, expired }: { active?: boolean; expired?: boolean } = {
      active: DEFAULT_ACTIVE,
      expired: DEFAULT_EXPIRED
    }
  ) {
    return active
      ? SQL`WHERE closes_at > extract(epoch from now()) * 1000`
      : expired
        ? SQL`WHERE closes_at <= extract(epoch from now()) * 1000`
        : SQL``
  },
  findWithAssociations: (whereStatement: SQLStatement = SQL``): SQLStatement =>
    SQL`
      SELECT p.*,
          row_to_json(t.*) as token,
          (SELECT ${ModelQueries.jsonAgg('v', {
            orderColumn: 'timestamp DESC'
          })} AS votes FROM ${raw(Vote.tableName)} v WHERE v.poll_id = p.id),
          (SELECT ${ModelQueries.jsonAgg('o', {
            orderColumn: 'value ASC'
          })} AS options FROM ${raw(Option.tableName)} o WHERE o.poll_id = p.id)
        FROM polls p
          JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
        ${whereStatement}
        GROUP BY p.id, t.address`
})
