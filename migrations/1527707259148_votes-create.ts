import { MigrationBuilder } from 'node-pg-migrate'
import { Vote } from '../src/Vote'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'

const tableName = Vote.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      address: { type: 'TEXT', notNull: true, comment: null },
      poll_id: {
        type: 'INT',
        references: Poll.tableName,
        notNull: true,
        comment: null
      },
      option_id: {
        type: 'INT',
        references: Option.tableName,
        notNull: true,
        comment: null
      },
      signed_message: { type: 'TEXT', notNull: true, comment: null },
      signature: { type: 'TEXT', notNull: true, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
