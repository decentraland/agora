import { FilterType, FilterStatus } from 'modules/poll/types'

export const locations = {
  root: () => '/',

  polls: () => '/polls',
  pollsTable: (
    page: number = 1,
    type: FilterType = 'decentraland',
    status: FilterStatus = 'all'
  ) => `/polls?page=${page}&type=${type}&status=${status}`,

  poll: () => '/polls/:id',
  pollDetail: (id: string) => `/polls/${id}`,

  vote: () => '/polls/:id/vote',
  voteDetail: (id: string) => `/polls/${id}/vote`
}

export const STATIC_PAGES: string[] = []
