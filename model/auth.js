const db = require('../helper/mysql')
const bcrypt = require('bcrypt')

module.exports = {
  registerPerekrut: (setData, profile_id) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(setData.profile_password, 10, (err, hashed) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        else {
          setData.profile_password = hashed
          db.query(`INSERT INTO profiles SET ?`, setData, (err, result) => {
            delete (setData.profile_password)
            profile_id = result.insertId
            if (err) {
              if (err.code == 'ER_DUP_ENTRY') {
                reject({
                  message: 'Email already exists!',
                })
              } else {
                reject({
                  message: err.sqlMessage,
                })
              }
            }
            resolve({ profile_id, ...setData })
          })
        }
      })
    })
  },
  activation: (profile_id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE profiles SET profile_status='active' WHERE profile_id=${profile_id}`, (err, result) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        resolve({
          result
        })
      })
    })
  },
}