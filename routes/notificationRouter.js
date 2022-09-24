/** @format */

const express = require('express')
const router = express.Router()
const verifyAuth = require('../helper/verifyAuth/verifyAuth')
const notificationController = require('../controller/notificationController')

router.post(
	'/hire',
	verifyAuth.VerifyNotificationPerekrut,
	notificationController.addHireNotification
);
router.get('/hire', notificationController.getHireNotification);

module.exports = router;
