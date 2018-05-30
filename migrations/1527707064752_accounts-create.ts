import { MigrationBuilder } from 'node-pg-migrate'
import { Account } from '../src/Account'

const tableName = Account.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      address: { type: 'TEXT', primaryKey: true, notNull: true, comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
