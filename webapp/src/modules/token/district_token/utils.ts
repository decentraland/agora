import { Token } from 'modules/token/types'

const DISTRICT_TOKEN = Object.freeze({
  address: 'district-token-address',
  name: 'DistrictToken',
  symbol: 'DT'
})

export function isDistrictToken(token: Token) {
  return isDistrictTokenAddress(token.address)
}

export function isDistrictTokenAddress(address: string): boolean {
  return address.search(DISTRICT_TOKEN.address) !== -1
}
