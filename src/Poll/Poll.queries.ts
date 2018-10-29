import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Token, DISTRICT_TOKEN } from '../Token'
import { Option } from '../Option'
import { Vote } from '../Vote'
import { ModelQueries } from '../lib'
import {
  FilterStatus,
  FilterType,
  DEFAULT_STATUS,
  DEFAULT_TYPE
} from './PollRequestFilters'

export const PollQueries = Object.freeze({
  whereStatusAndType(
    { status, type }: { status?: FilterStatus; type?: FilterType } = {
      status: DEFAULT_STATUS,
      type: DEFAULT_TYPE
    }
  ) {
    let statusQuery
    let typeQuery

    if (status === 'active') {
      statusQuery = SQL`closes_at > extract(epoch from now()) * 1000`
    } else if (status === 'expired') {
      statusQuery = SQL`closes_at <= extract(epoch from now()) * 1000`
    }

    if (type === 'district') {
      typeQuery = SQL`token_address LIKE '${SQL.raw(DISTRICT_TOKEN.address)}-%'`
    } else if (type === 'decentraland') {
      typeQuery = SQL`token_address LIKE '0x%'`
    }

    if (statusQuery && typeQuery) {
      return SQL`WHERE ${statusQuery} AND ${typeQuery}`
    } else if (statusQuery) {
      return SQL`WHERE ${statusQuery}`
    } else if (typeQuery) {
      return SQL`WHERE ${typeQuery}`
    } else {
      return SQL``
    }
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
