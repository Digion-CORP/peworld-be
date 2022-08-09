const {
	getAllExperiences,
	getExperienceById,
	addExperience,
	updateExperience,
	removeExperience,
} = require("../model/experience")

const getAll = async (req, res) => {
	try {
		const results = await getAllExperiences()
		res.status(200).json(results)
	} catch (error) {
		res.status(400).json(error)
	}
}

const getById = async (req, res) => {
	try {
		const results = await getExperienceById(req, res)
		res.status(200).json(results)
	} catch (error) {
		res.status(400).json(error)
	}
}

const add = async (req, res) => {
    try{
        const results = await addExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const update = async (req, res) => {
    try{
        const results = await updateExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const remove = async (req, res) => {
    try{
        const results = await removeExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
}
