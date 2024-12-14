const JWT = require('jsonwebtoken');


//create a token
exports.createToken = ({ payload }) => {
    return JWT.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRE})
}

// VErify TOKEN
exports.verifyToken = (token) => {
    return JWT.verify(token, process.env.TOKEN_SECRET)
}