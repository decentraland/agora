import { SQL, SQLStatement, raw } from 'decentraland-server'
import { Poll } from '../Poll'

export const VoteQueries = Object.freeze({
  sumAccountBalanceForPollSubquery: (
    tableName: string = Poll.tableName
  ): SQLStatement =>
    // prettier-ignore
    SQL`SELECT SUM(account_balance) balance
      FROM votes v
    WHERE v.poll_id = ${raw(tableName)}.id
    GROUP BY v.poll_id`
})
