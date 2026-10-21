import 'server-only'
import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from 'mysql2/promise'

declare global {
  // eslint-disable-next-line no-var
  var __smartzPool: Pool | undefined
}

export function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
}

export class DbNotConfiguredError extends Error {
  constructor() {
    super('Database is not configured. Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.')
  }
}

function getPool(): Pool {
  if (!isDbConfigured()) throw new DbNotConfiguredError()
  if (!globalThis.__smartzPool) {
    globalThis.__smartzPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 5,
      idleTimeout: 60_000,
      enableKeepAlive: true,
      charset: 'utf8mb4',
      timezone: 'Z',
      dateStrings: false,
    })
  }
  return globalThis.__smartzPool
}

type Param = string | number | boolean | Date | null

/** Parameterized SELECT. Never interpolate values into `sql`. */
export async function query<T extends RowDataPacket>(sql: string, params: Param[] = []) {
  const [rows] = await getPool().execute<T[]>(sql, params)
  return rows
}

/** Parameterized INSERT / UPDATE / DELETE. */
export async function execute(sql: string, params: Param[] = []) {
  const [result] = await getPool().execute<ResultSetHeader>(sql, params)
  return result
}
