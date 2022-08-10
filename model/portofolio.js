/** @format */
const db = require('../helper/mysql');
const FileValidation = require('../helper/FileValidation/filevalidation');
const {
	deletecover,
	updatecoverportofolio,
} = require('../helper/Update Files/updatefiles');
module.exports = {
	addNewPortofolio: (req, res) => {
		return new Promise((resolve, reject) => {
			const { portofolio_name, portofolio_picture, portofolio_repo } = req.body;
			const { profile_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
					});
				} else {
					db.query(
						`INSERT into portofolio (profile_id ,portofolio_name,portofolio_picture,portofolio_repo) 
					   Values ( "${profile_id}","${portofolio_name}","${req.file.filename}","${portofolio_repo}")`,
						(err, result) => {
							if (err) {
								reject({
									success: false,
									message: 'Data Portofolio Tidak Berhasil Di Inputt',
									data: [],
								});
							} else {
								resolve({
									message: 'Data Portofolio Berhasil Di Tambahkan',
									status: 200,
									result,
								});
							}
						}
					);
				}
			} else {
				res.status(400).send({
					success: false,
					message: 'Foto Portofolio Tidak Boleh Kosong',
				});
			}
		});
	},
	getPortofolioByID: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			const sql = `SELECT  portofolio_id,portofolio_name , portofolio_picture ,portofolio_repo from portofolio WHERE profile_id =${profile_id}`;
			db.query(sql, (err, result) => {
				if (err) {
					reject({
						success: false,
						message: `Get Portofolio Failed , ${err}`,
					});
				} else if ((profile_id, result)) {
					if (result.length == 0) {
						reject({
							success: false,
							message: `You Don't Have Any Portofolio `,
						});
					} else {
						resolve({
							success: true,
							message: 'Get Portofolio Success',
							data: result,
						});
					}
				}
			});
		});
	},
	UpdatePortofolio: (req, res) => {
		return new Promise((resolve, reject) => {
			const { portofolio_name, portofolio_picture, portofolio_repo } = req.body;
			const { profile_id, portofolio_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
					});
				} else {
					if (updatecoverportofolio(profile_id) == 0) {
						reject({
							success: false,
							message: 'PROFILE ID TIDAK DITEMUKAN',
						});
					} else {
						db.query(
							`UPDATE portofolio SET portofolio_picture='${req.file.filename}', portofolio_name='${portofolio_name}',portofolio_repo = '${portofolio_repo}'
                           where profile_id = '${profile_id}' AND portofolio_id = ${portofolio_id}`,
							(err, result) => {
								if (err) {
									reject({
										success: false,
										message: 'Data portofolio Tidak Berhasil Di Update',
									});
								} else if (result.affectedRows == 0) {
									reject({
										success: false,
										message: `Portofolio ID = ${portofolio_id} on profile ID= ${profile_id} Not Found`,
									});
								} else {
									resolve({
										success: true,
										message: 'portofolio berhasil Di Update',
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
					message: 'Foto portofolio Tidak Boleh Kosong',
				});
			}
		});
	},
	deletePortofolio: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id, portofolio_id } = req.query;
			db.query(
				`select * from portofolio where portofolio_id = ${portofolio_id} AND profile_id = ${profile_id}`,
				(err, result) => {
					if (!result.length || err) {
						reject({
							success: false,
							message: `portofolio Dengan  portofolio_ID = ${portofolio_id} Tidak Ditemukan `,
						});
					} else {
						deletecover(`./uploads/${result[0].portofolio_picture}`);
						db.query(
							`delete from portofolio where portofolio_id = "${profile_id}" AND profile_id = ${profile_id}`,
							(err, result) => {
								if (err) {
									reject({
										success: false,
										message: `Gagal Menghapus portofolio , ${err} `,
									});
								} else {
									resolve({
										success: true,
										message: `portofolio dengan portofolio_ID = ${portofolio_id} Berhasil Dihapus`,
										result,
									});
								}
							}
						);
					}
				}
			);
		});
	},
};



//