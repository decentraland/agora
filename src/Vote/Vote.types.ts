export interface VoteAttributes {
  id?: number
  address: string
  poll_id: number
  option_id: number
  signed_message: string
  signature: string
  created_at?: Date
  updated_at?: Date
}
