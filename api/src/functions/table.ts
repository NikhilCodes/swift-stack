type Column = {
  name: string
  type: string
}

export function generateCreateTableQueries(
  tableName: string,
  columns: Column[],
  uniqueColumns: Column[] = []
): string {
  const columnQueries = columns
    .map((column) => `${column.name} ${column.type}`)
    .join(', ')
  const uniqueColumnQueries = uniqueColumns
    .map((column) => `UNIQUE (${column.name})`)
    .join(', ')
  return `CREATE TABLE ${tableName} (${columnQueries}, ${uniqueColumnQueries})`
}

export function generateDropTableQueries(tableName: string): string {
  return `DROP TABLE ${tableName}`
}

export function generateAddColumnQueries(
  tableName: string,
  columnName: string,
  columnType: string
): string {
  return `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`
}

export function generateDropColumnQueries(
  tableName: string,
  columnName: string
): string {
  return `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`
}

export function generateRenameColumnQueries(
  tableName: string,
  oldColumnName: string,
  newColumnName: string
): string {
  return `ALTER TABLE ${tableName} RENAME COLUMN ${oldColumnName} TO ${newColumnName}`
}

export function generateRenameTableQueries(
  oldTableName: string,
  newTableName: string
): string {
  return `ALTER TABLE ${oldTableName} RENAME TO ${newTableName}`
}

export function generateAlterColumnTypeQueries(
  tableName: string,
  columnName: string,
  columnType: string
): string {
  return `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${columnType}`
}

export function generateAddUniqueConstraintQueries(
  tableName: string,
  constraintName: string,
  columnName: string
): string {
  return `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraintName} UNIQUE (${columnName})`
}

export function generateDropUniqueConstraintQueries(
  tableName: string,
  constraintName: string
): string {
  return `ALTER TABLE ${tableName} DROP CONSTRAINT ${constraintName}`
}
