import { expect } from 'chai'
import { Token } from './Token.model'

describe('Token', function() {
  it('should set the correct table name', function() {
    expect(Token.tableName).to.equal('tokens')
  })
})
