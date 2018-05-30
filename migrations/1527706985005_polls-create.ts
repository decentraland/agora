import { MigrationBuilder } from 'node-pg-migrate'
import { Poll } from '../src/Poll'

const tableName = Poll.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      name: { type: 'TEXT', notNull: true, comment: null },
      body: 'TEXT',
      token: { type: 'TEXT', notNull: true, comment: null },
      submitter: { type: 'TEXT', notNull: true, comment: null },
      closes_at: { type: 'BIGINT', notNull: true, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
