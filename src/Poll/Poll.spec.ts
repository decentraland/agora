import { expect } from 'chai'
import { Poll } from './Poll.model'

describe('Poll', function() {
  it('should set the correct table name', function() {
    expect(Poll.tableName).to.equal('polls')
  })
})
