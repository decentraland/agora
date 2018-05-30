import { expect } from 'chai'
import { Vote } from './Vote.model'

describe('Vote', function() {
  it('should set the correct table name', function() {
    expect(Vote.tableName).to.equal('votes')
  })
})
