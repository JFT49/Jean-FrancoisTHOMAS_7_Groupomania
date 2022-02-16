const auth = require('../middleware/auth')               //middleware de verification du token user
const comment = require("../controllers/comment.controller.js")
var router = require("express").Router()

router.get("/:postid", auth, comment.findAll)
router.post("/:postid", auth, comment.create)
router.delete("/:commentid", auth, comment.delete)

module.exports = router