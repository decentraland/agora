import { db } from 'decentraland-server'
import { Token } from '../Token.model'
import { TokenAttributes } from '../Token.types'

const DISTRICT_TOKEN: TokenAttributes = Object.freeze({
  address: 'district_token_address',
  name: 'DistrictToken',
  symbol: 'DT'
})

export class DistrictToken extends Token {
  static getAddress() {
    return DISTRICT_TOKEN.address
  }

  static isValid(token: TokenAttributes): boolean {
    return token.address === this.getAddress()
  }

  static find<U extends db.QueryPart = any>(
    conditions?: Partial<U>,
    ...args: any[]
  ): Promise<U[]> {
    conditions = Object.assign({}, conditions, DISTRICT_TOKEN)
    return super.find(conditions, ...args)
  }

  static findOne<_ = any>(..._: any[]) {
    return super.findOne(DistrictToken.getAddress())
  }

  constructor() {
    super({ ...DISTRICT_TOKEN })
  }
}
