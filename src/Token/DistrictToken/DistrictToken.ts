import { Token } from '../Token.model'
import { TokenAttributes } from '../Token.types'

const DISTRICT_TOKEN: TokenAttributes = Object.freeze({
  address: 'district-token-address',
  name: 'DistrictToken',
  symbol: 'DT'
})

export class DistrictToken extends Token {
  constructor(name: string, id: string) {
    super({
      address: `${DISTRICT_TOKEN.address}-${id}`,
      name,
      symbol: `${DISTRICT_TOKEN.symbol}-${id}`
    })
  }

  static isValid(token: TokenAttributes): boolean {
    return this.isAddress(token.address)
  }

  static isAddress(address: string): boolean {
    return address.search(DISTRICT_TOKEN.address) !== -1
  }
}
