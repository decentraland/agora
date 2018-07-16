import { SQL, SQLStatement, raw } from 'decentraland-server'

export interface JSONAggParams {
  columnName?: string
  filterColumn?: string
  orderColumn?: string
}

export const ModelQueries = Object.freeze({
  jsonAgg: (tableName: string, params: JSONAggParams = {}): SQLStatement => {
    const { columnName, filterColumn, orderColumn } = Object.assign(
      { columnName: '*', filterColumn: 'id', orderColumn: 'id' },
      params
    )
    const column = raw(`${tableName}.${columnName}`)
    const filter = raw(`${tableName}.${filterColumn}`)
    const order = raw(`${tableName}.${orderColumn}`)

    return SQL`COALESCE(
            json_agg(${column} ORDER BY ${order}) FILTER (WHERE ${filter} IS NOT NULL),
            '[]'
        )`
  }
})
