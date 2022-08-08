/** @format */

const express = require('express');
const router = express.Router();
const skillController = require('../controller/skillController');
const verifyAuth = require('../helper/verifyAuth/verifyAuth');

router.post('/', verifyAuth.VerifyUser, skillController.addSkill);
router.get('/', skillController.getSkillByID);
router.delete('/', verifyAuth.VerifyUser, skillController.deleteSkill);
router.patch('/', verifyAuth.VerifyUser, skillController.updateSkill);

module.exports = router;
