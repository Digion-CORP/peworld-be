/** @format */

const notification = require('../model/notification');

module.exports = {
	addHireNotification: async (req, res) => {
		try {
			const result = await notification.addHireNotification(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
