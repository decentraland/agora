export const locations = {
  root: () => '/',
  polls: () => '/',

  poll: () => '/polls/:id',
  pollDetail: (id: string | number) => `/polls/${id}`
}
