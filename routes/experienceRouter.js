const express = require("express")
const router = express.Router()
const {
	add,
	getAll,
	getById,
	update,
	remove,
} = require("../controller/experienceController")
const verifyAuth = require("../helper/verifyAuth/verifyAuth")

router.post("/", verifyAuth, add)

router.get("/", verifyAuth, getAll)
router.get("/id",verifyAuth, getById)
router.patch("/:id",verifyAuth, update)
router.delete("/del",verifyAuth, remove)
module.exports = router
