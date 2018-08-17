import { Request } from 'express'
import { getNumber, getBoolean } from '../lib/extractFromReq'

export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100
export const DEFAULT_OFFSET = 0
export const DEFAULT_ACTIVE = false
export const DEFAULT_EXPIRED = false

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
    const filters = {
      limit: getNumber(this.req, 'limit', DEFAULT_LIMIT, 0, MAX_LIMIT),
      offset: getNumber(this.req, 'offset', DEFAULT_OFFSET, 0),
      active: getBoolean(this.req, 'active', DEFAULT_ACTIVE),
      expired: getBoolean(this.req, 'expired', DEFAULT_EXPIRED)
    }
    if (filters.active && filters.expired) {
      throw new Error("Parameters `active` and `expired` can't both be true")
    }
    return filters
  }
}
