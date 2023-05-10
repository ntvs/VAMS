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
//

//-------------------------------------------------------------------

//Server listening behavior
app.listen(port, () => {
    console.log(`\n[${appName}] Now listening on ======> http://localhost:${port}\n`);
});