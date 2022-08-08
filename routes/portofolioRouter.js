/** @format */

const express = require('express');
const router = express.Router();
const portofolioController = require('../controller/portofolioController');
const upload = require('../helper/multer/multer');
const verifyAuth = require('../helper/verifyAuth/verifyAuth');

router.post(
	'/',
	verifyAuth.VerifyUser,
	upload.single('portofolio_picture'),
	portofolioController.addPortofolio
);
router.get('/', portofolioController.getPortofolio);
router.patch(
	'/',
	verifyAuth.VerifyUser,
	upload.single('portofolio_picture'),
	portofolioController.updatePortofolio
);
router.delete('/', portofolioController.deletePortofolio);
module.exports = router;

//