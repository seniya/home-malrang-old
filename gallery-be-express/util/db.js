const Database = require('better-sqlite3')
// const db = new Database('temp.db', { /* verbose: console.log, */ memory: true })
const db = new Database('.db/temp.db', { verbose: console.log })

// check to see if we already initialized this database
const stmt = db.prepare(`SELECT name
    FROM sqlite_master
    WHERE
        type='table' and name='reactions'
    ;`)
const row = stmt.get()
if (row === undefined) {
  console.log('WARNING: database appears empty, initializing it.')
  const sqlInit = `
        CREATE TABLE IF NOT EXISTS reactions (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            origin TEXT,
            user TEXT DEFAULT anon,
            reaction TEXT
        );

        CREATE TABLE IF NOT EXISTS users (
          id   INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          name TEXT,
          lv INTEGER DEFAULT 5
        );

        INSERT INTO users (email, password, name, lv)
        VALUES('malrang@gmail.com', '49a0943eea653b38f65d6a14edb5dfd06ee7b8a95a36c943131ee26e1eec78148b12ba1546a21140eee4a18ec07163d9c160657b39a71617c369d15fbce61949', 'malrang', 3)
        `
  db.exec(sqlInit)
}
console.log("database exists now, if it didn't already.")

const readReactions = db.prepare(
  'SELECT * FROM users WHERE id IS $origin'
)
const get = key => {
  const data = readReactions.all({ origin: key })
  return data
}

const insertReaction = db.prepare(
  'INSERT INTO reactions (origin, reaction) VALUES ($origin, $reaction)'
)
const increase = (key, emoji) => {
  insertReaction.run({ origin: key, reaction: emoji })
  return get(key)
}

const getUser = (email) => {
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  return row
}

module.exports = { get, increase, getUser }
