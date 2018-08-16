export const locations = {
  root: () => '/',
  polls: (activePage: number = 1, expiredPage: number = 1) =>
    `/?active=${activePage}&expired=${expiredPage}`,

  poll: () => '/polls/:id',
  pollDetail: (id: string) => `/polls/${id}`,

  vote: () => '/polls/:id/vote',
  voteDetail: (id: string) => `/polls/${id}/vote`
}

export const STATIC_PAGES: string[] = []
