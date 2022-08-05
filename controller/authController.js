const Auth = require('../model/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const sendMail = require('../helper/email/activation')

randomString = (length) => {
  let result = ''
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
module.exports = {
  registerPerekrut: async (req, res) => {
    try {
      let { profile_id, profile_name, profile_email, profile_password, profile_password_confirm, profile_role, profile_company, profile_sub_company, profile_phone_number } = req.body
      let profile_picture = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
      profile_email = profile_email.toLowerCase()
      profile_role = 'perekrut'
      if (profile_password !== profile_password_confirm) {
        return res.status(404).json({ success: false, message: "Error: Password and Confirm Password must be same" })
      }
      if (!profile_name || !profile_email || !profile_password || !profile_company || !profile_sub_company) {
        return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
      }
      if (profile_password.length < 8) {
        return res.status(404).json({ success: false, message: "Error: Password must be more than 8 characters" })
      }
      const setData = { profile_name, profile_email, profile_password, profile_role, profile_company, profile_sub_company, profile_phone_number }
      const result = await Auth.registerPerekrut(setData, profile_id)
      const setDataEmail = {
        to: profile_email,
        subject: "Email Verification !",
        template: "email-verification",
        data: {
          url: `http://localhost:5000/api/v1/auth/activation/${result.profile_id}`,
          email: profile_email,
        }
      }
      await sendMail(setDataEmail)
      return res.status(201).json({ success: true, message: 'Success register, please check email to verify acount', data: result })
    } catch (err) {
      return res.status(400).json({ success: false, message: `Error: ${err.message}` })
    }
  },
  activation: async (req, res) => {
    try {
      let { profile_id } = req.params
      let updateStatus = Auth.activation(profile_id)
      return res.status(200).json({ success: true, message: 'Success activation' })
    }
    catch (err) {
      return res.status(400).json({ success: false, message: `Error: ${err.message}` })
    }
  },
}