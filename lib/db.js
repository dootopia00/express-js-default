const sync_mysql = require('sync-mysql')
const mysql2 = require('mysql2/promise')

const dbHost = process.env.DB_HOST;
const db = process.env.DB;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = new sync_mysql({
  host: dbHost,
  database: db,
  user: dbUser,
  password: dbPassword,
  timezone: 'KST',
  debug: false,
  charset: 'utf8mb4',
  multipleStatements: true
})

const pool = mysql2.createPool({
  connectionLimit: 50,
  host: dbHost,
  database: db,
  user: dbUser,
  password: dbPassword
})

global.conn = conn;
global.pool = pool;
