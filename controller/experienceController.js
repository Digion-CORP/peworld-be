const {
	getAllExperiences,
	getExperienceById,
	addExperience,
	updateExperience,
	removeExperience,
} = require("../model/experience")

const getAllExperiences = async (req, res) => {
	try {
		const results = await getAllExperiences()
		res.status(200).json(results)
	} catch (error) {
		res.status(400).json(error)
	}
}

const getExperienceById = async (req, res) => {
	try {
		const results = await getExperienceById(req, res)
		res.status(200).json(results)
	} catch (error) {
		res.status(400).json(error)
	}
}

const addExperience = async (req, res) => {
    try{
        const results = await addExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const updateExperience = async (req, res) => {
    try{
        const results = await updateExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const removeExperience = async (req, res) => {
    try{
        const results = await removeExperience(req, res)
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json(error)
    }
}

module.exports = {
    getAllExperiences,
    getExperienceById,
    addExperience,
    updateExperience,
    removeExperience,
}
