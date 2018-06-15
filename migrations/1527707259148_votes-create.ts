import { MigrationBuilder } from 'node-pg-migrate'
import { Vote } from '../src/Vote'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'

const tableName = Vote.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'TEXT', primaryKey: true, notNull: true, comment: null },
      address: { type: 'TEXT', notNull: true, comment: null },
      poll_id: {
        type: 'TEXT',
        references: Poll.tableName,
        notNull: true,
        comment: null
      },
      option_id: {
        type: 'TEXT',
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

  pgm.createIndex(tableName, ['address', 'poll_id'], {
    unique: true
  })

  pgm.createIndex(tableName, 'poll_id')
}

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}
