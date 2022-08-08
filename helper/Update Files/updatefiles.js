/** @format */

const fs = require('fs');
const db = require('../mysql');
const deletecover = (FileLocation) => {
	fs.unlink(FileLocation, (err) => {
		if (err) {
			console.log(`Error di FS unlink ${err}`);
		} else {
			console.log('sukses');
		}
	});
};
const updatecover = (profile_id) => {
	db.query(
		`select profile_picture from profiles where profile_id = ${profile_id}`,
		(err, result) => {
			if (err) {
				console.log('error di db query');
				return 0;
			} else if (!result.length) {
				console.log('Data Foto Tidak ada , Tidak Ada Foto Profil yang diganti');
				return 0;
			} else {
				deletecover(`./uploads/${result[0].profile_picture}`);
				return 1;
			}
		}
	);
};
