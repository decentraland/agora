import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Poll } from './Poll.model'
import { Vote } from '../Vote'
import { Account } from '../Account'

export const PollQueries = Object.freeze({
  sumBalance: (): SQLStatement =>
    // prettier-ignore
    SQL`SELECT SUM(a.balance::BIGINT) balance
      FROM ${raw(Poll.tableName)} p
      LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
      LEFT JOIN ${raw(Account.tableName)} a ON a.token_address = p.token_address AND a.address = v.address
      GROUP BY p.id`
})
