import { Request } from 'express'
import { getNumber, getString } from '../lib/extractFromReq'

export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100
export const DEFAULT_OFFSET = 0
export const DEFAULT_ACTIVE = false
export const DEFAULT_EXPIRED = false

export const FILTER_STATUS = {
  active: 'active',
  expired: 'expired'
}

export const DEFAULT_FILTERS: FilterOptions = {
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  active: DEFAULT_ACTIVE,
  expired: DEFAULT_EXPIRED
}

export type FilterOptions = {
  limit?: number
  offset?: number
  active?: boolean
  expired?: boolean
}

export class PollRequestFilters {
  req: Request

  constructor(req: Request) {
    this.req = req
  }

  sanitize() {
    const status = getString(this.req, 'status', 'all')
    const filters = {
      limit: getNumber(this.req, 'limit', DEFAULT_LIMIT, 0, MAX_LIMIT),
      offset: getNumber(this.req, 'offset', DEFAULT_OFFSET, 0),
      active: status === FILTER_STATUS.active,
      expired: status === FILTER_STATUS.expired
    }
    return filters
  }
}
