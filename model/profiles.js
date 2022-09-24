/** @format */
const db = require('../helper/mysql')
const FileValidation = require('../helper/FileValidation/filevalidation')
const {
  deletecover,
  updatecover,
} = require('../helper/Update Files/updatefiles')
//s
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
      } = req.body
      const { profile_id } = req.query
      if (req.file) {
        if (FileValidation(req.file.filename) != 1) {
          reject({
            success: false,
            message:
              'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
          })
        } else {
          if (updatecover(profile_id) == 0) {
            reject({
              success: false,
              message: 'PROFILE ID TIDAK DITEMUKAN',
            })
          } else {
            db.query(
              `UPDATE profiles SET profile_picture='${req.file.filename}', profile_name='${profile_name}',profile_job = '${profile_job}',profile_job_type='${profile_job_type}',profile_instagram='${profile_instagram}',profile_github='${profile_github}',
                            profile_gitlab='${profile_gitlab}',profile_location='${profile_location}',profile_phone_number='${profile_phone_number}',profile_description='${profile_description}',profile_birth_date='${profile_birth_date}'
                           where profile_id = '${profile_id}'`,
              (err, result) => {
                if (err) {
                  reject({
                    success: false,
                    message: 'Data Profile Tidak Berhasil Di Update',
                  })
                } else {
                  resolve({
                    success: true,
                    message: 'Artikel Profile Di Update',
                    result,
                  })
                }
              },
            )
          }
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Foto Profile Tidak Boleh Kosong',
        })
      }
    })
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
      } = req.body
      const { profile_id } = req.query
      if (req.file) {
        if (FileValidation(req.file.filename) != 1) {
          reject({
            success: false,
            message:
              'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
          })
        } else {
          if (updatecover(profile_id) == 0) {
            reject({
              success: false,
              message: 'PROFILE ID TIDAK DITEMUKAN',
            })
          } else {
            db.query(
              `UPDATE profiles SET profile_picture='${req.file.filename}', profile_name='${profile_name}',profile_company = '${profile_company}',profile_sub_company='${profile_sub_company}',profile_instagram='${profile_instagram}',profile_linkedin='${profile_linkedin}',
                            profile_github='${profile_github}',profile_location='${profile_location}',profile_phone_number='${profile_phone_number}',profile_description='${profile_description}'
                           where profile_id = '${profile_id}'`,
              (err, result) => {
                if (err) {
                  reject({
                    success: false,
                    message: 'Data Profile Tidak Berhasil Di Update',
                  })
                } else {
                  resolve({
                    success: true,
                    message: 'Profile Berhasil Di Update',
                    result,
                  })
                }
              },
            )
          }
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Foto Profile Tidak Boleh Kosong',
        })
      }
    })
  },
  DeleteProfile: (req, res) => {
    return new Promise((resolve, reject) => {
      const { profile_id } = req.query
      db.query(
        `select * from profiles where profile_id = ${profile_id}`,
        (err, result) => {
          if (!result.length || err) {
            reject({
              success: false,
              message: `Profile Dengan  ID = ${profile_id} Tidak Ditemukan `,
            })
          } else {
            deletecover(`./uploads/${result[0].profile_picture}`)
            db.query(
              `delete from profiles where profile_id = "${profile_id}" `,
              (err, result) => {
                if (err) {
                  reject({
                    success: false,
                    message: `Gagal Menghapus Profile , ${err} `,
                  })
                } else {
                  resolve({
                    success: true,
                    message: `Profile dengan Profile ID = ${profile_id} Berhasil Dihapus`,
                    result,
                  })
                }
              },
            )
          }
        },
      )
    })
  },
  GetProfileSort: (req, res) => {
    return new Promise((resolve, reject) => {
      const { limit, page, order_by, sort } = req.query
      let offset = page * limit - limit
      db.query(
        `SELECT  profiles.profile_id, profiles.profile_name , profiles.profile_role , profiles.profile_location , profiles.profile_job ,
				 profiles.profile_job_type ,profile_picture ,group_concat(IFNULL(skill.skill_name,'')) as skill from profiles left join skill on profiles.profile_id = skill.profile_id
				 where profiles.profile_status = 'active' AND profiles.profile_role ='pekerja'  GROUP BY profiles.profile_id  ORDER BY ${order_by} ${sort} limit ${limit} OFFSET ${offset}
				 `,
        (error, result) => {
          db.query(
            `SELECT * from profiles where profile_status = 'active' AND profile_role = 'pekerja'`,
            (error2, result2) => {
              let totalpage = Math.ceil(result2.length / limit)
              if (error || error2) {
                reject({
                  success: true,
                  message: `Failed To Get profile , ${error} ,error ,${error2}`,
                })
              } else {
                if (result.length == 0) {
                  reject({
                    success: false,
                    message: `No Profile Available To Show`,
                    data: [],
                  })
                } else {
                  resolve({
                    success: true,
                    message: 'Get Profile Success',
                    totalpage: totalpage,
                    totalRow: result.length,
                    totaldata: result2.length,
                    data: result,
                  })
                }
              }
            },
          )
        },
      )
    })
  },
  GetProfileSearch: (req, res) => {
    return new Promise((resolve, reject) => {
      const { limit, page, skill_location } = req.query
      db.query(
        `SELECT  profiles.profile_id, profiles.profile_name , profiles.profile_role , profiles.profile_location , profiles.profile_job ,
				 profiles.profile_job_type , ,profile_picture,group_concat(IFNULL(skill.skill_name,'')) as skill from profiles left join skill on profiles.profile_id = skill.profile_id
				 where profiles.profile_status = 'active' AND profiles.profile_role ='pekerja' AND skill.skill_name like '%${skill_location}%' OR profiles.profile_location like '%${skill_location}%' GROUP BY profiles.profile_id
				 `,
				(error, result) => {
					db.query(
						`SELECT * from profiles where profile_status = 'active' AND profile_role = 'pekerja'`,
						(error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							if (error || error2) {
								reject({
									success: true,
									message: `Failed To Get profile , ${error} ,error ,${error2}`,
								});
							} else {
								if (result.length == 0) {
									reject({
										success: false,
										message: `No Profile Available To Show`,
										data: [],
									});
								} else {
									resolve({
										success: true,
										message: 'Get Profile Success',
										totalpage: totalpage,
										totalRow: result.length,
										totaldata: result2.length,
										data: result,
									});
								}
							}
						}
					);
				}
			);
		});
	},
	GetsingleProfile: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			db.query(
				`SELECT  profiles.profile_id, profiles.profile_name , profiles.profile_role , profiles.profile_location , profiles.profile_job ,
				 profiles.profile_job_type ,profile_phone_number , profile_picture, profile_description, profile_instagram , profile_github ,profile_gitlab,profile_email,profile_company,profile_sub_company,group_concat(IFNULL(skill.skill_name,'')) as skill from profiles left join skill on profiles.profile_id = skill.profile_id
				 where profiles.profile_id = ${profile_id}
				 `,
				(error, result) => {
					if (error) {
						reject({
							success: true,
							message: `Failed To Get profile , ${error} `,
						});
					} else {
						if (result.length == 0) {
							reject({
								success: false,
								message: `No Profile Available To Show`,
								data: [],
							});
						} else {
							resolve({
								success: true,
								message: `Get Profile Success`,
								data: result,
							});
						}
					}
				}
			);
		});
	},
};


