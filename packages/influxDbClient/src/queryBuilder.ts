export function queryBuilder({
    field,
    fieldOperation,
    timeRange,
    table,
    where,
    limit,
    orderBy
}: {
    field: string
    timeRange: string
    fieldOperation?: string
    table: string
    where?: {
        field: string
        value: string
    },
    orderBy?: string
    limit?: string

}): string {
    let query = ` SELECT mean("${field}")`
  
    if (fieldOperation) {
      query += ` ${fieldOperation}`
    }
  
    query += ` FROM "${table}"`
  
    if (where) {
      query += ` WHERE ("${where.field}" = '${where.value}')`
    }
  
    query += ` GROUP BY time(${timeRange})`

    if (orderBy) {
        query += ` order by ${orderBy}`
    }

    if (limit) {
        query += ` limit ${limit}`
    }
    
  
    return query
}
