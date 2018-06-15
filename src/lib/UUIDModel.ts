import { Model, db } from 'decentraland-server'
import * as uuidv4 from 'uuid/v4'

export class UUIDModel<T> extends Model<T> {
  static async upsert<U extends db.QueryPart>(
    row: U,
    onConflict: db.OnConflict<U>
  ) {
    row.id = row.id || uuidv4()
    return super.upsert(row, onConflict)
  }

  static async insert<U extends db.QueryPart>(row: U) {
    row.id = row.id || uuidv4()
    return super.insert(row)
  }
}
