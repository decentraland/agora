export interface PollAttributes {
  id: number
  name: string
  body?: string
  token: string
  submitter: string
  closes_at: number
  created_at?: Date
  updated_at?: Date
}
