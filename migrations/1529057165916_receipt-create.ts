import { MigrationBuilder } from 'node-pg-migrate'
import { Receipt } from '../src/Receipt'
import { Vote } from '../src/Vote'

const tableName = Receipt.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'TEXT', primaryKey: true, comment: null },
      server_signature: { type: 'TEXT', notNull: true, comment: null },
      server_message: { type: 'TEXT', notNull: true, comment: null },
      account_message: { type: 'TEXT', notNull: true, comment: null },
      account_signature: { type: 'TEXT', notNull: true, comment: null },
      account_address: { type: 'TEXT', notNull: true, comment: null },
      option_value: { type: 'TEXT', notNull: true, comment: null },
      vote_id: {
        type: 'TEXT',
        references: Vote.tableName,
        notNull: true,
        comment: null
      },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )

  pgm.createIndex(tableName, ['server_signature', 'server_message'], {
    unique: true
  })
  pgm.createIndex(tableName, ['account_signature', 'account_message'], {
    unique: true
  })
  pgm.createIndex(tableName, 'account_address')
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
