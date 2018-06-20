export interface ReceiptAttributes {
  id?: string
  server_signature: string
  server_message: string
  account_message: string
  account_signature: string
  account_address: string
  option_value: string
  vote_id: string
  nonce?: number // Added by default by the DB, serial
}
