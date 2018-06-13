export interface VoteAttributes {
  id?: string
  address: string
  poll_id: string
  option_id: string
  message: string
  signature: string
  created_at?: Date
  updated_at?: Date
}
