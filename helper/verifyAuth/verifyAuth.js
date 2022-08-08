/** @format */
const db = require('../mysql');
const jwt = require('jsonwebtoken');
const Auth = {
	VerifyToken: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (
					decoded.role == process.env.ROLE_ADMIN ||
					decoded.role == process.env.ROLE_USER ||
					decoded.role == process.env.ROLE_BASIC
				) {
					next();
				} else {
					return res.status(404).send({
						message: 'ROLE TIDAK TERIDENTIFIKASI , KAMU SIAPA !',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN SEBELUM MELAKUKAN ACTION INI',
			});
		}
	},
	VerifyUser: (req, res, next) => {
	
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			console.log(token, 'weew');
			const { profile_id } = req.query;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						success: false,
						message: 'INVALID TOKEN',
					});
				} else if (decoded.profile_id != profile_id) {
					return res.status(404).send({
						success: false,
						message: 'INI BUKAN AKUN KAMU !!',
					});
				} else {
					req.dadada = decoded;
					next();
				}
			});
		} else {
			return res.status(404).send({
				success: false,
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
	VerifyUpdateProfilePekerja: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const { profile_id } = req.query;
			jwt.verify(
				token,
				process.env.JWT_SECRET_KEY,
				function (errVerify, decoded) {
					if (errVerify) {
						return res.status(404).send({
							success: false,
							message: 'INVALID TOKEN',
						});
					} else {
						db.query(
							`SELECT profile_id from profiles where profile_id = '${profile_id}'`,
							(err, result) => {
								if (err) {
									return res.status(404).send({
										success: false,
										message: 'Error Ketika Mencari Profile ID',
									});
								} else if (!result.length) {
									return res.status(404).send({
										success: false,
										message: 'DATA PROFILE TIDAK DITEMUKAN',
									});
								} else {
									if (
										profile_id == decoded.profile_id &&
										decoded.profile_role == process.env.ROLE_PEKERJA
									) {
										next();
									} else {
										return res.status(404).send({
											success: false,
											message:
												'KAMU TIDAK MEMILIKI AKSES UNTUK MENGEDIT PROFILE INI',
										});
									}
								}
							}
						);
					}
				}
			);
		} else {
			return res.status(404).send({
				success: false,
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
	VerifyUpdateProfilePerekrut: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const { profile_id } = req.query;
			jwt.verify(
				token,
				process.env.JWT_SECRET_KEY,
				function (errVerify, decoded) {
					if (errVerify) {
						return res.status(404).send({
							success: false,
							message: 'INVALID TOKEN',
						});
					} else {
						db.query(
							`SELECT profile_id from profiles where profile_id = '${profile_id}'`,
							(err, result) => {
								if (err) {
									return res.status(404).send({
										success: false,
										message: 'Error Ketika Mencari Profile ID',
									});
								} else if (!result.length) {
									return res.status(404).send({
										success: false,
										message: 'DATA PROFILE TIDAK DITEMUKAN',
									});
								} else {
									if (
										profile_id == decoded.profile_id &&
										decoded.profile_role == process.env.ROLE_PEREKRUT
									) {
										next();
									} else {
										return res.status(404).send({
											success: false,
											message:
												'KAMU TIDAK MEMILIKI AKSES UNTUK MENGEDIT PROFILE INI',
										});
									}
								}
							}
						);
					}
				}
			);
		} else {
			return res.status(404).send({
				success: false,
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
	VerifyDeleteProfile: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const { profile_id } = req.query;
			jwt.verify(
				token,
				process.env.JWT_SECRET_KEY,
				function (errVerify, decoded) {
					if (errVerify) {
						return res.status(404).send({
							success: false,
							message: 'INVALID TOKEN',
						});
					} else {
						db.query(
							`SELECT profile_id from profiles where profile_id = '${profile_id}'`,
							(err, result) => {
								if (err) {
									return res.status(404).send({
										success: false,
										message: 'Failed To Identify Profile ID',
									});
								} else if (!result.length) {
									return res.status(404).send({
										success: false,
										message: 'Data Not Found',
									});
								} else {
									if (profile_id == decoded.profile_id) {
										next();
									} else {
										return res.status(404).send({
											success: false,
											message:
												'YOU`RE NOT AUTHENTICATED TO DELETE THIS PROFILE !',
										});
									}
								}
							}
						);
					}
				}
			);
		} else {
			return res.status(404).send({
				success: false,
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
	VerifyAdminRole: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (decoded.role == process.env.ROLE_ADMIN) {
					next();
				} else {
					return res.status(404).send({
						message: 'HANYA ADMIN YANG BISA MENYETUJUI/MENOLAK ARTIKEL !!',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN TERLEBIH DAHULU !!',
			});
		}
	},
	VerifyAuthor: (req, res, next) => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (
					decoded.role == process.env.ROLE_ADMIN ||
					decoded.role == process.env.ROLE_USER
				) {
					next();
				} else if (decoded.role == process.env.ROLE_BASIC) {
					return res.status(404).send({
						message:
							'HANYA YANG SUDAH TERVERIFIKASI SEBAGAI AUTHOR YANG BISA MENULIS BERITA',
					});
				} else {
					return res.status(404).send({
						message: 'ROLE TIDAK TERIDENTIFIKASI , KAMU SIAPA !',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN SEBELUM MELAKUKAN ACTION INI',
			});
		}
	},
};
module.exports = Auth;
