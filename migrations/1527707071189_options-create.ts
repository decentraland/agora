import { MigrationBuilder } from 'node-pg-migrate'
import { Option } from '../src/Option'
import { Poll } from '../src/Poll'

const tableName = Option.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'TEXT', primaryKey: true, notNull: true, comment: null },
      value: { type: 'TEXT', notNull: true, comment: null },
      poll_id: { type: 'TEXT', references: Poll.tableName, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
