/** @format */
const express = require('express');
const router = express.Router();
const {
	registerPekerja,
	registerPerekrut,
	activation,
	login,
	sendEmailResetPass,
	resetPass,
	sendEmailActivedAcount,
} = require('../controller/authController');
const { VerifyUser } = require('../helper/verifyAuth/verifyAuth');

router.post('/register-perekrut', registerPerekrut);
router.post('/register-pekerja', registerPekerja);
router.get('/activation/:profile_email', activation);
router.post('/login', login);
router.get('/send-email-reset-pass/:profile_email', sendEmailResetPass);
router.patch('/reset-pass/:profile_email', resetPass);
router.get('/send-email-actived/:profile_email', sendEmailActivedAcount);

module.exports = router;
