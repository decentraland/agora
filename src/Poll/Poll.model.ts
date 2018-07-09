import { Model, SQL, raw } from 'decentraland-server'
import { PollAttributes, PollWithPointers } from './Poll.types'
import { PollQueries } from './Poll.queries'
import { Vote, VoteQueries } from '../Vote'
import { Option } from '../Option'
import { DistrictToken } from '../Token/DistrictToken'
import { ModelQueries } from '../lib'

// If the Poll model starts to receive external inserts, we should lowercase the submitter
export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static async findWithPointers(): Promise<PollWithPointers[]> {
    return this.query<PollWithPointers>(SQL`
      SELECT p.*,
              ${ModelQueries.jsonAgg('v', 'id')} as vote_ids,
              ${ModelQueries.jsonAgg('o', 'id')} as option_ids
        FROM ${raw(this.tableName)} p
          LEFT JOIN ${raw(Vote.tableName)} v ON v.poll_id = p.id
          LEFT JOIN ${raw(Option.tableName)} o ON o.poll_id = p.id
        GROUP BY p.id`)
  }

  static async findWithAssociations() {
    return this.query<PollAttributes>(SQL`
      ${PollQueries.findWithAssociations()}
      ORDER BY p.created_at`)
  }

  static async findActiveWithAssociations() {
    return this.query<PollAttributes>(SQL`
      ${PollQueries.findWithAssociations(
        SQL`WHERE closes_at > extract(epoch from now())`
      )}
      ORDER BY p.created_at`)
  }

  static async findByIdWithAssociations(id: string) {
    const rows = await this.query<PollAttributes>(
      PollQueries.findWithAssociations(SQL`WHERE p.id = ${id}`)
    )
    return rows[0]
  }

  static async updateBalances(): Promise<void> {
    await this.query(SQL`UPDATE ${SQL.raw(this.tableName)}
        SET balance = COALESCE((${VoteQueries.sumAccountBalanceForPollSubquery()}), 0)`)
  }

  isFinished() {
    return this.get('closes_at') < Date.now()
  }

  isDistrictPoll() {
    return DistrictToken.isAddress(this.get('token_address'))
  }
}
