//Google authentication library
const { OAuth2Client } = require('google-auth-library');

//-------------------------------------------------------------------

//Used to obtain user information from Google when the appropriate credential token is passed in
const checkTokenSignature = async (token) => {

    //Make a new OAuth 2 client based on the google client ID
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    //Check if the ticket is properly signed
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        //Return the "payload" which is an object containing information of the user who signed in with google
        const payload = ticket.getPayload();

        return payload
        
    } catch(error) {
        return {"error": error.message.split(":")[0]}
    }
};

//-------------------------------------------------------------------

//

//-------------------------------------------------------------------

//Exports
module.exports = { checkTokenSignature };