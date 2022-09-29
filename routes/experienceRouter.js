const express = require("express")
const router = express.Router()
const {
	getAll,
	getById,
	add,
	update,
	remove,
} = require("../controller/experienceController")
const verifyAuth = require("../helper/verifyAuth/verifyAuth")

router.post("/",  add)

router.get("/", getAll)
router.get("/id",getById)
router.patch("/update",update)
router.delete("/delete",remove)
module.exports = router




//