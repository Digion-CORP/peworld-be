/** @format */

const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const upload = require('../helper/multer/multer');
const verifyAuth = require('../helper/verifyAuth/verifyAuth');

router.patch(
	'/pekerja',
	verifyAuth.VerifyUpdateProfilePekerja,
	upload.single('profile_picture'),
	profileController.UpdateProfilePekerja
);
router.patch(
	'/perekrut',
	verifyAuth.VerifyUpdateProfilePerekrut,
	upload.single('profile_picture'),
	profileController.UpdateProfilePerekrut
);

router.delete(
	'/',
	verifyAuth.VerifyDeleteProfile,
	profileController.deleteProfile
);

router.get('/sort', profileController.GetProfileSort);
router.get('/search', profileController.GetProfileSearch);
module.exports = router;
