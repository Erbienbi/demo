require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || 'postgres',
    "password": process.env.DB_PASSWORD || 'postgres',
    "database": process.env.DB_NAME || 'erbienbi',
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "20082009",
    "database": "erbienbi-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}
