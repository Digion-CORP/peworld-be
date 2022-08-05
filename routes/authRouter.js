const express = require('express')
const router = express.Router()
const { registerPerekrut, activation } = require('../controller/authController')

router.post('/register-perekrut', registerPerekrut)
router.get('/activation/:profile_id', activation)

module.exports = router