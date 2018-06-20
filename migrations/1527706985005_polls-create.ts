import { MigrationBuilder } from 'node-pg-migrate'
import { Poll } from '../src/Poll'
import { Token } from '../src/Token'

const tableName = Poll.tableName

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
      title: { type: 'TEXT', notNull: true, comment: null },
      description: 'TEXT',
      token_address: {
        type: 'TEXT',
        references: Token.tableName,
        notNull: true,
        comment: null
      },
      balance: { type: 'DECIMAL', notNull: true, default: 0, comment: null },
      submitter: { type: 'TEXT', notNull: true, comment: null },
      closes_at: { type: 'BIGINT', notNull: true, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
