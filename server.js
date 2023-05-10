//Load environment variables
require("dotenv").config();

const package = require('./package.json');
const appName = `${package.name}@${package.version}`;

//-------------------------------------------------------------------

//Express setup
const express = require("express");
const app = express();
const port = process.env.PORT || 9005;

//-------------------------------------------------------------------

//Mongoose
const mongoose = require("mongoose");

//Mongoose establish connection
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017");
const db = mongoose.connection;

//Mongoose connection event listeners
db.on("error", (e) => {
    console.log(e);
    console.log(`[${appName}] Please check if your URL is correct.\n`);
});
db.once("open", () => {
    console.log(`[${appName}] MongoDB connection established successfully.\n`);
});

//-------------------------------------------------------------------

//Google auth utility functions
let googleAuth = require('./util/google-auth');

//-------------------------------------------------------------------

//Consume JSON body
app.use(express.json());

//-------------------------------------------------------------------

//Routes

//App uptime
app.get('/', (req, res) => {
    res.status(200).send({
        "app": `${appName}`,
        "uptime": `${process.uptime()} s`
    });
});

//Authentication
app.get('/authenticate', async (req, res) => {

    //Retrieve the Authorization: Bearer ABCD.... header from the request
    let authHeader = req.get('Authorization');
    
    //If there was a header, extract the token from the header
    let token = authHeader && authHeader.split(' ')[1];

    //If no value was detected in the Auth header, return an error
    if (!token) {
        return res.status(400).send({
            "msg": "No authorization header provided"
        });
    }

    //Obtain payload from Google
    let payload = await googleAuth.checkTokenSignature(token);

    //If the error field exists, return it to the user
    if (payload.error) {
        return res.status(400).send({
            "error": payload.error
        });
    }

    
    return res.status(200).send({
        payload
    });

});

//-------------------------------------------------------------------

//Server listening behavior
app.listen(port, () => {
    console.log(`\n[${appName}] Now listening on ======> http://localhost:${port}\n`);
});