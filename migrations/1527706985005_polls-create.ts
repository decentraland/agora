import { MigrationBuilder } from 'node-pg-migrate'
import { Poll } from '../src/Poll'
import { Token } from '../src/Token'

const tableName = Poll.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      name: { type: 'TEXT', notNull: true, comment: null },
      body: 'TEXT',
      token_id: {
        type: 'INT',
        references: Token.tableName,
        notNull: true,
        comment: null
      },
      balance: { type: 'BIGINT', notNull: true, default: 0, comment: null },
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
