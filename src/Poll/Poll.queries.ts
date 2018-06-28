import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Token } from '../Token'
import { Vote } from '../Vote'
import { Option } from '../Option'
import { ModelQueries } from '../lib'

export const PollQueries = Object.freeze({
  findWithAssociations: (whereStatement: SQLStatement = SQL``): SQLStatement =>
    SQL`
      SELECT p.*,
            row_to_json(t.*) as token,
            ${ModelQueries.jsonAgg('v')} as votes,
            ${ModelQueries.jsonAgg('o')} as options
        FROM polls p
          JOIN ${raw(Token.tableName)} t ON t.address = p.token_address
          LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
          LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        ${whereStatement}
        GROUP BY p.id, t.address`
})
