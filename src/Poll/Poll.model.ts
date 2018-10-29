import { Model, SQL } from 'decentraland-server'
import { PollAttributes } from './Poll.types'
import { PollQueries } from './Poll.queries'
import { VoteQueries } from '../Vote'
import { DistrictToken } from '../Token/DistrictToken'
import {
  PollRequestFilters,
  FilterOptions,
  DEFAULT_FILTERS,
  DEFAULT_STATUS,
  DEFAULT_TYPE,
  FilterStatus,
  FilterType
} from './PollRequestFilters'
import { blacklist } from '../lib'
import { utils } from 'decentraland-commons'

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

  static async findWithAssociationsWithFilters({
    limit,
    offset,
    status,
    type
  }: FilterOptions = DEFAULT_FILTERS) {
    return this.query<PollAttributes>(SQL`
      ${PollQueries.findWithAssociations(
        PollQueries.whereStatusAndType({ status, type })
      )}
      ORDER BY ${
        status === 'expired'
          ? SQL`p.closes_at DESC, p.created_at DESC`
          : SQL`p.created_at DESC, p.closes_at DESC`
      }
      LIMIT ${limit}
      OFFSET ${offset}`)
  }

  static async countWithFilters(
    { status, type }: { status?: FilterStatus; type?: FilterType } = {
      status: DEFAULT_STATUS,
      type: DEFAULT_TYPE
    }
  ) {
    const counts = await this.query<{ count: string }>(SQL`
      SELECT COUNT(*) FROM (
        ${PollQueries.findWithAssociations(
          PollQueries.whereStatusAndType({ status, type })
        )}
      ) AS total`)
    return parseInt(counts[0].count, 10)
  }

  static async filter(filters: PollRequestFilters) {
    const { limit, offset, status, type } = filters.sanitize()
    const [polls, total] = await Promise.all([
      Poll.findWithAssociationsWithFilters({ limit, offset, status, type }),
      Poll.countWithFilters({ status, type })
    ])
    return {
      polls: utils.mapOmit<PollAttributes>(polls, blacklist.poll),
      total
    }
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
