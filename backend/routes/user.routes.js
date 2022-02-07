// const auth = require('../middleware/auth');                 //middleware de verification du token user

const user = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/profile", user.profile)

module.exports = router;