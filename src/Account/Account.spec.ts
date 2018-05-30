import { expect } from 'chai'
import { Account } from './Account.model'

describe('Account', function() {
  it('should set the correct table name', function() {
    expect(Account.tableName).to.equal('accounts')
  })
})
