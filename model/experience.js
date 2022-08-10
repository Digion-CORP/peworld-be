const db = require("../helper/mysql")
const tb_exp = "experience"
const getAllExperiences = async (req, res) => {
	// const profile_id = req.params.profile_id
	return new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM ${tb_exp}`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					message: "Error while getting experience",
					data: error,
				})
			} else if (results.length === 0) {
				reject({
					success: false,
					message: "No experience found",
					data: [],
				})
			} else {
				resolve({
					success: true,
					message: "Successfully get experience",
					data: results,
				})
			}
		})
	})
}

const getExperienceById = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { profile_id } = req.query
		const sqlQuery = `SELECT * FROM ${tb_exp} WHERE profile_id = ${profile_id}`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					message: "Error while getting experience",
					data: error,
				})
			} else if (results) {
				if (results.length === 0) {
					reject({
						success: false,
						message: `No experience found for this profile id: ${profile_id}`,
						data: [],
					})
				} else {
					resolve({
						success: true,
						message: "Successfully get experience",
						data: results,
					})
				}
			}
		})
	})
}

const addExperience = async (req, res) => {
	const {
		experience_company,
		experience_position,
		experience_date_start,
		experience_date_end,
		experience_description,
	} = req.body;
	const { profile_id } = req.query;
	return new Promise((resolve, reject) => {
		const sqlQuery = `INSERT INTO ${tb_exp} (profile_id, experience_company, experience_position, experience_date_start, experience_date_end, experience_description) VALUES ('${profile_id}','${experience_company}', '${experience_position}', '${experience_date_start}', '${experience_date_end}', '${experience_description}')`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					message: "Error while adding experience",
					data: error,
				})
			} else {
				console.log(req.body, "sds")
				resolve({
					success: true,
					message: "Successfully add experience",
					data: results,
				})
			}
		})
	})
}

const updateExperience = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { profile_id, experience_id } = req.query
		const querySelect = `SELECT * FROM ${tb_exp} WHERE profile_id = ${profile_id} AND experience_id = ${experience_id}`
		db.query(querySelect, (error, results) => {
			if (error) {
				reject({
					success: false,
					message: "Error while getting experience",
					data: error,
				})
			} else if (results.length === 0) {
				reject({
					success: false,
					message: "Experience not found",
					data: error,
				})
			} else {
				let prevData = {
					...results[0],
					...req.body,
				}
				const queryUpdate = `UPDATE ${tb_exp} SET experience_company = '${prevData.experience_company}', experience_position = '${prevData.experience_position}', experience_date_start = '${prevData.experience_date_start}', experience_date_end = '${prevData.experience_date_end}', experience_description = '${prevData.experience_description}' WHERE profile_id = ${profile_id} AND experience_id = ${experience_id}`
				db.query(queryUpdate, (error, results) => {
					if (error) {
						reject({
							success: false,
							message: "Error while updating experience",
							data: error,
						})
					}  else {
						resolve({
							success: true,
							message: "Successfully update experience",
							data: results,
						})
					}
				})
			}
		})
	})
}

const removeExperience = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { profile_id, experience_id } = req.query
		const querySelect = `SELECT * FROM ${tb_exp} WHERE profile_id = '${profile_id}'`
		db.query(querySelect, (error, results) => {
			if (error) {
				reject({
					success: false,
					message: "Delete experience failed",
					data: error,
				})
			} else if (results.length === 0) {
				reject({
					success: false,
					message: "Data not found",
				})
			}else{
				const queryRemove = `DELETE FROM ${tb_exp} WHERE profile_id = '${profile_id}' AND experience_id = '${experience_id}'`
				db.query(queryRemove, (error, results) => {
					if (error) {
						reject({
							success: false,
							message: "Error while removing experience",
							data: error,
						})
					} else {
						resolve({
							success: true,
							message: "Successfully remove experience",
							data: results,
						})
					}
				})
			}
		
		})
	})
}

module.exports = {
	getAllExperiences,
	getExperienceById,
	addExperience,
	updateExperience,
	removeExperience,
}



//