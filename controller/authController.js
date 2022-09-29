/** @format */

const Auth = require('../model/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../helper/email/activation');
const sendEmailForgotPass = require('../helper/email/forgot-pass');
// const default_picture = require('../assets/default.png')

randomString = (length) => {
	let result = '';
	const characters =
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
module.exports = {
	registerPerekrut: async (req, res) => {
		try {
			let { profile_id, profile_name, profile_email, profile_password, profile_password_confirm, profile_role, profile_company, profile_sub_company, profile_phone_number, profile_picture } = req.body
			// profile_picture = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
			profile_email = profile_email.toLowerCase()
			profile_role = 'perekrut'
			profile_picture = req.file ? req.file.filename : `https://divedigital.id/wp-content/uploads/2021/10/1-min.png`
			if (profile_password !== profile_password_confirm) {
				return res.status(404).json({ success: false, message: "Error: Password and Confirm Password must be same" })
			}
			if (!profile_name || !profile_email || !profile_password || !profile_company || !profile_sub_company) {
				return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
			}
			if (profile_password.length < 8) {
				return res.status(404).json({ success: false, message: "Error: Password must be more than 8 characters" })
			}
			const setData = { profile_name, profile_email, profile_password, profile_role, profile_company, profile_sub_company, profile_phone_number, profile_picture }
			const result = await Auth.registerPerekrut(setData, profile_id)
			return res.status(201).json({ success: true, message: 'Success register', data: result })
		} catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` })
		}
	},
	registerPekerja: async (req, res) => {
		try {
			let {
				profile_id,
				profile_name,
				profile_email,
				profile_password,
				profile_password_confirm,
				profile_role,
				profile_phone_number,
			} = req.body;
			let profile_picture = req.file ? req.file.filename : 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png';
			profile_email = profile_email.toLowerCase();
			profile_role = 'pekerja';
			if (profile_password !== profile_password_confirm) {
				return res.status(404).json({
					success: false,
					message: 'Error: Password and Confirm Password must be same',
				});
			}
			if (
				!profile_name ||
				!profile_email ||
				!profile_password ||
				!profile_phone_number
			) {
				return res
					.status(404)
					.json({ success: false, message: 'Error: Fields must be filled' });
			}
			if (profile_password.length < 8) {
				return res.status(404).json({
					success: false,
					message: 'Error: Password must be more than 8 characters',
				});
			}
			const setData = {
				profile_name,
				profile_email,
				profile_password,
				profile_role,
				profile_phone_number,
				profile_picture,
			};
			const result = await Auth.registerPekerja(setData, profile_id)
			return res.status(201).json({
				success: true,
				message: 'Success register',
				data: result,
			})
		} catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` });
		}
	},
	activation: async (req, res) => {
		try {
			let { profile_email } = req.params
			let updateStatus = Auth.activation(profile_email)
			return res.status(200).json({ success: true, message: 'Success activation' })
		}
		catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` })
		}
	},
	login: async (req, res) => {
		try {
			const results = await Auth.login(req, res);
			return res.status(200).send(results);
		} catch (error) {
			return res.status(500).send(error);
		}
	},
	sendEmailActivedAcount: async (req, res) => {
		try {
			let { profile_email } = req.params
			let result = await Auth.checkEmail(profile_email)
			console.log(!result)
			if (!result) {
				return res.status(400).json({ success: false, message: `Error: Email not found` })
			}
			const setDataEmail = {
				to: profile_email,
				subject: 'Email Verification !',
				template: 'email-verification',
				data: {
					url: `http://localhost:5000/api/v1/auth/activation/${profile_email}`,
					email: profile_email,
				},
			}
			await sendEmail(setDataEmail);
			return res.status(200).json({ success: true, message: 'Success sent email actived acount' })
		} catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` })
		}
	},
	sendEmailResetPass: async (req, res) => {
		try {
			let { profile_email } = req.params
			let result = await Auth.checkEmail(profile_email)
			if (result.length < 1) {
				return res.status(400).json({ success: false, message: `Error: Email not found` })
			}
			code = randomString(20)
			const getKey = await Auth.generateCode(profile_email, code)
			const setDataEmail = {
				to: profile_email,
				subject: "Reset Password !",
				template: "forgot-password",
				data: {
					url: `http://localhost:3000/resetpassword/${code}`,
					email: profile_email,
					code: code
				}
			}
			await sendEmailForgotPass(setDataEmail)
			return res.status(200).json({ success: true, message: 'Success sent email reset password', data: `${code}` })
		}
		catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` })
		}
	},
	resetPass: async (req, res) => {
		try {
			let { profile_email, profile_key } = req.params
			console.log(req.decode)
			let checkEmail = await Auth.checkEmail(profile_email)
			if (!checkEmail) {
				return res.status(400).json({ success: false, message: `Error: Email not found` })
			}
			if (checkEmail[0].profile_key != profile_key) {
				return res.status(400).json({ success: false, message: 'Error: Key must be same' })
			}
			let { profile_password, profile_password_confirm } = req.body
			if (profile_password !== profile_password_confirm) {
				return res.status(400).json({ success: false, message: 'Error: New Password and Confrim Password must be same' })
			}
			profile_password = await bcrypt.hash(profile_password, 10)
			const result = await Auth.confirmPass(profile_email, profile_password)
			return res.status(200).json({ success: true, message: 'Password changed' })
		} catch (err) {
			return res.status(400).json({ success: false, message: `Error: ${err.message}` })
		}
<<<<<<< HEAD
	}
}
=======
	},
};



//
>>>>>>> 76cb555271eaa6166713477e1104bad409d84375
