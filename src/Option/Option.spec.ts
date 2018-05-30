import { expect } from 'chai'
import { Option } from './Option.model'

describe('Option', function() {
  it('should set the correct table name', function() {
    expect(Option.tableName).to.equal('options')
  })
})
