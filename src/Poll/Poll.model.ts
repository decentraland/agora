import { Model, SQL } from 'decentraland-server'
import { PollAttributes } from './Poll.types'
import { PollQueries } from './Poll.queries'
import { VoteQueries } from '../Vote'
import { DistrictToken } from '../Token/DistrictToken'

// If the Poll model starts to receive external inserts, we should lowercase the submitter
export class Poll extends Model<PollAttributes> {
  static tableName = 'polls'

  static async findWithAssociations() {
    return this.query<PollAttributes>(SQL`
      ${PollQueries.findWithAssociations()}
      ORDER BY p.created_at`)
  }

  static async findActiveWithAssociations() {
    return this.query<PollAttributes>(SQL`
      ${PollQueries.findWithAssociations(
        SQL`WHERE closes_at > extract(epoch from now()) * 1000`
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
