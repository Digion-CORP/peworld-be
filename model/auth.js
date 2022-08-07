const db = require('../helper/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


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
  registerPekerja: (setData, profile_id) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(setData.profile_password, 10, (err, hashed) => {
        if (err) {
          reject(`${err.sqlMessage}`);
        } else {
          db.query(
            `SELECT * From profiles where profile_email = '${setData.profile_email}'`,
            (err, result) => {
              if (result.length) {
                reject({
                  success: false,
                  message: 'Email already exists!',
                });
              } else if (err) {
                reject({
                  success: false,
                  message: 'Error When Regitering Account',
                });
              } else {
                setData.profile_password = hashed;
                db.query(
                  `INSERT INTO profiles SET ?`,
                  setData,
                  (err, result) => {
                    delete setData.profile_password;
                    profile_id = result.insertId;
                    if (err) {
                      if (err.code == 'ER_DUP_ENTRY') {
                        reject({
                          message: 'Email already exists!',
                        });
                      } else {
                        reject({
                          message: err.sqlMessage,
                        });
                      }
                    }
                    resolve({ profile_id, ...setData });
                  }
                );
              }
            }
          );
        }
      });
    });
  },
  activation: (profile_email) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE profiles SET profile_status='active' WHERE profile_email='${profile_email}'`, (err, result) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        resolve({
          result
        })
      })
    })
  },
  login: (req, res) => {
    return new Promise((resolve, reject) => {
      const { profile_email, profile_password } = req.body;
      db.query(
        `SELECT profile_id , profile_email , profile_password ,profile_role, profile_status FROM profiles  WHERE profile_email='${profile_email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            return res.status(404).json({
              success: false,
              message: `Error When Checking Data to Database `,
            });
          } else {
            if (!results.length) {
              return res.status(404).json({
                success: false,
                message: `Email Not Registered ! `,
              });
            } else {
              if (results[0].profile_status != 'active') {
                return res.status(404).json({
                  success: false,
                  message: `Your email is not actived`,
                });
              }
              bcrypt.compare(
                profile_password,
                results[0].profile_password,
                function (err, result) {
                  if (err) {
                    return res.status(404).json({
                      success: false,
                      message: `Error When Decrypt Password `,
                    });
                  }
                  if (result) {
                    const token = jwt.sign(
                      {
                        profile_id: results[0].profile_id,
                        profile_role: results[0].profile_role,
                        profile_status: results[0].profile_status
                      },
                      process.env.JWT_SECRET_KEY,
                      {
                        expiresIn: '1d',
                      }
                    );
                    return res.status(201).json({
                      success: true,
                      message: 'Login Success',
                      data: {
                        token,
                        profile_id: results[0].profile_id,
                        profile_role: results[0].profile_role,
                      },
                    });
                  } else {
                    return res.status(404).json({
                      success: false,
                      message: `Email/Password Incorrect !`,
                    });
                  }
                }
              );
            }
          }
        }
      );
    });
  },
  checkEmail: (profile_email) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT profile_email from profiles WHERE profile_email='${profile_email}'`, (err, result) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        resolve({
          result
        })
      })
      // console.log(dbQuery.sql)
    })
  },
  generateCode: (profile_email, code) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE profiles SET profile_key='${code}' WHERE profile_email='${profile_email}'`, (err, result) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        resolve({
          result
        })
      })
      // console.log(dbQuery.sql)
    })
  },
  confirmPass: (profile_email, profile_password) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE profiles SET profile_password = '${profile_password}',profile_key = '' WHERE profile_email = '${profile_email}'`, (error, result) => {
        if (error) {
          reject({
            success: false,
            message: error.sqlMessage,
          })
        }
        resolve(result)
      })
    })
  }
}