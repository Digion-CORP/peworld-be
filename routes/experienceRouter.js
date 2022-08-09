const express = require("express")
const router = express.Router()
const {add, getAll,getById, update, remove}= require("../controller/experienceController")
const verifyAuth = require("../helper/verifyAuth/verifyAuth")

router.post("/", add)

router.get("/",getAll)
router.get("/:id",getById)
router.patch(
	"/:id",
	verifyAuth.VerifyUser, update,
)
router.delete(
	"/:id", remove,
)
module.exports = router
