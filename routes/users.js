const router = require('express').Router();
const { apiHandler } = require('../utils/payload');
const users = require("../controller/users")


router.post('/register', apiHandler(users.registerUser));
router.post('/login', apiHandler(users.loginUser));

module.exports = router