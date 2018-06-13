import { SQL, SQLStatement, raw } from 'decentraland-server'

export const PollQueries = Object.freeze({
  jsonAgg: (
    tableName: string,
    columnName: string = '*',
    filterColumn: string = 'id'
  ): SQLStatement => {
    const distinct = raw(`${tableName}.${columnName}`)
    const filter = raw(`${tableName}.${filterColumn}`)

    return SQL`COALESCE(
            json_agg(DISTINCT ${distinct}) FILTER (WHERE ${filter} IS NOT NULL),
            '[]'
        )`
  }
})
