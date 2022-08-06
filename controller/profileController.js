/** @format */
const Profile = require('../model/profiles');

module.exports = {
	UpdateProfilePekerja: async (req, res) => {
		//add New post From Body
		try {
			const result = await Profile.UpdateProfilePekerja(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	UpdateProfilePerekrut: async (req, res) => {
		//add New post From Body
		try {
			const result = await Profile.UpdateProfilePerekrut(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
