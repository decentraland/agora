import { MigrationBuilder } from 'node-pg-migrate'

export const up = (pgm: MigrationBuilder) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true })
}
