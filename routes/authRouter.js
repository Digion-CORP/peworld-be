/** @format */

const express = require('express');
const router = express.Router();
const {
	registerPekerja,
	registerPerekrut,
	activation,
	login,
} = require('../controller/authController');

router.post('/register-perekrut', registerPerekrut);
router.post('/register-pekerja', registerPekerja);
router.get('/activation/:profile_id', activation);
router.post('/login', login);

module.exports = router;
