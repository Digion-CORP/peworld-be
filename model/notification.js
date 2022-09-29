/** @format */

const db = require('../helper/mysql');
module.exports = {
	addHireNotification: (req, res) => {
		return new Promise((resolve, reject) => {
			const { from_profile_id, to_profile_id } = req.query;
			console.log('masuk ke notif');
			db.query(
				`select profile_company,profile_picture from profiles where profile_id = ${from_profile_id}`,
				(errnotif, resultnotif) => {
					if (errnotif) {
						reject({
							success: false,
							message: 'Error When Search Name Of The Sender',
						});
					} else {
						const sql = `INSERT INTO notification (notification_from_id	, notification_from_name ,notification_to_id , notification_message ,profile_picture) VALUES ('${from_profile_id}', '${resultnotif[0].profile_company}','${to_profile_id}','Interested With You , They Probably contact you Via Email , Lets Check Out Your Email','${resultnotif[0].profile_picture}')`;
						db.query(sql, (err, result) => {
							console.log(
								resultnotif[0].profile_company,
								from_profile_id,
								to_profile_id
							);
							if (err) {
								reject({
									success: false,
									message: `Add Notification Failed ${err}`,
								});
							}
							resolve({
								success: true,
								message: 'Add Notification Success',
								data: result,
							});
						});
					}
				}
			);
		});
	},
	getSkillByID: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			const sql = `SELECT skill_id, skill_name from skill WHERE profile_id =${profile_id}`;
			db.query(sql, (err, result) => {
				if (err) {
					reject({
						success: false,
						message: `Get Skill Failed , ${err}`,
					});
				} else if ((profile_id, result)) {
					if (result.length == 0) {
						reject({
							success: false,
							message: 'You Don`t Have Any Skills',
							data: [],
						});
					} else {
						resolve({
							success: true,
							message: 'Get Skill Success',
							data: result,
						});
					}
				}
			});
		});
	},
	deleteSkill: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id, skill_id } = req.query;
			const sql = `DELETE FROM skill WHERE profile_id =${profile_id} AND skill_id = ${skill_id} `;
			db.query(sql, (err, result) => {
				if (err) {
					reject({
						success: false,
						message: 'delete skill failed',
					});
				} else if (result.affectedRows == 0) {
					reject({
						success: false,
						message: `Skil ID ${skill_id} on profile ID= ${profile_id} Not Found`,
					});
				} else {
					resolve({
						success: true,
						message: 'delete skill success',
						data: result,
					});
				}
			});
		});
	},
	getHireNotification: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			db.query(
				`select * from notification where notification_to_id = ${profile_id}`,
				(errnotif, resultnotif) => {
					if (errnotif) {
						console.log(errnotif, 'aosjkdh');
						reject({
							success: false,
							message: 'Get Notification Failed',
						});
					} else {
						resolve({
							success: true,
							message: 'Get Notification Success',
							data: resultnotif,
						});
					}
				}
			);
		});
	},
};
