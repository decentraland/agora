import { MigrationBuilder } from 'node-pg-migrate'
import { Vote } from '../src/Vote'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'

const tableName = Vote.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: {
        type: 'UUID',
        default: pgm.func('uuid_generate_v4()'),
        primaryKey: true,
        notNull: true,
        comment: null
      },
      account_address: { type: 'TEXT', notNull: true, comment: null },
      account_balance: {
        type: 'DECIMAL',
        notNull: true,
        default: '0',
        comment: null
      },
      poll_id: {
        type: 'UUID',
        references: Poll.tableName,
        notNull: true,
        comment: null
      },
      option_id: {
        type: 'UUID',
        references: Option.tableName,
        notNull: true,
        comment: null
      },
      message: { type: 'TEXT', notNull: true, comment: null },
      signature: { type: 'TEXT', notNull: true, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )

  pgm.createIndex(tableName, ['account_address', 'poll_id'], {
    unique: true
  })

  pgm.createIndex(tableName, 'poll_id')
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
