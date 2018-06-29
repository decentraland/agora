import { AccountBalance } from 'modules/accountBalance/types'

export function buildId(
  accountBalance: AccountBalance | { address: string; token_address: string }
): string {
  return `${accountBalance.address}-${accountBalance.token_address}`
}
