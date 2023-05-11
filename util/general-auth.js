//-------------------------------------------------------------------

//JWT
const jwt = require('jsonwebtoken');

//-------------------------------------------------------------------

//Creates, signs, and returns a new JWT with the given content
const signToken = (content) => {
    let token_body = {
        data: content
    };

    //Synchronously sign token and return it
    return jwt.sign(token_body, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY || "1h"});
}

//-------------------------------------------------------------------

//Checks if a request is properly authenticated
const isAuthenticated = (req) => {

    //Retrieve the Authorization: Bearer ABCD.... header from the request
    let authHeader = req.get('Authorization');
    
    //If there was a header, extract the token from the header
    let token = authHeader && authHeader.split(' ')[1];

    //If no token was provided, then the user is not authenicated
    if (!token) {
        return {
            status: false,
            error: "No authorization header provided"
        };
    }

    //If token is verified by JWT, then the user is authenticated.
    //Otherwise, they are not if any error is thrown.
    try {
        let content = jwt.verify(token, process.env.JWT_SECRET);
        return {
            status: true
        };
    } catch (e) {
        return {
            status: false,
            error: e.message
        };
    }

}

//-------------------------------------------------------------------

module.exports = { signToken, isAuthenticated };