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

//-------------------------------------------------------------------

//Server listening behavior
app.listen(port, () => {
    console.log(`\n[${appName}] Now listening on ======> http://localhost:${port}\n`);
});