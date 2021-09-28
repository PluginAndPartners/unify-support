import sqlite3 from 'sqlite3'

let db = null

export function connectDB () {
  return new Promise((resolve, reject) => {
    try {
      db = new sqlite3.Database(
        'src/db/support.db',
        err => err
          ? console.error(err.message)
          : console.info('Banco de dados iniciado com sucesso! ✅')
      )

      resolve()
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

export function createTableIfNotExists (tableName, fields) {
  return new Promise((resolve, reject) => {
    try {
      db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export function find (fields, tableName, whereCondition = null) {
  return new Promise((resolve, reject) => {
    db.get(
            `SELECT ${fields} FROM ${tableName}`.concat(whereCondition ? ` WHERE ${whereCondition}` : ''),
            (err, result) => {
              if (err) reject(err)

              resolve(result)
            }
    )
  })
}

export function insert (tableName, fields, values) {
  return new Promise((resolve, reject) => {
    db.run(
            `INSERT INTO ${tableName} (${fields}) VALUES(${values})`,
            (err, result) => {
              if (err) reject(err)

              resolve(result)
            }
    )
  })
}

export function closeDB () {
  db.close()
}
