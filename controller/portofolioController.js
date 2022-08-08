/** @format */

const portofolio = require('../model/portofolio');

module.exports = {
	addPortofolio: async (req, res) => {
		try {
			const result = await portofolio.addNewPortofolio(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};

//