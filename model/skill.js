/** @format */

const db = require('../helper/mysql');
module.exports = {
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
				} else if (profile_id, result) {
					if (result.length == 0)
					{
							reject({
								success: false,
								message: 'You Don`t Have Any Skills',
								data: [],
							});
					}
					else {
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
	addSkill: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id, skill_name } = req.query;
			const sql = `INSERT INTO skill (profile_id, skill_name) VALUES ('${profile_id}', '${skill_name.toLowerCase()}')`;
			db.query(sql, (err, result) => {
				if (err) {
					reject({
						success: false,
						message: 'Add Skill Failed',
					});
				}
				resolve({
					success: true,
					message: 'Add Skill Success',
					data: result,
				});
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
	updateSkill: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id, skill_id } = req.query;
			const { skill_name } = req.body;
			const sql = `UPDATE skill SET skill_name = '${skill_name.toLowerCase()}' WHERE profile_id = ${profile_id} AND skill_id ='${skill_id}' `;
			db.query(sql, (err, result) => {
				if (err) {
					reject({
						success: false,
						message: 'Update Skill Failed',
					});
				} else if (result.affectedRows == 0) {
					reject({
						success: false,
						message: `Skil ID = ${skill_id} on profile ID= ${profile_id} Not Found`,
					});
				} else {
					resolve({
						success: true,
						message: 'Update Skill Success',
						data: result,
					});
				}
			});
		});
	},
};



//