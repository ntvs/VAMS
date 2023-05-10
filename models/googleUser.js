const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    }
});

module.exports = mongoose.model('GoogleUser', userSchema);