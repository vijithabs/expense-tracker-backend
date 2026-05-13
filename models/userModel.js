
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

// let User = mongoose.models.user || mongoose.model('user', userSchema);
mongoose.models = {};
const User = mongoose.model('user', userSchema);

module.exports = User;