//-------------------------------------------------------------------

//JWT
const jwt = require('jsonwebtoken');

//-------------------------------------------------------------------

const signToken = (content) => {
    let token_body = {
        data: content
    };

    //Synchronously sign token and return it
    return jwt.sign(token_body, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY || "1h"});
}

//-------------------------------------------------------------------

module.exports = { signToken };