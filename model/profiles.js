/** @format */
const db = require('../helper/mysql');
const FileValidation = require('../helper/FileValidation/filevalidation');
const {
	deletecover,
	updatecover,
} = require('../helper/Update Files/updatefiles');

module.exports = {
	UpdateProfilePekerja: (req, res) => {
		return new Promise((resolve, reject) => {
			const {
				profile_name,
				profile_picture,
				profile_job,
				profile_job_type,
				profile_instagram,
				profile_github,
				profile_gitlab,
				profile_location,
				profile_phone_number,
				profile_description,
				profile_birth_date,
			} = req.body;
			const { profile_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
					});
				} else {
					if (updatecover(profile_id) == 0) {
						reject({
							success: false,
							message: 'PROFILE ID TIDAK DITEMUKAN',
						});
					} else {
						db.query(
							`UPDATE profiles SET profile_picture='${req.file.filename}', profile_name='${profile_name}',profile_job = '${profile_job}',profile_job_type='${profile_job_type}',profile_instagram='${profile_instagram}',profile_github='${profile_github}',
                            profile_gitlab='${profile_gitlab}',profile_location='${profile_location}',profile_phone_number='${profile_phone_number}',profile_description='${profile_description}',profile_birth_date='${profile_birth_date}'
                           where profile_id = '${profile_id}'`,
							(err, result) => {
								if (err) {
									console.log(`error disini , ${err}`);
									reject({
										success: false,
										message: 'Data Profile Tidak Berhasil Di Update',
									});
								} else {
									console.log('error disini 2');
									resolve({
										success: true,
										message: 'Artikel Profile Di Update',
										result,
									});
								}
							}
						);
					}
				}
			} else {
				res.status(400).send({
					success: false,
					message: 'Foto Profile Tidak Boleh Kosong',
				});
			}
		});
	},
	UpdateProfilePerekrut: (req, res) => {
		return new Promise((resolve, reject) => {
			const {
				profile_name,
				profile_picture,
				profile_company,
				profile_sub_company,
				profile_instagram,
				profile_github,
				profile_linkedin,
				profile_location,
				profile_phone_number,
				profile_description,
			} = req.body;
			const { profile_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
					});
				} else {
					if (updatecover(profile_id) == 0) {
						reject({
							success: false,
							message: 'PROFILE ID TIDAK DITEMUKAN',
						});
					} else {
						db.query(
							`UPDATE profiles SET profile_picture='${req.file.filename}', profile_name='${profile_name}',profile_company = '${profile_company}',profile_sub_company='${profile_sub_company}',profile_instagram='${profile_instagram}',profile_linkedin='${profile_linkedin}',
                            profile_github='${profile_github}',profile_location='${profile_location}',profile_phone_number='${profile_phone_number}',profile_description='${profile_description}'
                           where profile_id = '${profile_id}'`,
							(err, result) => {
								if (err) {
									console.log(`error disini , ${err}`);
									reject({
										success: false,
										message: 'Data Profile Tidak Berhasil Di Update',
									});
								} else {
									console.log('error disini 2');
									resolve({
										success: true,
										message: 'Artikel Profile Di Update',
										result,
									});
								}
							}
						);
					}
				}
			} else {
				res.status(400).send({
					success: false,
					message: 'Foto Profile Tidak Boleh Kosong',
				});
			}
		});
	},
};
