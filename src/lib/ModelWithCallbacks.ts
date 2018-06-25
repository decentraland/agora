import { Model, db } from 'decentraland-server'

export class ModelWithCallbacks<T> extends Model<T> {
  static async insert<U extends db.QueryPart>(
    row: U,
    onConflict: db.OnConflict<U>
  ) {
    row = this.beforeInsert(row, !!onConflict)
    row = this.beforeModify(row) as U
    return super.insert(row, onConflict)
  }

  static update<U extends db.QueryPart = any, P extends db.QueryPart = any>(
    changes: Partial<U>,
    conditions: Partial<P>
  ) {
    changes = this.beforeUpdate(changes)
    changes = this.beforeModify(changes)
    return super.update(changes, conditions)
  }

  protected static beforeInsert<U>(row: U, _isUpsert: boolean): U {
    return row
  }

  protected static beforeUpdate<U>(changes: Partial<U>): Partial<U> {
    return changes
  }

  protected static beforeModify<U>(changes: U | Partial<U>) {
    return changes
  }
}
