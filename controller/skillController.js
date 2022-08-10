/** @format */

const skill = require('../model/skill');

module.exports = {
	getSkillByID: async (req, res) => {
		try {
			const result = await skill.getSkillByID(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	addSkill: async (req, res) => {
		try {
			const result = await skill.addSkill(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteSkill: async (req, res) => {
		try {
			const result = await skill.deleteSkill(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updateSkill: async (req, res) => {
		try {
			const result = await skill.updateSkill(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};


//