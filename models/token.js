const mongoose = require('mongoose');

let tokenSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    token: String,
})

module.exports = mongoose.model('token', tokenSchema)