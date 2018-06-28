import { Token } from '../Token.model'
import { TokenAttributes } from '../Token.types'

const DISTRICT_TOKEN: TokenAttributes = Object.freeze({
  address: 'district-token-address',
  name: 'DistrictToken',
  symbol: 'DT'
})

export class DistrictToken extends Token {
  constructor(name: string) {
    const symbol = DistrictToken.toSymbol(name)

    super({
      address: `${DISTRICT_TOKEN.address}-${symbol}`,
      name,
      symbol
    })
  }

  static isValid(token: TokenAttributes): boolean {
    return this.isAddress(token.address)
  }

  static isAddress(address: string): boolean {
    return address.search(DISTRICT_TOKEN.address) !== -1
  }

  static toSymbol(name: string) {
    const symbolLen = 4

    const slug = name.replace(/[^\s\w]+/g, '')
    let parts = slug.split(' ')

    if (parts.length < symbolLen) {
      const filler = Array.from(slug).reverse()
      parts = parts.concat(filler)
    }

    parts = parts.filter(str => !!str)

    return parts
      .map(str => str[0].toUpperCase())
      .slice(0, symbolLen)
      .join('')
  }
}
