const handler = require('./handler');
const payload = require('./payload');

exports.registerUser = {
    handler: handler.registerUser,
    payload: payload.registerUser
}

exports.loginUser = {
    handler: handler.login,
    payload: payload.login,
}