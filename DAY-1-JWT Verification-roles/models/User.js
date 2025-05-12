const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: String,
    role:{type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
