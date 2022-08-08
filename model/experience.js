const db = require("../helper/mysql")
const tb_exp = "experience"
const getAllExperiences = async (req, res) => {
	const profile_id = req.params.profile_id
	new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM ${tb_exp} WHERE profile_id = ${profile_id}`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					status: 500,
					message: "Error while getting experience",
					data: error,
				})
			} else {
				resolve({
					success: true,
					status: 200,
					message: "Successfully get experience",
					data: results,
				})
			}
		})
	})
}

const getExperienceById = async (req, res) => {
	new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM ${tb_exp} WHERE profile_id = ${req.params.profile_id}`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					status: 500,
					message: "Error while getting experience",
					data: error,
				})
			} else {
				resolve({
					success: true,
					status: 200,
					message: "Successfully get experience",
					data: results,
				})
			}
		})
	})
}

const addExperience = async (req, res) => {
	const profile_id = req.body
	const {
		experience_company,
		experience_position,
		experience_date_start,
		experience_end_date,
		experience_description,
	} = req.body
	new Promise((resolve, reject) => {
		const sqlQuery = `INSERT INTO ${tb_exp} (experience_company, experience_position, experience_date_start, experience_date_end, experience_description) VALUES ('${experience_company}', '${experience_position}', '${experience_date_start}', '${experience_end_date}', '${experience_description}')`
		db.query(sqlQuery, (error, results) => {
			if (error) {
				reject({
					success: false,
					status: 500,
					message: "Error while adding experience",
					data: error,
				})
			} else {
				resolve({
					success: true,
					status: 200,
					message: "Successfully add experience",
					data: results,
				})
			}
		})
	})
}

const updateExperience = async (req, res) => {
	const profile_id = req.params.profile_id
	const querySelect = `SELECT * FROM ${tb_exp} WHERE profile_id = ${profile_id}`
	new Promise((resolve, reject) => {
		db.query(querySelect, (error, results) => {
			if (error) {
				reject({
					success: false,
					status: 500,
					message: "Error while getting experience",
					data: error,
				})
			}
			if (results.length === 0) {
				reject({
					success: false,
					status: 404,
					message: "Experience not found",
					data: error,
				})
			} else {
				let prevData = {
					...results[0],
					...req.body,
				}
				const queryUpdate = `UPDATE ${tb_exp} SET experience_company = '${prevData.experience_company}', experience_position = '${prevData.experience_position}', experience_date_start = '${prevData.experience_date_start}', experience_date_end = '${prevData.experience_date_end}', experience_description = '${prevData.experience_description}' WHERE profile_id = ${profile_id}`
				db.query(queryUpdate, (error, results) => {
					if (error) {
						reject({
							success: false,
							status: 500,
							message: "Error while updating experience",
							data: error,
						})
					} else {
						resolve({
							success: true,
							status: 200,
							message: "Successfully update experience",
							data: {
								id: profile_id,
							},
						})
					}
				})
			}
		})
	})
}

const removeExperience = async (req, res) => {
	const profile_id = req.params.profile_id
	const querySelect = `SELECT * FROM ${tb_exp} WHERE profile_id = ${profile_id}`
	new Promise((resolve, reject) => {
		db.query(querySelect, (error, results) => {
			if (error) {
				reject({
					success: false,
					status: 500,
					message: "Error while getting experience",
					data: error,
				})
			}
			if (results.length === 0) {
				reject({
					success: false,
					status: 404,
					message: "Experience not found",
				})
			} else {
				const queryRemove = `DELETE FROM ${tb_exp} WHERE profile_id = ${profile_id} AND experience_name = '${req.params.experience_name}'`
				db.query(queryRemove, (error, results) => {
					if (error) {
						reject({
							success: false,
							status: 500,
							message: "Error while removing experience",
							data: error,
						})
					} else {
						resolve({
							success: true,
							status: 200,
							message: "Successfully remove experience",
							data: {
								id: profile_id,
							},
						})
					}
				})
			}
		})
	})
}

module.exports ={
    getAllExperiences,
    getExperienceById,
    addExperience,
    updateExperience,
    removeExperience
}