process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
}).on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
const { MongoClient } = require("mongodb");
require("dotenv").config();


//Express File

//Db connection
const dbOps = require("./loaders/mongo")


Promise.all([dbOps.connection()]).then(async () => {
    const client = new MongoClient(process.env.C_URL);
    await client.connect();
    global.db = client.db(process.env.DNAME);
    require("./loaders/express")

}).catch((err) => {
    console.log("[ERROR] [DATA BASE CONNECTION]", err)
    return process.exit(1);
})