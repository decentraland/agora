import { MigrationBuilder } from 'node-pg-migrate'
import { AccountBalance } from '../src/AccountBalance'
import { Token } from '../src/Token'

const tableName = AccountBalance.tableName

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
      address: { type: 'TEXT', notNull: true, comment: null },
      token_address: {
        type: 'TEXT',
        notNull: true,
        references: Token.tableName,
        comment: null
      },
      balance: { type: 'DECIMAL', notNull: true, default: '0', comment: null }
    },
    { ifNotExists: true, comment: null }
  )

  pgm.createIndex(tableName, ['address', 'token_address'], { unique: true })
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
