require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || 'postgres',
    "password": process.env.DB_PASSWORD || '20082009',
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
    "username": "oxicjhdohapmca",
    "password": "bef14eac94982c51611b2fabad5cf9d02b8ef16e415afa03213692b04a06cc47",
    "database": "d6qk1s7dh9em2p",
    "host": "ec2-34-225-82-212.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
