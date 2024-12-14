const router = require('express').Router();
const { apiHandler } = require('../utils/payload');
const users = require("../controller/users");
const { auth } = require("../middleware/index")


router.post('/register', apiHandler(users.registerUser));
router.post('/login', apiHandler(users.loginUser));
router.post('/updatePassword', auth, apiHandler(users.updatePassword));

module.exports = router