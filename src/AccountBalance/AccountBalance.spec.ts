import { expect } from 'chai'
import { AccountBalance } from './AccountBalance.model'

describe('AccountBalance', function() {
  it('should set the correct table name', function() {
    expect(AccountBalance.tableName).to.equal('account_balances')
  })
})
