import { MigrationBuilder } from 'node-pg-migrate'
import { Token } from '../src/Token'

const tableName = Token.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      name: { type: 'TEXT', notNull: true, comment: null },
      address: { type: 'TEXT', notNull: true, comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
