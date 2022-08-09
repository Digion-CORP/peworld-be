/** @format */
const FileValidation = (FileName) => {
	let check = FileName.split('.');
	if (
		check[check.length - 1].toLowerCase() == 'jpg' ||
		check[check.length - 1].toLowerCase() == 'png' ||
		check[check.length - 1].toLowerCase() == 'jpeg' ||
		check[check.length - 1].toLowerCase() == 'webp'
	) {
		return 1;
	} else {
		console.log('Format File Salah');
		return 0;
	}
};

module.exports = FileValidation;
