import { MigrationBuilder } from 'node-pg-migrate'
import { Token } from '../src/Token'

const tableName = Token.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      address: { type: 'TEXT', primaryKey: true, notNull: true, comment: null },
      name: { type: 'TEXT', notNull: true, comment: null },
      symbol: { type: 'TEXT', notNull: true, comment: null }
    },
    { ifNotExists: true, comment: null }
  )

  pgm.createIndex(tableName, 'symbol', { unique: true })
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
