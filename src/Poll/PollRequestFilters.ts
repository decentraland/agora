import { Request } from 'express'
import { getNumber, getString } from '../lib/extractFromReq'

export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100
export const DEFAULT_OFFSET = 0
export const DEFAULT_STATUS = 'all'
export const DEFAULT_TYPE = 'all'

export type FilterStatus = 'active' | 'expired' | 'all'
export type FilterType = 'district' | 'decentraland' | 'all'

export const DEFAULT_FILTERS: FilterOptions = {
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  status: DEFAULT_STATUS,
  type: DEFAULT_TYPE
}

export type FilterOptions = {
  limit?: number
  offset?: number
  status?: FilterStatus
  type?: FilterType
}

export class PollRequestFilters {
  req: Request

  constructor(req: Request) {
    this.req = req
  }

  sanitize() {
    return {
      limit: getNumber(this.req, 'limit', DEFAULT_LIMIT, 0, MAX_LIMIT),
      offset: getNumber(this.req, 'offset', DEFAULT_OFFSET, 0),
      status: getString(this.req, 'status', 'all'),
      type: getString(this.req, 'type', 'all')
    }
  }
}
