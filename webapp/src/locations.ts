export interface Locations {
  [key: string]: (...args: any[]) => string
}

export const locations: Locations = {
  root: () => '/',

  poll: () => '/polls/:id',
  pollDetail: id => `/polls/${id}`
}
