require('dotenv').config()
const mysql = require('mysql2')
const { host, user, password, database } = process.env

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
})
connection.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log('connected to db mysql')
})

module.exports = connection