import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Poll } from './Poll.model'
import { Vote } from '../Vote'
import { Account } from '../Account'

export const PollQueries = Object.freeze({
  sumBalance: (tablenName: string): SQLStatement =>
    // prettier-ignore
    SQL`SELECT SUM(a.balance) balance
      FROM ${raw(Poll.tableName)} _p
        LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
        LEFT JOIN ${raw(Account.tableName)} a ON a.token_address = p.token_address AND a.address = v.address
      WHERE _p.id = ${raw(tablenName)}.id
      GROUP BY p.id`
})
