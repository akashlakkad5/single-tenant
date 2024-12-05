process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
}).on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

require("dotenv").config();


//Express File
require("./loaders/express")

//Db connection
const dbOps = require("./loaders/mongo")
dbOps.connection();