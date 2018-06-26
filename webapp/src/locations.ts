export const locations = {
  root: () => '/',
  polls: () => '/',

  poll: () => '/polls/:id',
  pollDetail: (id: string) => `/polls/${id}`,

  vote: () => '/polls/:id/vote',
  voteDetail: (id: string) => `/polls/${id}/vote`
}

export const STATIC_PAGES: string[] = []
