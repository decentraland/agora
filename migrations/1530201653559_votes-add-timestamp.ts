import { MigrationBuilder } from 'node-pg-migrate'
import { Vote } from '../src/Vote'

const tableName = Vote.tableName

export const up = (pgm: MigrationBuilder) => {
  pgm.addColumns(tableName, {
    timestamp: {
      type: 'DECIMAL',
      notNull: true,
      comment: null
    }
  })
}
